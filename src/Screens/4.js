import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { GameballWidget } from '../../GbReactLibrary';

class ThirdScreen extends Component {
  render() {
    const { navigation } = this.props;
    let apiKey = navigation.getParam('apiKey');
    let playerId = navigation.getParam('playerId');

    return (
      <View style={{ flex: 1, padding: 20 }}>
        <GameballWidget 
          clientId={apiKey}
          playerId={playerId}
          render={true}
          idOnly={true}
        >
          {/* <Button
            title={"Send Event"}
            onPress={() => this.sendEventPressFunction()}
          /> */}
        </GameballWidget>

      </View>
    )
  }
}

export default ThirdScreen;