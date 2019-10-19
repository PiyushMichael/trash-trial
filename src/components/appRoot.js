/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, View, Text, StatusBar, Image, Dimensions, Animated } from 'react-native';
import Captain from 'assets/captain.png';

const side = Dimensions.get('screen').width;
const moveFirst = -900;
const moveSecond = -200;
const scaleFirst = 10;

class AppRoot extends Component {
  state = { 
    scroll: new Animated.Value(1),
    velocity: new Animated.Value(0),
  };

  render() {
    const firstTransformX = this.state.scroll.interpolate({
      inputRange: [0, 300],
      outputRange: [moveFirst, (moveFirst - 150)],
      extrapolate: 'clamp',
    });

    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Animated.ScrollView
            contentInsetAdjustmentBehavior="automatic"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scroll }, velocity: { y: this.state.velocity} } }],
              { useNativeDriver: true }
            )}
          >
            <View style={{ flex: 1, justifyContent: 'space-between', height: 4000 }}>
              <View style={{ alignItems: 'center', padding: 20, backgroundColor: '#666', borderBottomEndRadius: 150, borderBottomStartRadius: 150 }}>
                <Text style={{ fontSize: 32, fontFamily: 'Roboto', color: '#fff' }}>Scroll all the way down</Text>
              </View>
              <View style={{ alignItems: 'flex-end', margin: 20 }}>
                <Text style={{ fontSize: 64, fontFamily: 'Roboto' }}>Higher</Text>
              </View>
              <View style={{ alignItems: 'flex-start' }}>
                <Animated.View style={{
                  backgroundColor: '#888888',
                  height: 200,
                  width: 200,
                  borderRadius: 100,
                  transform: [
                    { translateX:  firstTransformX },
                    { scale: scaleFirst },
                  ],
                  }}
                />
              </View>
              <View style={{ alignItems: 'flex-end', margin: 20 }}>
                <Text style={{ fontSize: 64, fontFamily: 'Roboto' }}>Further</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ backgroundColor: '#888888', height: 300, width: 300, borderRadius: 150 }} />
                <Animated.View style={{
                  backgroundColor: '#888888',
                  height: 160,
                  width: 160,
                  borderRadius: 80,
                  transform: [
                    { translateX:  moveSecond },
                  ],
                  }}
                />
              </View>
              <View style={{ alignItems: 'flex-end', margin: 20 }}>
                <Text style={{ fontSize: 64, fontFamily: 'Roboto' }}>Faster</Text>
              </View>
              <Image source={Captain} style={{ width: side, height: side }} />
            </View>  
          </Animated.ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

export default AppRoot;
