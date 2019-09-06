/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,TextInput, Picker, Button 
} from 'react-native';
import { GameballWidget } from './GbReactLibrary';
import TabBar from 'react-native-nav-tabbar';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      page: 0,
      apiKey: '8fdfd2dffd-9mnvhu25d6c3d',
      playerId: 'matrix',
      language: 'ar'
    };
    this.api = new GameballWidget();
  }
  render() {
    
    return (
    <TabBar>

      <TabBar.Item
          icon={require('./images/Home.png')}
          selectedIcon={require('./images/HomeActive.png')}
          title="Home"
      >
          <View style={styles.textContent}>
          <GameballWidget clientId={this.state.apiKey}
                locale={this.state.language}
                externalId={this.state.playerId}
                displayName='Pradeep'
                firstName=''
                lastName=''
                dateOfBirth=''
                gender='' 
                render='false'>
              </GameballWidget>
              <Text style={styles.welcome}>
                Gameball Demo
          </Text>
              <Text style={{ marginLeft: 10 }}>
                API Key
          </Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                onChangeText={(text) => this.setState({ text })}
                value={this.state.apiKey}
              />
              <Text style={{ marginLeft: 10 }}>
                Player ID
          </Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                onChangeText={(text) => this.setState({ text })}
                value={this.state.playerId}
              />
              <Text style={{ marginLeft: 10 }}>
                Language
          </Text>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 50, borderColor: 'gray', borderWidth: 1 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }>
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Arabic" value="ar" />
              </Picker>
          </View>
      </TabBar.Item>
      <TabBar.Item>
          <View style={styles.textContent}>
              <Text style={{fontSize: 18}}>Friends</Text>
  
          </View>
      </TabBar.Item>
      <TabBar.Item
          icon={require('./images/My.png')}
          selectedIcon={require('./images/MyActive.png')}
          title="Me"
      >
                <View style={styles.textContent}>
              <Text style={{fontSize: 18}}>Me</Text>
              <GameballWidget clientId={this.state.apiKey}
                locale={this.state.language}
                externalId={this.state.playerId}
                displayName='Pradeep'
                firstName=''
                lastName=''
                dateOfBirth=''
                gender='' 
                render='true'>
              </GameballWidget>
          </View>
    </TabBar.Item>
  </TabBar>)
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    height: 40
  },
  myPackage: {
    flex: 1,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  myText: {
    textAlign: 'center',
  },
  myTabIndex: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 100
  },
});

