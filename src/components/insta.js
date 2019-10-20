import React, { Component } from 'react';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import { View, Text, Button } from 'react-native';

const config = {
    issuer: 'https://dev-696618.oktapreview.com/oauth2/default',
    clientId: '381991259352105',
    redirectUrl: 'com.dev-696618:/callback',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'offline_access']
};

class Insta extends Component {
    state = {
        hasLoggedInOnce: false,
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: '',
    }

    authorize = async () => {
        try {
            const authState = await authorize(config);
            this.setState(
                {
                    hasLoggedInOnce: true,
                    accessToken: authState.accessToken,
                    accessTokenExpirationDate: authState.accessTokenExpirationDate,
                    refreshToken: authState.refreshToken
                },
                500
            );
        } catch (error) {
            alert('Failed to log in', error.message);
        }
    };
    
    refresh = async () => {
        try {
            const authState = await refresh(config, {
                refreshToken: this.state.refreshToken
            });
            this.setState({
                accessToken: authState.accessToken || this.state.accessToken,
                accessTokenExpirationDate: authState.accessTokenExpirationDate || this.state.accessTokenExpirationDate,
                refreshToken: authState.refreshToken || this.state.refreshToken
            });
        } catch (error) {
            alert('Failed to refresh token', error.message);
        }
    };
    
    revoke = async () => {
        try {
            await revoke(config, {
                tokenToRevoke: this.state.accessToken,
                sendClientId: true
            });
            this.setState({
                accessToken: '',
                accessTokenExpirationDate: '',
                refreshToken: ''
            });
        } catch (error) {
            alert('Failed to revoke token', error.message);
        }
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Instagram</Text>
                <View>
                    <Text>Access Token: {this.state.accessToken}</Text>
                </View>
                <View>
                    <Text>Token expiration date: {this.state.accessTokenExpirationDate}</Text>
                </View>
                <View>
                    <Text>refresh Token: {this.state.refresh}</Text>
                </View>
                <Button onPress={() => this.authorize()} title="Authorise" />
            </View>
        );
    }
}

export default Insta;
