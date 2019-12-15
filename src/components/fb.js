import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image, ActivityIndicator } from 'react-native';
import { getFBidApi, profilePic } from 'api/fbApi';

class Fb extends Component {
  state = {
    field: '',
    reverseField: '',
    userID: '',
    profileLink: '',
    pic: '',
    loading: false,
    reverseLoading: false,
  }

  _fetchUser() {
    console.log('eheh');
    this.setState({ loading: true });
    getFBidApi(this.state.field)
    .then(res => {
      console.log(res);
      this.setState({
        userID: res.id,
        profileLink: res.url,
        loading: false,
      });
    })
    .catch((e) => {
      console.log(e);
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={{ alignItems: 'center', margin: 40 }}><Text style={{ fontSize: 24, fontFamily: 'Roboto' }}>Facebook</Text></View>
        <View>
          <TextInput
            value={this.state.field}
            onChangeText={(field) => this.setState({ field })}
            placeholder={'profile link'}
            style={{ margin: 10, borderColor: '#bbbbee', borderWidth: 2, borderRadius: 5, padding: 5 }}
          />
          <View style={{ padding: 20 }}>
            <Button onPress={() => this._fetchUser()} title="Get User Details" />
          </View>
        </View>
        {
          this.state.loading ?
          <ActivityIndicator style={{ margin: 50 }} size={40} /> :
          <Text style={{ fontWeight: 'bold', margin: 20 }}>User ID: {this.state.userID}</Text>
        }
        {
          this.state.userID !== '' && !this.state.loading &&
          <Image source={{ uri: `https://graph.facebook.com/${this.state.userID}/picture?type=large` }} style={{ height: 200, width: 200, margin: 20 }} />
        }
      </View>
    );
  }
}

export default Fb;
