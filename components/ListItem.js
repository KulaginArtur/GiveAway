/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {ListItem as BaseListItem, Thumbnail, Content, Card, CardItem} from 'native-base';
// import mediaAPI from '../hooks/ApiHooks';

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
    <BaseListItem thumbnail>
      <Content>
        <Card>
          <CardItem button onPress={() => {
            navigation.push('Single', {file: singleMedia});
          }}>
            {tn && <Thumbnail square large source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160}} />}
          </CardItem>
        </Card>
      </Content>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
