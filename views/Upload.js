/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {Form, Button, Text, Content, Spinner} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const Upload = (props) => {
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    inputs,
    handleTitleChange,
    handleDescriptionChange,
    handleUpload,
    resetForm,
  } = useUploadForm();

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

    console.log('pick a image', result);

    if (!result.cancelled) {
      setFile(result);
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  return (
    <Content>
      {file.type === 'image' &&
        <Image
          source={{uri: file.uri}}
          style={{width: 200, height: 200}}
        />
      }
      {loading && <Spinner />}
      {!loading && <Form>
        <FormTextInput
          value={inputs.title}
          placeholder='title'
          onChangeText={handleTitleChange}
        />
        <FormTextInput
          value={inputs.description}
          placeholder='description'
          onChangeText={handleDescriptionChange}
        />
        <Button transparent
          onPress={pickImage}
        >
          <Text>Choose file</Text>
        </Button>
        {file.uri && inputs.title.length > 3 && (inputs.description.length == 0 || inputs.description.length > 5) &&
        <Button transparent
          onPress={() => {
            handleUpload(file, setLoading, props.navigation);
          }}
        >
          <Text>Upload file</Text>
        </Button>
        }
        <Button block onPress={() => resetForm(setFile)}>
          <Text>Reset</Text>
        </Button>
      </Form>
      }
    </Content>

  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
