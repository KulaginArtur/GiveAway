/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem as BaseListItem, Thumbnail, Card, CardItem, View, Text} from 'native-base';


const getThumbnail = (url) => {
  console.log('urli', url);
  const [thumbnails, setThumbnails] = useState({});
  async function fetchUrl() {
    console.log('fetsurl');
    const response = await fetch('http://media.mw.metropolia.fi/wbma/media/' + url);
    const json = await response.json();
    console.log('json', json);
    setThumbnails(json.thumbnails);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return thumbnails;
};

const ListItem = (props) => {
  const {navigation, singleMedia} = props;
  const tn = getThumbnail(singleMedia.file_id);
  console.log('thumbnails', tn);
  return (
    <View style={{display: 'flex'}}>
      <BaseListItem>
        <Card style={{width: '100%'}}>
          <CardItem button onPress={() => {
            navigation.push('Single', {file: singleMedia});
          }}>
            {tn && <Thumbnail square large source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160}} />}
            <Text style={styles.title}>{singleMedia.title}</Text>
          </CardItem>
        </Card>
      </BaseListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '100',
    marginLeft: 60,
    textAlign: 'center',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
