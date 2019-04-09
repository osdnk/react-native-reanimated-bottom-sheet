import React from 'react'
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Map from './Map'
import BlurToolbar from './BlurToolbar'
import Imperative from './Imperative'
import Test from './Test'
import Sections from './Sections'
import Collapsable from './Collapsable'

const SCREENS = {
  map: {
    screen: Map,
    title: 'Apple Map',
  },
  toolbar: {
    screen: BlurToolbar,
    title: 'Blur Toolbar',
  },
  imperative: {
    screen: Imperative,
    title: 'Imperative managed view',
  },
  test: {
    screen: Test,
    title: 'Test',
  },
  sectionList: {
    screen: Sections,
    title: 'SectionList',
  },
  collapsable: {
    screen: Collapsable,
    title: 'Collapsable Header',
  },
}

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Bottom Sheet Examples',
  }
  render() {
    const data = Object.keys(SCREENS).map(key => ({ key }))
    return (
      <FlatList
        style={styles.list}
        data={data}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={props => (
          <MainScreenItem
            {...props}
            onPressItem={({ key }) => this.props.navigation.navigate(key)}
          />
        )}
      />
    )
  }
}

const ItemSeparator = () => <View style={styles.separator} />

class MainScreenItem extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.item)
  render() {
    const { key } = this.props.item
    return (
      <TouchableOpacity style={styles.button} onPress={this._onPress}>
        <Text style={styles.buttonText}>{SCREENS[key].title || key}</Text>
      </TouchableOpacity>
    )
  }
}

const ExampleApp = createAppContainer(
  createStackNavigator(
    {
      Main: { screen: MainScreen },
      ...SCREENS,
    },
    {
      initialRouteName: 'Main',
    }
  )
)

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})

export default ExampleApp
