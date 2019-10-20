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
import Background from 'assets/background.png';

const side = Dimensions.get('screen').width;
const moveFirstX = -900;
const moveSecond = -200;
const scaleFirst = 10;

class Landing extends Component {
  state = { 
    scroll: new Animated.Value(1),
    velocity: new Animated.Value(0),
  };

  render() {
    const firstTransformX = this.state.scroll.interpolate({
      inputRange: [0, 500],
      outputRange: [(moveFirstX - 80), (moveFirstX - 180)],
      extrapolate: 'clamp',
    });
    const firstOpacity = this.state.scroll.interpolate({
      inputRange: [0, 500],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const secondTransformY = this.state.scroll.interpolate({
      inputRange: [1000, 1700],
      outputRange: [-300, 150],
      extrapolate: 'clamp',
    });
    const thirdTransformY = this.state.scroll.interpolate({
      inputRange: [1000, 1700],
      outputRange: [0, 270],
      extrapolate: 'clamp',
    });
    const titleTransform = this.state.scroll.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 90],
      extrapolate: 'clamp',
    });
    const titleOpacity = this.state.scroll.interpolate({
      inputRange: [0, 150],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const backgroundTransformY = this.state.scroll.interpolate({
      inputRange: [0, 1000],
      outputRange: [-125, 375],
      extrapolate: 'clamp',
    });
    const textTransformY = this.state.scroll.interpolate({
      inputRange: [1700, 2000],
      outputRange: [0, 150],
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
            <View style={{ flex: 1, justifyContent: 'space-between', height: 3000 }}>
              <Animated.View style={{
                alignItems: 'center',
                padding: 20,
                backgroundColor: '#666',
                borderBottomEndRadius: 150,
                borderBottomStartRadius: 150,
                opacity: titleOpacity,
                transform: [
                  { translateY: titleTransform },
                ],
              }}>
                <Text style={{ fontSize: 32, fontFamily: 'Roboto', color: '#fff' }}>Scroll. But slowly :)</Text>
              </Animated.View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ backgroundColor: '#000', padding: 10, paddingHorizontal: 20, borderTopLeftRadius: 50, borderBottomLeftRadius: 50 }}>
                  <Text style={{ fontSize: 64, fontFamily: 'Roboto', color: '#fff' }}>Higher</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-start' }}>
                <Animated.Image source={Background} style={{
                  width: side,
                  height: side,
                  resizeMode: 'contain',
                  zIndex: 9,
                  transform: [
                    { translateY: backgroundTransformY},
                  ],
                }} />
                <Animated.View style={{
                  backgroundColor: '#0195FF',
                  height: 200,
                  width: 200,
                  borderRadius: 100,
                  opacity: firstOpacity,
                  zIndex: 0,
                  transform: [
                    { translateX:  firstTransformX },
                    { scale: scaleFirst },
                  ],
                }}/>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
              <View style={{ backgroundColor: '#000', padding: 10, paddingHorizontal: 20, borderTopLeftRadius: 50, borderBottomLeftRadius: 50 }}>
                <Text style={{ fontSize: 64, fontFamily: 'Roboto', color: '#fff' }}>Further</Text>
              </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Animated.View style={{
                  backgroundColor: '#A3D9FF',
                  height: 300,
                  width: 300,
                  borderRadius: 150,
                  transform: [
                    { translateY: thirdTransformY },
                  ],
                }} />
                <Animated.View style={{
                  backgroundColor: '#0063FF',
                  height: 160,
                  width: 160,
                  borderRadius: 80,
                  transform: [
                    { translateX:  moveSecond },                    
                    { translateY: secondTransformY },
                  ],
                  }}
                />
              </View>
              <Animated.View style={{
                alignItems: 'flex-end',
                transform: [
                  { translateY: textTransformY },
                ],
              }}>
                <View style={{ backgroundColor: '#000', padding: 10, paddingHorizontal: 20, borderTopLeftRadius: 50, borderBottomLeftRadius: 50 }}>                
                  <Text style={{ fontSize: 64, fontFamily: 'Roboto', color: '#fff' }}>Faster</Text>
                </View>
              </Animated.View>
              <Image source={Captain} style={{ width: side, height: side }} />
            </View>  
          </Animated.ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

export default Landing;
