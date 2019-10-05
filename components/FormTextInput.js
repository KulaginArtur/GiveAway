import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {View, Input} from 'native-base';


const FormTextInput = (props) => {
  const {style, ...otherProps} = props;
  return (
    <View>
      <TextInput
        style={[styles.textInput, style]} />
      <Input {...otherProps} />
      <TextInput/>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

FormTextInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.string,
};

export default FormTextInput;
