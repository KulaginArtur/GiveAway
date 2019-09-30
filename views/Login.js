import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';
import mediaAPI from '../hooks/ApiHooks';


const Login = (props) => {
  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
  } = useSignUpForm();
  const {signInAsync, registerAsync} = mediaAPI();
  return (
    <View style={styles.container}>

      <View style={styles.form}>
        <Text>Login</Text>
        <FormTextInput
          autoCapitalize='none'
          value={inputs.username}
          placeholder='username'
          onChangeText={handleUsernameChange}
        />
        <FormTextInput
          autoCapitalize='none'
          value={inputs.password}
          placeholder='password'
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />
        <Button title="Sign in!" onPress={
          () => {
            signInAsync(inputs, props);
          }
        } />
      </View>

      <View style={styles.form}>
        <Text>Register</Text>
        <FormTextInput
          autoCapitalize='none'
          value={inputs.username}
          placeholder='username'
          onChangeText={handleUsernameChange}
        />
        <FormTextInput
          autoCapitalize='none'
          value={inputs.password}
          placeholder='password'
          onChangeText={handlePasswordChange}
        />
        <FormTextInput
          autoCapitalize='none'
          value={inputs.email}
          placeholder='email'
          onChangeText={handleEmailChange}
        />
        <FormTextInput
          value={inputs.fullname}
          placeholder='fullname'
          onChangeText={handleFullnameChange}
        />
        <Button title="Register!" onPress={
          () => {
            registerAsync(inputs, props);
          }
        } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  form: {
    width: '80%',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};


export default Login;
