/* eslint-disable max-len */
import React, {useContext} from 'react';
import {Content, Card, CardItem, Text, Container, Left, Body, H2, Button, Form, Item, Input, Label} from 'native-base';
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
          <Body>
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
          </Body>
        </CardItem>
        <CardItem >
          <Body>
            <H2>{user.username}</H2>
            <Text>{user.full_name}</Text>
          </Body>
        </CardItem>
        <Form>
          <Item floatingLabel>
            <Label>New Username</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>New Full Name</Label>
          </Item>
          <Item floatingLabel last>
            <Label>New Password</Label>
            <Input />
          </Item>
        </Form>
        <CardItem>
          <Button transparent>
            <Text>Choose New profile picture</Text>
          </Button>
        </CardItem>
        <CardItem>
          <Button warning transparent >
            <Text>Change</Text>
          </Button>
        </CardItem>

      </Card>
        }
      </Content>
    </Container>
  );
};


export default EditProfile;
