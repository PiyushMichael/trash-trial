import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { getUserIdApi } from 'api/instaApi';

class Insta extends Component {
    state = {
        field: '',
        user: null,
    }

    _fetchUser() {
        getUserIdApi(this.state.field)
        .then(response => {
            console.log(response.data);
            const data = response.data.graphql.user;
            this.setState({
                user: {
                    name: data.full_name,
                    username: data.username,
                    id: data.id,
                    followers: data.edge_followed_by.count,
                    following: data.edge_follow.count,
                    posts: data.edge_owner_to_timeline_media.count,
                    pic: data.profile_pic_url,
                },
            });
        })
        .catch(e => console.log(e));
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={{ alignItems: 'center', margin: 40 }}><Text style={{ fontSize: 24, fontFamily: 'Roboto' }}>Instagram</Text></View>
                <View style={{ flexDirection: 'row'}}>
                    <TextInput
                        value={this.state.field}
                        onChangeText={(field) => this.setState({ field })}
                        placeholder={'Username'}
                        style={{ width: 200, margin: 10, borderColor: '#bbbbee', borderWidth: 2, borderRadius: 5, padding: 5 }}
                    />
                    <View style={{ padding: 20 }}>
                        <Button onPress={() => this._fetchUser()} title="Get User Details" />
                    </View>
                </View>
                {
                    this.state.user &&
                    <View style={{ margin: 20, flexDirection: 'row' }}>
                        <Image source={{ uri: this.state.user.pic }} style={{ height: 100, width: 100 }} />
                        <View style={{ margin: 10 }}>
                            <Text>Name: {this.state.user.name}</Text>
                            <Text>username: {this.state.user.username}</Text>
                            <Text style={{ fontWeight: 'bold' }}>Account ID: {this.state.user.id}</Text>
                            <Text>{this.state.user.followers} followers</Text>
                            <Text>following {this.state.user.following}</Text>
                            <Text>{this.state.user.posts} posts</Text>
                        </View>
                    </View>
                }          
            </View>
        );
    }
}

export default Insta;
