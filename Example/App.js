import React from 'react'
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import AppleMusic from './src/screen/AppleMusic'
import Map from './Map'
import BlurToolbar from './BlurToolbar'
import Imperative from './Imperative'
import Test from './Test'
import Sections from './Sections'
import Collapsable from './Collapsable'

const SCREENS = {
  appleMusic: {
    screen: AppleMusic,
    title: 'Apple Music',
  },
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
      <SafeAreaView>
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
      </SafeAreaView>
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

const ExampleAppStack = createStackNavigator()

const ExampleStackScreen = () => {
  return (
    <ExampleAppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Main'}
    >
      <ExampleAppStack.Screen name={'Main'} component={MainScreen} />
      {Object.keys(SCREENS).map((screenName, idx) => (
        <ExampleAppStack.Screen
          key={idx}
          name={screenName}
          component={SCREENS[screenName].screen}
        />
      ))}
    </ExampleAppStack.Navigator>
  )
}

const App = () => (
  <NavigationContainer>
    <ExampleStackScreen />
  </NavigationContainer>
)

export default App

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
