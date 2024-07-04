import {Button, StyleSheet, Text, View} from 'react-native';

import {
  NativeWechatConstants,
  registerApp,
  sendAuthRequest,
  shareWebpage,
} from 'expo-native-wechat';
import {useEffect, useState} from 'react';
import React from 'react';

export default function App() {
  const [text, setText] = useState('');

  const register = async () => {
    registerApp({
      appid: 'wx4351cdd3d762dfbf',
      log: true,
      universalLink: 'https://app.woohelps.com/',
    });
  };

  const onAuth = async () => {
    try{
      console.log('onauth')

    const val = await sendAuthRequest({scope: 'snsapi_userinfo'});
    setText(JSON.stringify(val));

    }catch(e){
      console.log(e,12321312)
    }

  };

  const onShareWeb = async () => {
    await shareWebpage({
      title: 'Test',
      description: 'Hello',
      scene: NativeWechatConstants.WXSceneSession,
      webpageUrl: 'https://baidu.com',
      coverUrl: 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
    });
  };

  useEffect(() => {
    register();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{text ? text : 'not log-in yet.'}</Text>

      <Button onPress={onAuth} title="Login" />

      <Button onPress={onShareWeb} title="Share Webpage" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
