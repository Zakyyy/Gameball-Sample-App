import React, { Component } from 'react';
import { View, Text, TextInput, Button, SafeAreaView } from 'react-native';
import { addClientData } from '../actions/AuthActions';
import { connect } from 'react-redux';
class FourthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      apiKey: '02988d00c3d54ce79387d941a689f404',
    };
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 20, marginRight: 20 }}>Add client data</Text>
        <View style={{ flex: 1, flexDirection: 'column', padding: 20, paddingTop: 5 }}>
          <View style={{ marginTop: 20 }}>
            <Text>API Key</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'black' }}
              onChangeText={text => this.setState({ apiKey: text })}
              value={this.state.apiKey}
              placeholder="apiKey"
              placeholderTextColor="grey"
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>Language</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'black' }}
              onChangeText={text => this.setState({ lang: text })}
              value={this.state.lang}
              placeholder="lang"
              placeholderTextColor="grey"
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              title={"Add Client Data"}
              onPress={() => this.props.addClientData(this.state.apiKey, this.state.lang, this.props.navigation)}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default connect(null, { addClientData })(FourthScreen);