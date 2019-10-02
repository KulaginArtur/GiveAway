/* eslint-disable max-len */
import React, {useContext} from 'react';
import {Content, Card, CardItem, Text, Container, Left, Body, H2} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import AImage from '../components/AsyncImage';
import {MediaContext} from '../contexts/MediaContext';

const EditProfile = () => {
  const {user} = useContext(MediaContext);
  console.log('ret user', user);
  const {getAvatar} = mediaAPI();
  return (
    <Container>
      <Content>
        {user &&
      <Card>

        <CardItem cardBody>
          <Left>
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
          </Left>
        </CardItem>
        <CardItem>
          <Left>
            <Body>
              <H2>{user.username}</H2>
              <Text>{user.full_name}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
        }
      </Content>
    </Container>
  );
};


export default EditProfile;
