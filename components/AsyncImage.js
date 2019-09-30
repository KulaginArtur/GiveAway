import React, {useState} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

const AImage = (props) => {
  console.log('Asimage props', props);
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    // This only exists so the transition can be seen
    // if loaded too quickly.
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };
  const {
    spinnerColor,
    style,
    source,
  } = props;
  return (
    <View style={style}>
      <Image
        source={source}
        resizeMode={'contain'}
        style={[
          style,
          {
            position: 'absolute',
            resizeMode: 'contain',
          },
        ]}
        onLoad={onLoad} />

      {!loaded &&
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ActivityIndicator size="large" color={spinnerColor}/>
            </View>
      }
    </View>
  );
};

AImage.propTypes = {
  spinnerColor: PropTypes.string,
  style: PropTypes.object,
  source: PropTypes.object,
};

export default AImage;
