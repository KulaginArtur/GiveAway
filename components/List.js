import React from 'react';
import PropTypes from 'prop-types';
import {List as BaseList} from 'native-base';
import ListItem from './ListItem';
import mediaAPI from '../hooks/ApiHooks';

const List = (props) => {
  const {navigation} = props;
  const {getAllMedia} = mediaAPI();
  const [media, loading] = getAllMedia();
  console.log(loading);
  console.log('media', media);
  return (
    <BaseList
      dataArray={media}
      renderRow={(item) =>
        <ListItem navigation={navigation} singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
