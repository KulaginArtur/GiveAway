/* eslint-disable max-len */
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';


const Home = (props) => {
  const {navigation} = props;
  const {getUserFromToken} = mediaAPI();
  getUserFromToken();
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation}></List>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
