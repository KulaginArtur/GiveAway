/* eslint-disable max-len */
import React from 'react';
import MyFilesList from '../components/MyFilesList';
import PropTypes from 'prop-types';
import {Container, Content} from 'native-base';


const MyFiles = (props) => {
  const {navigation} = props;
  return (
    <Container>
      <Content>
        <MyFilesList navigation={navigation}></MyFilesList>
      </Content>
    </Container>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
