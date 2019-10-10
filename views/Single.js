/* eslint-disable max-len */
import React, {useContext} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import AImage from '../components/AsyncImage';
import {Content, Container, Card, CardItem, Left, Body, Thumbnail, Right} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';

const Single = (props) => {
  const {user} = useContext(MediaContext);
  console.log('user', user);
  const {getAvatar, getUserInfo} = mediaAPI();
  const {navigation} = props;
  const file = navigation.state.params.file;
  return (
    <Content>
      <Container>
        <Card style={{flex: 1}}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: getAvatar(file)}} />
              <Body>
                <Text>{file.title}</Text>
                <Text note>by: {getUserInfo(file.user_id).username}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <AImage
                source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename}}
                style={{
                  borderRadius: 15,
                  width: '100%',
                  height: 400,
                }}
                spinnerColor='#b3e5fc'
              />
            </Body>
          </CardItem>
          <CardItem>
            <Left />
            <Body>
              <Text>{file.description}</Text>
            </Body>
            <Right></Right>
          </CardItem>
          <CardItem>
            <Text>Contact Giver by email:</Text>
          </CardItem>
          <CardItem>
            <Text note >{getUserInfo(file.user_id).email}</Text>
          </CardItem>
        </Card>
      </Container>
    </Content>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Single;
