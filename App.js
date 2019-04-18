import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  render() {
    let html = `
    
   <!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>GameBall widget test</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <script>
    window.GbLoadInit = function(){
      alert('lib init');
      GbSdk.init({
        user: {
          externalId:'noha@gameball.co',
          DisplayName:'Omar Alfar',
          FirstName:"Omar",
          LastName:'Alfar', 
          DateOfBirth:'1995-12-17T03:24:00',
          Gender:'M'
        },
        clientId:'8fdfd2dffd-9mnvhu25d6c3d',
        locale: 'en'
      });
      GbSdk.onInit(function(app){
        //GbSdk.sendEvent();
      });
    }
    function test(type){
      GbSdk.sendEvent(type);
    }
  </script>
	<script async defer src="http://192.168.1.10:8080/js/gameball-init.js"></script>
  <script>

</script>

<style>
  body{
       font-size:4px !important;
      height: 2000px;
      background:
              linear-gradient(63deg, #444 23%, transparent 23%) 7px 0,
              linear-gradient(63deg, transparent 74%, #444 78%),
              linear-gradient(63deg, transparent 34%, #444 38%, #444 58%, transparent 62%),
              #555;
      background-size: 16px 48px;
  }
  p{
   font-size:4px !important;
  }
  
</style>

</head>
<body   >
<h1>GameBall widget test</h1>
<div id="myWidget"></div>
<button onclick="test('event_1')">Toast 1</button>
<button onclick="test('event_2')">Toast 2</button>
<button onclick="test('event_3')">Popup 1</button>
<button onclick="test('event_4')">Popup 2</button>
</body>
</html>
    
    `;
    return (
      <WebView
      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{ uri: 'http://192.168.1.10:8080' }} style={{ marginTop: 0  }} />
    );
  }
}