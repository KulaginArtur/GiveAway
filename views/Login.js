import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';
import mediaAPI from '../hooks/ApiHooks';

const Login = (props) => {
  const [formToggle, setFormToggle] = useState(true);
  const {
    inputs,
    errors,
    handleLoginUsernameChange,
    handleLoginPasswordChange,
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmChange,
    handleEmailChange,
    handleFullnameChange,
    validateOnSend,
    checkUserAvailable,
  } = useSignUpForm();
  const {signInAsync, registerAsync} = mediaAPI();
  return (
    <View style={styles.container}>
      {formToggle &&
        <View style={styles.form}>
          <Text>Login</Text>
          <FormTextInput
            autoCapitalize='none'
            value={inputs.username}
            placeholder='username'
            onChangeText={handleLoginUsernameChange}
            error={errors.username}
          />
          <FormTextInput
            autoCapitalize='none'
            value={inputs.password}
            placeholder='password'
            onChangeText={handleLoginPasswordChange}
            secureTextEntry={true}
            error={errors.password}
          />
          <Button
            title='Sign in!'
            onPress={() => {
              signInAsync(inputs, props);
            }}
          />
          <Text>or</Text>
          <Button
            title='Register'
            onPress={() => {
              setFormToggle(false);
            }}
          />
        </View>
      }

      {!formToggle &&
        <View style={styles.form}>
          <Text>Register</Text>
          <FormTextInput
            autoCapitalize='none'
            value={inputs.username}
            placeholder='username'
            onChangeText={handleUsernameChange}
            onEndEditing={checkUserAvailable}
            error={errors.username}
          />
          <FormTextInput
            autoCapitalize='none'
            value={inputs.password}
            placeholder='password'
            onChangeText={handlePasswordChange}
            error={errors.password}
          />
          <FormTextInput
            autoCapitalize='none'
            value={inputs.confirm}
            placeholder='confirm password'
            onChangeText={handleConfirmChange}
            error={errors.confirm}
          />
          <FormTextInput
            autoCapitalize='none'
            value={inputs.email}
            placeholder='email'
            onChangeText={handleEmailChange}
            error={errors.email}
          />
          <FormTextInput
            value={inputs.fullname}
            placeholder='fullname'
            onChangeText={handleFullnameChange}
          />
          <Button
            title='Register!'
            onPress={() => {
              if (validateOnSend()) {
                registerAsync(inputs, props);
              }
            }}
          />
          <Text>or</Text>
          <Button
            title='Login'
            onPress={() => {
              setFormToggle(true);
            }}
          />
        </View>
      }
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
