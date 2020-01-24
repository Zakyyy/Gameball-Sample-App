import React, { Component } from 'react';
import { Platform, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

class GameballWidget extends Component {
  static apiKey = '';
  static lang = '';
  static playerId = '';
  constructor(props) {
    super(props);
    this.state = {
      api: '',
      refreshing: false
    }
  }

  static init(api, lang) {
    GameballWidget.apiKey = api;
    GameballWidget.lang = lang;
  }
  static initialize_player(playerId) {
    GameballWidget.playerId = playerId;
  }
  static getApiKey() {
    return GameballWidget.apiKey;
  }
  onRefreshWidget() {
    this.webview.reload();
  }
  render() {
    if (this.props) {
      params = 'playerId=' + GameballWidget.playerId + '&apiKey=' + GameballWidget.apiKey + '&lang=' + GameballWidget.lang;
      sourceUri =
        Platform.OS === 'android'
          ? 'file:///android_asset/Web.bundle/site/index.html?playerId=' + GameballWidget.playerId + '&apiKey=' + GameballWidget.apiKey + '&lang=' + GameballWidget.lang
          : 'assets/html/Web.bundle/loader.html';
      var injectedJS = `
          if (!window.location.search) {
            var link = document.getElementById('progress-bar');
            link.href = './site/index.html?${params}';
            link.click();
          }
    `;
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefreshWidget.bind(this)} />
          }
        >
          {Platform.OS === 'ios' &&
            <WebView
              ref={(webview) => this.webview = webview}
              source={{ uri: sourceUri }}
              javaScriptEnabled={true}
              startInLoadingState
              useWebKit={true}
              injectedJavaScript={injectedJS}
              originWhitelist={['*']}
              allowFileAccess={true}
            />
          }
          {Platform.OS === 'android' &&
            <WebView
              ref={(webview) => this.webview = webview}
              source={{ uri: sourceUri }}
              javaScriptEnabled={true}
              originWhitelist={['*']}
              allowFileAccess={true}
              startInLoadingState
              useWebKit={true}
            />
          }
        </ScrollView>
      </SafeAreaView>
    );
  }

}

export default (GameballWidget);