import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { GraphRequest, GraphRequestManager, LoginButton, AccessToken } from 'react-native-fbsdk';

class Fb extends Component {
    componentDidMount() {
        this.testRequestGraphAPI();
    }

    _responseInfoCallback(error: ?Object, result: ?Object) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      }
    
    testRequestGraphAPI(){
        const infoRequest = new GraphRequest(
        '/me',
        null,
        this._responseInfoCallback,
        );   
        new GraphRequestManager().addRequest(infoRequest).start();
      }

    displayToken() {
      AccessToken.getCurrentAccessToken()
      .then(data => {
          console.log(data);
        }
      )
      .catch();
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Facebook</Text>
                <LoginButton
                  publishPermissions={["email"]}
                  onLoginFinished={(error, result) => {
                    console.log('HIT IT');
                      if (error) {
                        console.log("login has error: " + result.error);
                      } else if (result.isCancelled) {
                        console.log("login is cancelled.");
                      } else {
                        AccessToken.getCurrentAccessToken().then(
                          (data) => {
                            console.log(data.accessToken.toString())
                          }
                        )
                      }
                    }
                  }
                  onLogoutFinished={() => console.log("logout.")}
                />
                <Button title="Access Token" onPress={() => this.displayToken()} />
            </View>
        );
    }
}

export default Fb;
