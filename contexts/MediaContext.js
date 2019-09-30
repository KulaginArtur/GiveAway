/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
const initState = [{}, () => {}];

const MediaContext = React.createContext(initState);
const MediaProvider = (props) => {
  const [media, setMedia] = useState({});
  return (
    <MediaContext.Provider value={[media, setMedia]}>
      {props.children}
    </MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  children: PropTypes.node,
};

export {MediaContext, MediaProvider};
