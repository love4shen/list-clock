// @flow

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  ScrollView,
  PixelRatio,
  PickerIOS,
} from 'react-native';

class SettingRowDetail extends Component {

  constructor(props: Object) {
    super(props);

    const {intervals, intervalKey, intervalUpdate} = props;

    const zone = (/[a-z]+/).exec(intervalKey)[0];

		this.state = {
			intervalKey: intervalKey,
			max: intervals[`${zone}Max`],
			min: intervals[`${zone}Min`],
			currentLower: intervals[`${zone}CurrentLower`],
			currentVal: intervals[intervalKey],
		};

		this.intervalUpdate = intervalUpdate;

		this.intervalUpdateHelp = this.intervalUpdateHelp.bind(this);
  }

  intervalUpdateHelp(key: string, val: any) {
		this.intervalUpdate(key, val);

		let updatedState = {currentVal: val};
		if (key.includes('Lower')) {
			updatedState['currentLower'] = val;
		}

		this.setState(updatedState);
  }

  render() {
		const lower = this.state.intervalKey.includes('Lower') ? this.state.min : this.state.currentLower;
		const upper = this.state.max;

      return (
        <ScrollView style={styles.wrapper}>
        <View style={styles.rowView}>
        <Text>Choose Value</Text>
        </View>
        <PickerIOS
        selectedValue={this.state.currentVal}
        key={this.intervalKey}
        onValueChange={val => this.intervalUpdateHelp(this.state.intervalKey, val)} >
        {
					this.state.intervalKey.includes('Step')? (new Array(60)).fill(1).map((ul, i) => (
          <PickerIOS.Item
          key={`${this.state.intervalKey}${i}`}
          value={i + 1}
          label={(i + 1).toString()}
          />
			)) : (new Array(upper - lower + 1)).fill(1).map((ul, i) => (
	        <PickerIOS.Item
	        key={`${this.state.intervalKey}Start${i + lower}`}
	        value={i + lower}
	        label={(i + lower).toString()}
	        />
			))
		}
        </PickerIOS>
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 50,
    backgroundColor: '#F0EFF5',
  },
  rowView: {
    backgroundColor: '#fff',
    padding: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
});

export default SettingRowDetail;
