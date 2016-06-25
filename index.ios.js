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
  Navigator,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

import AlarmRows from './src/components/AlarmRows.js';

import SettingRows from './src/components/SettingRows.js';
import SettingRowDetail from './src/components/SettingRowDetail.js';

import Icon from 'react-native-vector-icons/FontAwesome';


class ListClock extends Component {
  constructor() {
    super();

    this.NavigationBarRouteMapper = {
      Title: (route, navigator, index, navState) => {
        return (
          <Text style={[styles.navBarText, styles.navBarTitleText]}>
            {route.title}
          </Text>
        );
      },
      LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
          return null;
        }

        const previousRoute = navState.routeStack[index - 1];
        return (
          <TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              {previousRoute.title}
            </Text>
          </TouchableOpacity>
        );
      },

      RightButton: function(route, navigator, index, navState) {
        return null;
      },
    }

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
        eveningCurrentLower: 17,
        eveningCurrentUpper: 21,
        eveningMax: 24,
        eveningMin: 15,
        eveningStep: 20,
      }
    }

    this.intervalUpdate = this.intervalUpdate.bind(this);
  }

  intervalUpdate(target: string, value: any) {
    const {intervals} = this.state;

    let setting = {};
    setting[target] = value;

    if (target.includes('Lower')) {
      const currUpperKey = target.replace('Lower', 'Upper');
      if (intervals[currUpperKey] < value) {
        setting[currUpperKey] = value;
      }
    }

    const newIntervals = Object.assign({}, intervals, setting);

    this.navRef.replacePrevious({
      title: 'Setting',
      index: 0,
      intervals: newIntervals,
      intervalUpdate: this.intervalUpdate,
    });

    this.setState({intervals: newIntervals});
  }

  render() {
    const self = this;

    return (
      <TabBarIOS
        barTintColor="#f5f5f5"
        >
        <Icon.TabBarItemIOS
          title="Morning"
          iconName="battery-full"
          selected={this.state.selectedTab === 'morningTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'morningTab',
            });
          }}>
          <AlarmRows
            currentLower={this.state.intervals.morningCurrentLower}
            currentUpper={this.state.intervals.morningCurrentUpper}
            max={this.state.intervals.morningMax}
            min={this.state.intervals.morningMin}
            step={this.state.intervals.morningStep}
            />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Noon"
          iconName="sun-o"
          selected={this.state.selectedTab === 'noonTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'noonTab',
            });
          }}>
          <AlarmRows
            currentLower={this.state.intervals.noonCurrentLower}
            currentUpper={this.state.intervals.noonCurrentUpper}
            max={this.state.intervals.noonMax}
            min={this.state.intervals.noonMin}
            step={this.state.intervals.noonStep}
            />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Evening"
          iconName="moon-o"
          selected={this.state.selectedTab === 'eveningTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'eveningTab',
            });
          }}>
          <AlarmRows
            currentLower={this.state.intervals.eveningCurrentLower}
            currentUpper={this.state.intervals.eveningCurrentUpper}
            max={this.state.intervals.eveningMax}
            min={this.state.intervals.eveningMin}
            step={this.state.intervals.eveningStep}
            />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Setting"
          iconName="gear"
          selected={this.state.selectedTab === 'settingTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'settingTab',
            });
          }}>
          <Navigator
            ref={(nav) => this.navRef = nav}
            initialRoute={{
              title: 'Setting',
              index: 0,
              intervals: this.state.intervals,
              intervalUpdate: this.intervalUpdate,
            }}
            renderScene={(route, nav) => {
              switch (route.index) {
                case 0:
                return (
                  <SettingRows
                    style={styles.scene}
                    intervals={this.state.intervals}
                    intervalUpdate={route.intervalUpdate}
                    nav={nav}
                    index={route.index}
                    />
                )
                case 1:
                return (
                  <SettingRowDetail
                    style={styles.scene}
                    intervals={this.state.intervals}
                    intervalUpdate={route.intervalUpdate}
                    nav={nav}
                    intervalKey={route.intervalKey}
                    index={route.index}
                    />
                )
                default:
                return (<View />)
              }
            }

            }
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={this.NavigationBarRouteMapper}
                style={styles.navBar}
                />
            }
            />
        </Icon.TabBarItemIOS>
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
  navBar: {
    backgroundColor: '#fff',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373e4d',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
});

AppRegistry.registerComponent('ListClock', () => ListClock);
