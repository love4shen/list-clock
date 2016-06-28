// @flow

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableHighlight,
  PixelRatio,
  Switch,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';

const moment = require('moment');

const AlarmRow = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      trueSwitchIsOn: false,
    };
  },

  alarmTimeOut: null,

  toggleAlarm: function(status: boolean, alarmTime: Object) {
    if (!!status) {
      this.clearTimeout(this.alarmTimeOut);

      return;
    }

    const _self = this;

    const {alarmHour, alarmMinute} = alarmTime;

    const now = moment();

    let alarm = moment();
    alarm.hour(alarmHour);
    alarm.minute(alarmMinute);
    alarm.seconds(0);
    alarm.milliseconds(0);

    let difference = alarm.diff(now);

    if (difference < 0) {
      difference = 24*3600*1000 + difference;
    }

    this.alarmTimeOut = this.setTimeout(
      () => {
        AlertIOS.alert(
          'Alarm >_<',
          undefined,
          () => {
          }
        );

        _self.setState({trueSwitchIsOn: false});
      },
      difference
    );
  },

  render: function() {
    const {alarmTime} = this.props;

    let hour = Math.floor(alarmTime/60);
    let minute = alarmTime%60;
    if (hour < 10) { hour = `0${hour}`}
    if (minute < 10) { minute = `0${minute}`}

    return (
      <View style={styles.rowView}>
      <Text style={styles.rowText}>{`${hour}:${minute}`}</Text>
      <Switch
      style={styles.rowSwitch}
      onValueChange={(value) => {
        this.toggleAlarm(this.state.trueSwitchIsOn, {alarmHour: hour, alarmMinute: minute});
        this.setState({trueSwitchIsOn: value});
      }}
      value={this.state.trueSwitchIsOn} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  rowView: {
    backgroundColor: '#fff',
    padding: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    fontSize: 24,
    fontWeight: '200',
  },
  rowSwitch: {
    flex: 0,
  }
});

export default AlarmRow;
