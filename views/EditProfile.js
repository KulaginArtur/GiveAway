/* eslint-disable max-len */
import React, {useContext, useEffect, useState} from 'react';
import {Content, Card, CardItem, Text, Container, Body, H2, Button, Left, Right} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import AImage from '../components/AsyncImage';
import {MediaContext} from '../contexts/MediaContext';
import FormTextInput from '../components/FormTextInput';
import useEditForm from '../hooks/EditHooks';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const EditProfile = (props) => {
  const {user, setMedia, setMyMedia} = useContext(MediaContext);
  console.log('ret user', user);
  const {getAvatar, getAvatarFileId, deleteAvatar} = mediaAPI();
  const [file, setFile] = useState({});

  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    handleEdit,
    handleAvatarEdit,
  } = useEditForm();

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      setFile(result);
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const avatar = getAvatarFileId(user);

  return (
    <Container>
      <Content>
        {user &&
      <Card>
        <CardItem cardBody>
          <Body>
            <AImage
              source={{uri: getAvatar(user)}}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                width: '100%',
                height: 150,
              }}
              spinnerColor='#b3e5fc'
            />
          </Body>
        </CardItem>
        <CardItem >
          <Body>
            <H2>{user.username}</H2>
            <Text>{user.full_name}</Text>
            <Text>{user.email}</Text>
          </Body>
        </CardItem>
        <FormTextInput
          autoCapitalize='none'
          value={inputs.username}
          placeholder='username'
          onChangeText={handleUsernameChange}
        />
        <FormTextInput
          autoCapitalize='none'
          value={inputs.fullname}
          placeholder='fullname'
          onChangeText={handleFullnameChange}
        />
        <FormTextInput
          autoCapitalize='none'
          value={inputs.email}
          placeholder='email'
          onChangeText={handleEmailChange}
        />
        <FormTextInput
          autoCapitalize='none'
          value={inputs.password}
          placeholder='password'
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
        />
        <Button transparent onPress={pickImage}>
          <Text>Select New Profile Picture</Text>
        </Button>
        <Button transparent onPress={() => {
          handleEdit(inputs, props.navigation);
          deleteAvatar(avatar, setMyMedia, setMedia);
          handleAvatarEdit(file);
        }}>
          <Text>Change</Text>
        </Button>
      </Card>
        }
        <Card>
          <Left/>
          <Body>
            <Text style={{marginRight: 15, marginLeft: 15}}>For changes to take effect sign out and sing in with your new username and password</Text>
          </Body>
          <Right/>

        </Card>
      </Content>
    </Container>
  );
};

EditProfile.propTypes = {
  navigation: PropTypes.object,
};

export default EditProfile;
