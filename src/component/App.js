/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Share
} from 'react-native';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import ShareButton from './ShareButton';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../configureStore';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  delete = index => () => {
    console.log('delete');
    const list = [].concat(this.state.list);
    list.splice(index, 1);
    this.setState({
      list
    });
  };
  done = index => () => {
    console.log('done');
    const list = [].concat(this.state.list);
    list[index].done = !list[index].done;
    this.setState({
      list
    });
  };
  onPress = text => {
    console.log(text);
    const list = [].concat(this.state.list);
    list.push({
      key: Date.now(),
      text: text,
      done: false
    });

    this.setState({ list });
  };
  share = text => {
    var content = {};
    var options = {};
    if (Platform.OS === 'ios') {
      content.title = 'ios title';
      content.message = 'ios message ' + text;
    } else {
      content.title = 'android title';
      content.message = 'android message ' + text;
      options.dialogTitle = 'Daialog Title';
    }

    Share.share(content, options)
      .then(result => {
        console.log('share done');
        console.log(result);
      })
      .catch(errorMsg => {
        console.log('share error');
        console.log(errorMsg);
      });
  };
  render() {
    const { list } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <ShareButton share={this.share} />
          <TodoInput onPress={this.onPress} />
          <View style={styles.todoListContainer}>
            <FlatList
              style={styles.todoList}
              data={list}
              renderItem={({ item, index }) => (
                <TodoItem
                  onDone={this.done(index)}
                  onDelete={this.delete(index)}
                  {...item}
                />
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 40,
    alignItems: 'center'
  },
  main: {
    flex: 1,
    maxWidth: 400,
    alignItems: 'center'
  },
  todoListContainer: {
    flexDirection: 'row',
    flex: 1
  },
  todoList: {
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#008080',
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    color: 'white'
  }
});
