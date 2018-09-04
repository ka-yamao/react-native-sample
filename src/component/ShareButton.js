import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20
  },
  button: {
    flex: 1,
    backgroundColor: '#008080',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '500'
  }
});

export default class ShareButton extends Component {
  constructor(props) {
    super(props);
    this.ref = {};
  }

  share = () => {
    console.log('share');
    this.props.share('test');
  };
  render() {
    const { onPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.share}>
          <Text style={styles.buttonText}>シェア</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
