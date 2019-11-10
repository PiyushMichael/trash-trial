import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image, ActivityIndicator } from 'react-native';
import { getUserIdApi } from 'api/instaApi';

class Insta extends Component {
    state = {
        field: '',
        user: null,
        loading: false,
        reverseField: '',
        reverseUser: null,
        reverseLoading: false,
    }

    _fetchUser() {
        this.setState({ loading: true });
        getUserIdApi(this.state.field)
        .then(response => {
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
                loading: false,
            });
        })
        .catch(e => {
            console.log(e);
            this.setState({ loading: false });
        });
    }

    _reverseFetch() {
        this.setState({ reverseLoading: true });
        getUserIdApi(this.state.field)
        .then(response => {
            const data = response.data.graphql.user;
            this.setState({
                reverseUser: {
                    name: data.full_name,
                    username: data.username,
                    id: data.id,
                    followers: data.edge_followed_by.count,
                    following: data.edge_follow.count,
                    posts: data.edge_owner_to_timeline_media.count,
                    pic: data.profile_pic_url,
                },
                reverseLoading: false,
            });
        })
        .catch(e => {
            console.log(e);
            this.setState({ reverseLoading: false });
        });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={{ alignItems: 'center', margin: 40 }}><Text style={{ fontSize: 24, fontFamily: 'Roboto' }}>Instagram</Text></View>
                <View style={{ flexDirection: 'row' }}>
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
                    this.state.user && !this.state.loading &&
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
                {
                    this.state.loading && <ActivityIndicator style={{ margin: 50 }} size={40} />
                }
                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                    <TextInput
                        value={this.state.reverseField}
                        onChangeText={(field) => this.setState({ reverseField: field })}
                        placeholder={'user ID'}
                        style={{ width: 200, margin: 10, borderColor: '#bbbbee', borderWidth: 2, borderRadius: 5, padding: 5 }}
                    />
                    <View style={{ padding: 20 }}>
                        <Button onPress={() => this._reverseFetch()} title="ID reverse search" />
                    </View>
                </View>
                {
                    this.state.reverseUser && !this.state.reverseLoading &&
                    <View style={{ margin: 20, flexDirection: 'row' }}>
                        <Image source={{ uri: this.state.reverseUser.pic }} style={{ height: 100, width: 100 }} />
                        <View style={{ margin: 10 }}>
                            <Text>Name: {this.state.reverseUser.name}</Text>
                            <Text>username: {this.state.reverseUser.username}</Text>
                            <Text style={{ fontWeight: 'bold' }}>Account ID: {this.state.reverseUser.id}</Text>
                            <Text>{this.state.reverseUser.followers} followers</Text>
                            <Text>following {this.state.reverseUser.following}</Text>
                            <Text>{this.state.reverseUser.posts} posts</Text>
                        </View>
                    </View>
                }
                {
                    this.state.reverseLoading && <ActivityIndicator style={{ margin: 50 }} size={40} />
                }
            </View>
        );
    }
}

export default Insta;
