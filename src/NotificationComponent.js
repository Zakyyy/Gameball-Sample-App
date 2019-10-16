import React, { Component } from 'react';
import InAppNotification from '../GbReactLibrary/src/inAppNotification';
import { connect } from 'react-redux'
import { Button, View } from 'react-native';


class NotificationComponent extends Component {
  state = {
    isModalVisible: this.props.show
  };

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  render() {
    return (
      <View style={{ flex: 1, paddingTop:50 }}>
        <Button 
        title="show modal"
        onPress={()=> this.setState({isModalVisible: !this.state.isModalVisible})}
        />
        <InAppNotification
          isVisible={this.state.isModalVisible}
          image={'https://s3.us-east-2.amazonaws.com/elasticbeanstalk-us-east-2-652131910202/uploads/default_icon.png'}
          notificationTitle='Congratulations'
          notificationText="Player salma achieved challenge Review !\n\nRank Points:  2570 \nWallet:  1604"
          onCloseFunction={this.toggleModal.bind(this)}
          full
        />
      </View>
    )
  }
}
const mapStateToProps = ({ notification }) => {
  return {
    show: notification.show,
    type: notification.type
  }
}
export default connect(mapStateToProps, null)(NotificationComponent);