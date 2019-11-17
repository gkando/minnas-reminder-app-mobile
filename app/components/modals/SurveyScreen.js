import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

class SurveyScreen extends React.Component {
  state = { showConfirmation: false };

  handleSubmit = value => {
    this.setState({ showConfirmation: true, value: value });
  };

  // Handler for when the user confirms their choice in the modal
  handleConfirm = () => {
    return
  };

  // Handler for when the user cancels the confirmation dialog
  handleCancel = () => {
    this.setState({ showConfirmation: false });
  };

  render() {
    const { showConfirmation } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.overlayText}>MODAL</Text>
	{showConfirmation && <Dialog onCancel={this.handleCancel} onConfirm={this.handleConfirm} />}
      </View>
    );
  }
}

export default SurveyScreen;