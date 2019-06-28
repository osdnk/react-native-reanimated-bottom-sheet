import React from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'
import { BlurView } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import BottomSheet from 'reanimated-bottom-sheet'

const headerHeight = 70
const contentHeight = Dimensions.get('window').height - 100
const songCoverSizes = [50, 200]

const AppleMusic = () => {
  const renderContent = () => {
    /**
     * @TODO Implement this.
     */
    return <View style={styles.contentContainer} />
  }

  const renderHeader = () => {
    return (
      <BlurView intensity={100} tint={'default'} style={styles.headerContainer}>
        <Image
          style={styles.coverImage}
          source={require('../../assets/avicii-tim.jpg')}
        />
        <Text style={styles.songTitleSmall}>{`Ain't A Thing`}</Text>
        <TouchableOpacity style={styles.headerActionButton}>
          <Ionicons name="ios-play" size={32} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerActionButton}>
          <Ionicons name="ios-fastforward" size={32} />
        </TouchableOpacity>
      </BlurView>
    )
  }
  return (
    <View style={styles.container}>
      <BottomSheet
        initialSnap={0}
        snapPoints={[headerHeight, contentHeight]}
        renderHeader={renderHeader}
        renderContent={renderContent}
      />
      <Image style={styles.map} source={require('../../assets/map-bg.jpg')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  map: {
    height: '100%',
    width: '100%',
  },

  // Content
  contentContainer: {
    backgroundColor: '#444',
    height: contentHeight,
  },

  // Header
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: headerHeight,

    paddingVertical: 10,
    paddingRight: 20,
    paddingLeft: 20 + songCoverSizes[0] + 20,
  } as ViewStyle,

  headerActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    minWidth: 50,
  } as ViewStyle,

  songTitleSmall: {
    flexGrow: 1,
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
  },

  coverImage: {
    position: 'absolute',
    top: 10,
    left: 20,

    width: songCoverSizes[0],
    height: songCoverSizes[0],

    borderRadius: 4,
  },
})

export default AppleMusic
