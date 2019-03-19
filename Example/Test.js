import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import  BottomSheet  from 'reanimated-bottom-sheet';


export default class Example extends React.Component {
  renderInner = () => (
    <React.Fragment>
      {[...Array(60)].map((e, i) => (
        <View key={i} style={{ height: 40, backgroundColor: `#${i % 10}88424` }}>
          <Text>
            computed
          </Text>
        </View>
      ))}
    </React.Fragment>
  );

  renderHeader = () => (
    <View style={{
      height: 40,
      backgroundColor: 'red'
    }}>
      <Text>
        123
      </Text>
    </View>
  )

  bs = React.createRef()

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={this.bs}
          snapPoints = {[450, 300, '50%', 0]}
          renderContent = {this.renderInner}
          renderHeader = {this.renderHeader}

        />
        <Button
          onPress={() => this.bs.current.snapTo(0)}
          title="0"
        />
        <Button
          onPress={() => this.bs.current.snapTo(1)}
          title="1"
        />
        <Button
          onPress={() => this.bs.current.snapTo(2)}
          style={{
            zIndex: 0
          }}
          title="2"
        />
        <Button
          onPress={() => this.bs.current.snapTo(3)}
          title="3"
        />
      </View>
    )
  }
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
});
