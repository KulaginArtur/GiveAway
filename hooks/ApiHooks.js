import {useState, useContext, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {MediaContext} from '../contexts/MediaContext';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const fetchGetUrl = async (url) => {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log('fetchGetUrl', url);
  const response = await fetch(url, {
    headers: {
      'x-access-token': userToken,
    },
  });
  const json = await response.json();
  console.log('fetchUrl json', json);
  return json;
};

const fetchPostUrl = async (url, data) => {
  console.log('fetchPostUrl', url);
  console.log('fetchPostUrl data', data);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log('fetchPostUrl json', json);
  return json;
};

const fetchUploadUrl = async (url, data, token) => {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log('fetchUploadUrl', url, data, userToken);
  const response = await fetch(apiUrl + url, {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
      'x-access-token': userToken,
    },
    body: data,
  });
  let json = {error: 'oops'};
  if (response.ok) {
    json = await response.json();
    console.log('fetchUploadUrl json', json);
  }
  return json;
};

const fetchPutUrl = async (url, data, token) => {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log('fetchPutUrl', url, data, userToken);
  const response = await fetch(apiUrl + url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': userToken,
    },
    body: JSON.stringify(data),
  });
  let json = {error: 'oops'};
  console.log('Edit', response);
  if (response.ok) {
    json = await response.json();
    console.log('FetchPutUrl json', json);
  }
  return json;
};

const fetchDeleteUrl = async (url, token = '') => {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log('fetchDeleteUrl', url, userToken);
  const response = await fetch(apiUrl + url, {
    method: 'DELETE',
    headers: {
      'x-access-token': userToken,
    },
  });
  const json = await response.json();
  console.log('fetchDeleteUrl json', json);
  return json;
};

const mediaAPI = () => {
  const getAllMedia = () => {
    const {media, setMedia} = useContext(MediaContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetchGetUrl(apiUrl + 'tags/GiveAway').then((json) => {
        setMedia(json);
        setLoading(false);
      });
    }, []);
    return [media, loading];
  };

  const reloadAllMedia = (setMedia, setMyMedia) => {
    fetchGetUrl(apiUrl +'tags/GiveAway').then((json) => {
      setMedia(json);
    });
    fetchGetUrl(apiUrl +'media/user').then((json) => {
      setMyMedia(json);
    });
  };

  const getThumbnail = (url) => {
    const [thumbnails, setThumbnails] = useState({});
    useEffect(() => {
      fetchGetUrl(apiUrl + 'media/' + url).then((json) => {
        setThumbnails(json.thumbnails);
      });
    }, []);
    return thumbnails;
  };
  const signInAsync = async (inputs, props) => {
    const data = {
      'username': inputs.username,
      'password': inputs.password,
    };
    const json = await fetchPostUrl(apiUrl + 'login', data);
    await AsyncStorage.setItem('userToken', json.token);
    await AsyncStorage.setItem('user', JSON.stringify(json.user));
    props.navigation.navigate('App');
  };
  const registerAsync = async (inputs, props) => {
    const data = {
      'username': inputs.username,
      'password': inputs.password,
      'email': inputs.email,
      'full_name': inputs.full_name,
    };
    const json = await fetchPostUrl(apiUrl + 'users', data);
    if (!json.error) {
      signInAsync(inputs, props);
    }
  };

  const userToContext = async () => {
    const {user, setUser} = useContext(MediaContext);
    const getFromStorage = async () => {
      const storageUser = JSON.parse(await AsyncStorage.getItem('user'));
      console.log('storage', storageUser);
      setUser(storageUser);
    };
    useEffect(() => {
      getFromStorage();
    }, []);
    return [user];
  };


  const getAvatar = (user) => {
    const [avatar, setAvatar] = useState('http://placekitten.com/100/100');
    console.log('avatar', apiUrl + 'tags/avatar_' + user.user_id);
    useEffect(() => {
      fetchGetUrl(apiUrl + 'tags/avatar_' + user.user_id).then((json) => {
        console.log('avatarjson', json[0].file_id);
        setAvatar(apiUrl + 'uploads/' + json[0].filename);
      });
    }, []);
    return avatar;
  };

  const getAvatarFileId = (user) => {
    const [avatar, setAvatar] = useState('http://placekitten.com/100/100');
    console.log('avatar', apiUrl + 'tags/avatar_' + user.user_id);
    useEffect(() => {
      fetchGetUrl(apiUrl + 'tags/avatar_' + user.user_id).then((json) => {
        console.log('avatarjson', json[0].file_id);
        setAvatar(json[0].file_id);
      });
    }, []);
    return avatar;
  };

  const getUserInfo = (userId) => {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
      fetchGetUrl(apiUrl + 'users/' + userId).then((json) => {
        setUserInfo(json);
      }).catch((error)=>{
        console.log(console.error);
      });
    }, []);
    return userInfo;
  };

  const checkAvailable = async (username) => {
    const json = await fetchGetUrl(apiUrl + 'users/username/' + username);
    if (!json.error) {
      if (json.available) {
        return 'Username ' + json.username + ' is available. ';
      } else {
        return 'Username ' + json.username + ' is not available. ';
      }
    } else {
      console.log(json.error);
    }
  };

  const uploadFile = async (formData) => {
    return fetchUploadUrl('media', formData).then((json) => {
      return json;
    });
  };

  const uploadEdit = async (formData) => {
    return fetchPutUrl('users', formData).then((json) => {
      return json;
    });
  };
  const getAllMyMedia = () => {
    const {myMedia, setMyMedia} = useContext(MediaContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetchGetUrl(apiUrl + 'media/user').then((json) => {
        setMyMedia(json);
        setLoading(false);
      });
    }, []);
    return [myMedia, loading];
  };
  const deleteMedia = async (file, setMyMedia, setMedia) => {
    return fetchDeleteUrl('media/' + file.file_id).then((json) => {
      console.log('delete', json);
      setMedia([]);
      setMyMedia([]);
      reloadAllMedia(setMedia, setMyMedia);
    });
  };
  const deleteAvatar = async (file, setMyMedia, setMedia) => {
    return fetchDeleteUrl('media/' + file).then((json) => {
      console.log('delete', json);
      setMedia([]);
      setMyMedia([]);
      reloadAllMedia(setMedia, setMyMedia);
    });
  };

  return {
    getAllMedia,
    getThumbnail,
    signInAsync,
    registerAsync,
    userToContext,
    getAvatar,
    getAvatarFileId,
    getUserInfo,
    checkAvailable,
    uploadFile,
    reloadAllMedia,
    getAllMyMedia,
    deleteMedia,
    uploadEdit,
    deleteAvatar,
  };
};

export default mediaAPI;
