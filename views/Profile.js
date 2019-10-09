/* eslint-disable max-len */
import React, {useContext} from 'react';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, Container, Content, Text, Button, Card, CardItem, Left, H2, Body, Right} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import AImage from '../components/AsyncImage';
import {MediaContext} from '../contexts/MediaContext';

const Profile = (props) => {
  const {user} = useContext(MediaContext);
  console.log('ret user', user);
  const {getAvatar} = mediaAPI();
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  return (
    <Container>
      <Content>
        {user &&
        <Card>
          <CardItem>
            <Left>
              <Body>
                <H2>{user.username}</H2>
                <Text>{user.full_name}</Text>
              </Body>
            </Left>
            <Right>
              <Button iconRight onPress={signOutAsync} >
                <Text>Sign out</Text>
              </Button>
              <Icon name='log-out' />
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Body>
              <AImage
                source={{uri: getAvatar(user)}}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  width: '100%',
                  height: 200,
                }}
                spinnerColor='#b3e5fc'
              />
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button iconLeft transparent onPress={() => {
                props.navigation.navigate('EditProfile');
              }}>
                <Icon name='cog'/>
                <Text>Edit</Text>
              </Button>
            </Left>
            <Right>
              <Button iconRight transparent onPress={() => {
                props.navigation.navigate('MyFiles');
              }}>
                <Text>My files</Text>
                <Icon name='document' />
              </Button>
            </Right>
          </CardItem>
        </Card>
        }
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
