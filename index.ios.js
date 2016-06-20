/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	TabBarIOS,
	AlertIOS,
	TouchableHighlight,
  NavigatorIOS,
} from 'react-native';
import AlarmRows from './src/components/AlarmRows.js';
import Setting from './src/components/Setting.js';

class ListClock extends Component {
	constructor() {
    super();

    this.intervalUpdate = this.intervalUpdate.bind(this);

    this.state = {
      selectedTab: 'settingTab',
      intervals: {
				morningCurrentLower: 7,
				morningCurrentUpper: 10,
				morningMax: 11,
				morningMin: 0,
        morningStep: 20,
				noonCurrentLower: 12,
				noonCurrentUpper: 14,
				noonMax: 15,
				noonMin: 11,
        noonStep: 30,
				eveningCurrentLower: 18,
				eveningCurrentUpper: 21,
				eveningMax: 24,
				eveningMin: 15,
        eveningStep: 30,
      }
    }
  }

	intervalUpdate(target: string, value: any) {
    let setting = {};
    setting[target] = value;

    const newIntervals = Object.assign({}, this.state.intervals, setting);

    if (this.morningNav) {
      this.morningNav.replace({
        title: 'Morning Clock',
        component: AlarmRows,
        passProps: {
					currentLower: newIntervals.morningCurrentLower,
					currentUpper: newIntervals.morningCurrentUpper,
					max: newIntervals.morningMax,
					min: newIntervals.morningMin,
					step: newIntervals.morningStep,
					title: 'Morning Clock',
				}
      });
    } else if (this.noonNav) {
      this.noonNav.replace({
        title: 'Evening Clock',
        component: AlarmRows,
        passProps: {
					currentLower: newIntervals.noonCurrentLower,
					currentUpper: newIntervals.noonCurrentUpper,
					max: newIntervals.noonMax,
					min: newIntervals.noonMin,
					step: newIntervals.noonStep,
					title: 'Noon Clock',
				}
      });
    } else if (this.eveningNav) {
      this.eveningNav.replace({
        title: 'Evening Clock',
        component: AlarmRows,
        passProps: {
					currentLower: newIntervals.eveningCurrentLower,
					currentUpper: newIntervals.eveningCurrentUpper,
					max: newIntervals.eveningMax,
					min: newIntervals.eveningMin,
					step: newIntervals.eveningStep,
					title: 'Evening Clock',
				}
      });
    }

    this.setState({intervals: newIntervals});
  }

	render() {
    const self = this;

    return (
      <TabBarIOS
      tintColor="#fff"
      barTintColor="#bbb" >
      <TabBarIOS.Item
      title="Morning"
      systemIcon="contacts"
      selected={this.state.selectedTab === 'morningTab'}
      onPress={() => {
        this.setState({
          selectedTab: 'morningTab',
        });
      }}>
      <NavigatorIOS
      ref={c => self.morningNav = c}
      style={styles.wrapper}
      initialRoute={{
        component: AlarmRows,
        title: 'Evening Clock',
        passProps: {
					essential: this.state.intervals.morningEssential,
					range: this.state.intervals.morningRange,
					currentLower: this.state.intervals.morningCurrentLower,
					currentUpper: this.state.intervals.morningCurrentUpper,
					max: this.state.intervals.morningMax,
					min: this.state.intervals.morningMin,
					step: this.state.intervals.morningStep,
					title: 'Morning Clock',
				}
      }}
      />
      </TabBarIOS.Item>
      <TabBarIOS.Item
      title="Noon"
      systemIcon="search"
      selected={this.state.selectedTab === 'noonTab'}
      onPress={() => {
        this.setState({
          selectedTab: 'noonTab',
        });
      }}>
      <NavigatorIOS
      ref={c => self.noonNav = c}
      style={styles.wrapper}
      initialRoute={{
        component: AlarmRows,
        title: 'Noon Clock',
        passProps: {
					essential: this.state.intervals.noonEssential,
					range: this.state.intervals.noonRange,
					currentLower: this.state.intervals.noonCurrentLower,
					currentUpper: this.state.intervals.noonCurrentUpper,
					max: this.state.intervals.noonMax,
					min: this.state.intervals.noonMin,
					step: this.state.intervals.noonStep,
					title: 'Noon Clock',
				}
      }}
      />
      </TabBarIOS.Item>
      <TabBarIOS.Item
      title="Evening"
      systemIcon="recents"
      selected={this.state.selectedTab === 'eveningTab'}
      onPress={() => {
        this.setState({
          selectedTab: 'eveningTab',
        });
      }}>
      <NavigatorIOS
      ref={c => self.eveningNav = c}
      style={styles.wrapper}
      initialRoute={{
        component: AlarmRows,
        title: 'Evening Clock',
        passProps: {
					essential: this.state.intervals.eveningEssential,
					range: this.state.intervals.eveningRange,
					currentLower: this.state.intervals.eveningCurrentLower,
					currentUpper: this.state.intervals.eveningCurrentUpper,
					max: this.state.intervals.eveningMax,
					min: this.state.intervals.eveningMin,
					step: this.state.intervals.eveningStep,
					title: 'Evening Clock',
				}
      }}
      />
      </TabBarIOS.Item>
      <TabBarIOS.Item
      title="Setting"
      systemIcon="more"
      selected={this.state.selectedTab === 'settingTab'}
      onPress={() => {
        this.setState({
          selectedTab: 'settingTab',
        });
      }}>
      <Setting intervalUpdate={this.intervalUpdate} intervals={this.state.intervals} />
      </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#333',
    margin: 50,
  },
});

AppRegistry.registerComponent('ListClock', () => ListClock);
