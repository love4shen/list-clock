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

		console.log('dodod', props.intervals.morningCurrentLower)
		
	}

	intervalUpdateHelper(obj, val) {
		this.setState({});
		return (obj, val) => this.intervalUpdate(obj, val);
	}



  render() {
		const self = this;

		console.log('eeee')

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
