/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {MediaProvider} from './contexts/MediaContext';
import Navigator from './navigators/Navigator';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from 'expo';

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);
  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <MediaProvider>
      <Navigator></Navigator>
    </MediaProvider>
  );
};

export default App;
