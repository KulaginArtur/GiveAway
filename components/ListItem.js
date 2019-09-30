import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

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
    <TouchableOpacity
      style={styles.row}
      onPress={
        () => {
          console.log('klik');
          navigation.push('Single', {file: singleMedia});
        }
      }
    >
      <View style={styles.imagebox}>
        {tn && <Image
          style={styles.image}
          source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160}}
        />}
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTitle}> {singleMedia.title} </Text>
        <Text> {singleMedia.description} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#eee',
    borderRadius: 16,
  },
  imagebox: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  textbox: {
    flex: 2,
    padding: 10,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
