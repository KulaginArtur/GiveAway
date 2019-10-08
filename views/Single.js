import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import PropTypes from 'prop-types';
import AImage from '../components/AsyncImage';

const Single = (props) => {
  const {navigation} = props;
  console.log('Singel navi', navigation.state);
  const file = navigation.state.params.file;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{file.title}</Text>
      <AImage
        source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename}}
        style={{
          borderRadius: 50,
          width: '100%',
          height: '90%',
        }}
        spinnerColor='#b3e5fc'
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Single;
