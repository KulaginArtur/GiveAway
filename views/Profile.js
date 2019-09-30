import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log('ret user', user);
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  return (
    <SafeAreaView style={styles.container}>
      {user &&
        <Text>{user.username}</Text>
      }
      <Button title="Logout!" onPress={signOutAsync}
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
    paddingTop: 40,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
