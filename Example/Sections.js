import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  BottomSheet  from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

const Lorem = () => (
  <View style={{ height: 500, backgroundColor: 'green' }}>
    <Text>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui
      blanditiis praesentium voluptatum deleniti atque corrupti quos
      dolores et quas molestias excepturi sint occaecati cupiditate non
      provident, similique sunt in culpa qui officia deserunt mollitia
      animi, id est laborum et dolorum fuga. Et harum quidem rerum
      facilis est et expedita distinctio. Nam libero tempore, cum soluta
      nobis est eligendi optio cumque nihil impedit quo minus id quod
      maxime placeat facere possimus, omnis voluptas assumenda est,
      omnis dolor repellendus. Temporibus autem quibusdam et aut
      officiis debitis aut rerum necessitatibus saepe eveniet ut et
      voluptates repudiandae sint et molestiae non recusandae. Itaque
      earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
      voluptatibus maiores alias consequatur aut perferendis doloribus
      asperiores repellat. At vero eos et accusamus et iusto odio
      dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
      atque corrupti quos dolores et quas molestias excepturi sint
      occaecati cupiditate non provident, similique sunt in culpa qui
      officia deserunt mollitia animi, id est laborum et dolorum fuga.
      Et harum quidem rerum facilis est et expedita distinctio. Nam
      libero tempore, cum soluta nobis est eligendi optio cumque nihil
      impedit quo minus id quod maxime placeat facere possimus, omnis
      voluptas assumenda est, omnis dolor repellendus. Temporibus autem
      quibusdam et aut officiis debitis aut rerum necessitatibus saepe
      eveniet ut et voluptates repudiandae sint et molestiae non
      recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut
      aut reiciendis voluptatibus maiores alias consequatur aut
      perferendis doloribus asperiores repellat.
    </Text>
  </View>
)
export default class Example extends React.Component {
  trans = new Animated.Value(0)
  renderHeader = name => (
    <View
      style={{
        width: '100%',
        backgroundColor: 'blue',
        height: 40,
        borderWidth: 2,
      }}>
      <Text>{name}</Text>
    </View>
  )

  renderInner = () => (
    <View>
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 500, 510],
                outputRange: [0, 500, 500],
              }),
            },
          ],
        }}>
        {this.renderHeader('one')}
      </Animated.View>
      <Lorem/>

      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 540, 1040, 1050],
                outputRange: [0, 0, 500, 500],
              }),
            },
          ],
        }}>
        {this.renderHeader('XXX')}
      </Animated.View>
      <Lorem/>
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 1080, 1580, 1590],
                outputRange: [0, 0, 500, 500],
              }),
            },
          ],
        }}>
        {this.renderHeader('two')}
      </Animated.View>
      <Lorem/>
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 1620, 2120, 2130],
                outputRange: [0, 0, 500, 500],
              }),
            },
          ],
        }}>
        {this.renderHeader('three')}
      </Animated.View>
      <Lorem/>
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 2160, 2660, 2670],
                outputRange: [0, 0, 500, 500],
              }),
            },
          ],
        }}>
        {this.renderHeader('mmm')}
      </Animated.View>
      <Lorem/>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          contentPosition={this.trans}
          snapPoints = {[100, 400]}
          renderContent = {this.renderInner}
        />
      </View>
    )
  }
}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
})
