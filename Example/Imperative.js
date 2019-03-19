import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'



export default class Example extends React.Component {
  renderInner = () => (
    <View style={styles.panel}>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Sample</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Buttons</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Which</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Could</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Be</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Clicked</Text>
      </TouchableOpacity>
    </View>
  );

  bs = React.createRef()


  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={this.bs}
          snapPoints = {[500, 200, 100, 0]}
          renderContent = {this.renderInner}
          initialSnap = {1}
          enabledGestureInteraction={false}
        />
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={styles.commandButton} onPress={() => this.bs.current.snapTo(0)}>
            <Text style={styles.panelButtonTitle}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commandButton} onPress={() => this.bs.current.snapTo(1)}>
            <Text style={styles.panelButtonTitle}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commandButton} onPress={() => this.bs.current.snapTo(2)}>
            <Text style={styles.panelButtonTitle}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commandButton} onPress={() => this.bs.current.snapTo(3)}>
            <Text style={styles.panelButtonTitle}>4</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f6f76',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  commandButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    margin: 7,
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: '#2c2c2fAA',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    width: '100%',
    height: 50,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
})

