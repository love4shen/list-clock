// @flow

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PixelRatio,
  PickerIOS,
} from 'react-native';

import SettingRowDetail from './SettingRowDetail.js';

import TableView from 'react-native-tableview';

class SettingRows extends Component {
  constructor(props) {
    super(props);

    this.intervals = props.intervals;
  }

  render() {

    return (
      <TableView style={styles.wrapper}
        allowsToggle={true}
        allowsMultipleSelection={true}
        tableViewStyle={TableView.Consts.Style.Plain}
        tableViewCellStyle={TableView.Consts.CellStyle.Value1}
        onPress={(evt) => this._rowOnPress(evt, this.props)}>
        <TableView.Section label="Alarm Range and Step" arrow={true}>
          {this.populateIntervalSettingItem(this.intervals)}
        </TableView.Section>
        <TableView.Section label="Credits & Extra">
          <TableView.Item detail="Yizheng Shen">Author</TableView.Item>
          <TableView.Item detail="0.0.1">Version</TableView.Item>
        </TableView.Section>
      </TableView>
    );
  }

  _rowOnPress(evt: Object, props: Object) {
    if (evt.value === undefined) {
      return;
    }

    const {nav, index} = props;

    nav.push(Object.assign({}, props, {
      index: index + 1,
      title: evt.label,
      intervalKey: evt.value,
    }));
  }

  populateIntervalSettingItem(intervals: Object): Array<Object> {

    return Object.keys(intervals)
    .filter((key) => !key.endsWith('Max') && !key.endsWith('Min'))
    .map((key) => {
      const value = intervals[key];

      const detail = (typeof value) === 'number' ? value.toString() : `${value[0]}:00 - ${value[1]}:00`;

      const label = /([a-z]+)([A-Z][a-z]+)([A-Z][a-z]+)?/
      .exec(key)
      .slice(1, 4)
      .map(part => part === undefined ? '' : part[0].toUpperCase() + part.slice(1))
      .join(' ');

      return (
        <TableView.Item value={key} detail={detail} key={key}>{label}</TableView.Item>
      );
    })
  }
}



const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 64,
    backgroundColor: '#F0EFF5',
  },
  rowView: {
    backgroundColor: '#fff',
    padding: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
});

export default SettingRows;
