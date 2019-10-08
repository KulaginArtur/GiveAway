import {useState, useContext} from 'react';
import mediaAPI from './ApiHooks';
const {uploadEdit, uploadFile} = mediaAPI();
import {MediaContext} from '../contexts/MediaContext';

const useEditForm = () => {
  const [inputs, setInputs] = useState({});
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
  const handleAvatarEdit = (file, navigation) => {
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

    const moreData = {
      description: 'avatar_' + user.user_id,
      status: 'active',
    };

    fd.append('description', JSON.stringify(moreData));
    uploadFile(fd).then((response) => {
      console.log('New avatar', response);
    }).catch((err) => {
      console.log(err);
    });
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
