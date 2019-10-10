/* eslint-disable max-len */
import React from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';
import {Header, Container, Content, Left, Button, Icon, Body, Title, Right} from 'native-base';


const Home = (props) => {
  const {userToContext} = mediaAPI();
  userToContext().then((user) => {
    console.log('usercontext', user);
  });
  const {navigation, singleMedia} = props;

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() =>{
            navigation.push('Upload', {file: singleMedia});
          }}>
            <Icon name='add'/>
          </Button>
        </Left>
        <Body>
          <Title>GiveAway</Title>
        </Body>
        <Right/>
      </Header>
      <Content>
        <List navigation={navigation}></List>
      </Content>
    </Container>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
  singleMedia: PropTypes.object,
};

export default Home;
