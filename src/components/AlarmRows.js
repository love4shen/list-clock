// @flow

'use strict';

import React, { Component } from 'react';

import {
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PixelRatio,
} from 'react-native';

import AlarmRow from './AlarmRow.js';

class AlarmRows extends Component {
  render() {
    const rawData = ((props) => {

      const {essential, range, step, title, currentLower, currentUpper, max, min,} = props;

      let start = currentLower < min ?  min : currentLower;
      let end = currentUpper > max ?  max : currentUpper;

      const alarmStepDiffs: any = (new Array(Math.floor((end - start)*60/step) + 1)) // generate alarm numbers
      .fill(1) // be ready for map
      .map((ml, i) => i*step) // map to minites intervals
      .map((timeStep) => { // map to real time w/ hour and min
        return timeStep + 60*start;
      });

      return alarmStepDiffs;

    })(this.props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(rawData);

    return (
      <ListView
      dataSource={dataSource}
      renderRow={(alarmTime) => <AlarmRow alarmTime={alarmTime}/>}
      />
    );
  }
}

const styles = StyleSheet.create({
  rowView: {
    backgroundColor: '#fff',
    padding: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
});

export default AlarmRows;
