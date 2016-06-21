// @flow

'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  NavigatorIOS,
} from 'react-native';

import SettingRows from './SettingRows.js';

class Setting extends Component {
  constructor(props) {
    super(props);

    this.intervalUpdate = props.intervalUpdate;

    this.intervalUpdateHelper = this.intervalUpdateHelper.bind(this);

    this.updateNext = null;

  }

  intervalUpdateHelper(obj, val, updateNext) {
    //this.setState({});
    this.updateNext = updateNext;
    this.intervalUpdate(obj, val);
  }

  componentWillUpdate(nextProps, nextState) {
    this.settingNav.replace({
      component: SettingRows,
      title: 'Setting',
      passProps: nextProps,
    })
  }



  render() {
    const self = this;

    return (
      <NavigatorIOS
        ref={c => self.settingNav = c}
        style={styles.wrapper}
        initialRoute={{
          component: SettingRows,
          title: 'Setting',
          passProps: Object.assign({}, this.props, {intervalUpdate: this.intervalUpdateHelper})
        }}
        />
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default Setting;
