import React from 'react';
import { StyleSheet, View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

export default function PlayerVideo({amv, opened}) {

  return (
    <View style={{...style.container, ...(opened ? {display: 'flex'} : {display: 'none'})}}>
      <YoutubePlayer
        height={200}
        play={false}
        videoId={amv}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10
  },
  container_closed: {
    display: 'none'
  }
});