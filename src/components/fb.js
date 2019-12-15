import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { getFBidApi } from 'api/fbApi';

class Fb extends Component {
    componentDidMount() {
      getFBidApi()
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e)
      });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Facebook</Text>
                
                <Button title="Access Token" />
            </View>
        );
    }
}

export default Fb;
