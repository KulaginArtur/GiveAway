import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MediaContext = React.createContext({});
const MediaProvider = (props) => {
  const {
    media: initialMedia,
    myMedia: initialMyMedia,
    user: initialUser,
    children,
  } = props;
  const [media, setMedia] = useState(initialMedia);
  const [myMedia, setMyMedia] = useState(initialMyMedia);
  const [user, setUser] = useState(initialUser);

  const appContext = {
    user,
    setUser,
    media,
    setMedia,
    myMedia,
    setMyMedia,
  };

  return (
    <MediaContext.Provider value={appContext}>
      {children}
    </MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  media: PropTypes.array,
  myMedia: PropTypes.array,
  user: PropTypes.object,
  children: PropTypes.node,
};

MediaProvider.defaultProps = {
  media: [],
  myMedia: [],
  user: {},
};

export {MediaContext, MediaProvider};
