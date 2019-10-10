/* eslint-disable max-len */
import React from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';
import {StatusBar} from 'react-native';
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
        <StatusBar hidden={true}/>
        <Left>
          <Button transparent onPress={() =>{
            navigation.push('Upload', {file: singleMedia});
          }}>
            <Icon name='add'/>
          </Button>
        </Left>
        <Body>
          <Title style={{marginLeft: 90}}>GiveAway</Title>
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
