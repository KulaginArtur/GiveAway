/* eslint-disable max-len */
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {ListItem as BaseListItem, Button, Left, Thumbnail, Body, Right, H2, Text} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';

const MyFilesListItem = (props) => {
  const {setMedia, setMyMedia} = useContext(MediaContext);
  const {navigation, singleMedia} = props;
  const {getThumbnail, deleteMedia} = mediaAPI();
  const tn = getThumbnail(singleMedia.file_id);
  console.log('thumbnails', tn);
  return (
    <BaseListItem thumbnail>
      <Left>
        {tn && <Thumbnail square large source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160}} />
        }
      </Left>
      <Body>
        <H2>{singleMedia.title}</H2>
        <Text numberOfLines={2}>{singleMedia.description}</Text>
      </Body>
      <Right>
        <Button transparent onPress={ () => {
          console.log('klik', singleMedia);
          navigation.push('Single', {file: singleMedia});
        }}>
          <Text>View</Text>
        </Button>
        <Button transparent onPress={() => {
          console.log('press');
          deleteMedia(singleMedia, setMyMedia, setMedia);
        }}>
          <Text>Delete</Text>
        </Button>
      </Right>
    </BaseListItem>
  );
};

MyFilesListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default MyFilesListItem;
