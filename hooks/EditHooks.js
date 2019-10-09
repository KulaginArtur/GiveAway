import {useState, useContext} from 'react';
import mediaAPI from './ApiHooks';
import {AsyncStorage} from 'react-native';
const {uploadEdit, uploadFile} = mediaAPI();
import {MediaContext} from '../contexts/MediaContext';

const useEditForm = () => {
  const [inputs, setInputs] = useState({});
  const {setMedia} = useContext(MediaContext);
  const {user} = useContext(MediaContext);
  const handleUsernameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };
  const handlePasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };
  const handleEmailChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };
  const handleFullnameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        full_name: text,
      }));
  };
  const handleAvatarEdit = async (file, navigation) => {
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
    }
    // Upload the image using the fetch and FormData APIs
    // Assume "photo" is the name of the form field the server expects
    fd.append('file', {uri: file.uri, name: filename, type});
    fd.append('title', 'avatar');
    uploadFile(fd).then((response) => {
      console.log('New avatar', response);
      console.log('File iD', response.file_id);
      addTag(response.file_id, userToken).then(()=> {
        setMedia([]);
      });
    }).catch((err) => {
      console.log(err);
    });
  };

  const addTag = async (id, userToken) => {
    const tagData = {
      file_id: id,
      tag: 'avatar_' + user.user_id,
    };
    console.log('moikka', tagData);
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

  const handleEdit = (inputs, navigation) => {
    const userData = {
      username: inputs.username,
      full_name: inputs.full_name,
      email: inputs.email,
      password: inputs.password,
    };

    uploadEdit(userData).then((response) => {
      console.log('edit resp', response);
      navigation.navigate('Profile');
    }).catch((err) => {
      console.log(err);
    });
  };

  return {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    handleEdit,
    handleAvatarEdit,
    inputs,
  };
};


export default useEditForm;
