import {useState, useContext} from 'react';
import mediaAPI from './ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import {AsyncStorage} from 'react-native';

const {uploadFile, reloadAllMedia} = mediaAPI();

const useUploadForm = () => {
  const initInputs = {title: '', description: ''};
  const [inputs, setInputs] = useState(initInputs);
  const {setMedia, setMyMedia} = useContext(MediaContext);
  // upload form event handlers
  const handleTitleChange = (text) => {
    setInputs((inputs) => ({
      ...inputs,
      title: text,
    }));
  };
  const handleDescriptionChange = (text) => {
    setInputs((inputs) => ({
      ...inputs,
      description: text,
    }));
  };

  const handleUpload = async (file, setLoading, navigation) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const fd = new FormData();
    const filename = file.uri.split('/').pop();

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = '';
    if (file.type === 'image') {
      type = match ? `image/${match[1]}` : `image`;
      // fix jpg mimetype
      if (type === 'image/jpg') {
        type = 'image/jpeg';
      }
    } else {
      type = match ? `video/${match[1]}` : `video`;
    }

    // Upload the image using the fetch and FormData APIs
    // Assume "photo" is the name of the form field the server expects
    fd.append('file', {uri: file.uri, name: filename, type});
    fd.append('title', inputs.title);
    fd.append('description', inputs.description);
    uploadFile(fd).then((response) => {
      console.log('upl resp', response);
      addTag(response.file_id, userToken).then(()=> {
        setMedia([]);
        setTimeout(() => {
          reloadAllMedia(setMedia, setMyMedia);
          setLoading(false);
          navigation.navigate('Home');
        }, 2000);
      });
      // reset media because silly refresh problems
    }).catch((err) => {
      console.log(err);
    });
  };

  const addTag = async (id, userToken) => {
    const tagData = {
      file_id: id,
      tag: 'GiveAway',
    };

    const response = await fetch('http://media.mw.metropolia.fi/wbma/tags', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': userToken,
      },
      body: JSON.stringify(tagData),
    });
    const json = await response.json();
    console.log('tag added', json);
  };

  const resetForm = (setFile) => {
    setInputs(initInputs);
    setFile({});
  };

  return {
    handleTitleChange,
    handleDescriptionChange,
    handleUpload,
    inputs,
    resetForm,
  };
};

export default useUploadForm;
