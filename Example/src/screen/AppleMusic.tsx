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
import Animated from 'react-native-reanimated'
import { ImageStyle } from 'react-native'

const AnimatedView = Animated.View
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const headerHeight = 70
const contentHeight = Dimensions.get('window').height - 100

const songCoverSizes = [50, Dimensions.get('window').width - 60]
const songCoverTopPositions = [
  10,
  Dimensions.get('window').width / 2 - songCoverSizes[1] / 2,
]
const songCoverLeftPositions = [
  20,
  Dimensions.get('window').width / 2 - songCoverSizes[1] / 2,
]

const AppleMusic = () => {
  let fall = new Animated.Value(1)

  const renderContent = () => {
    const animatedContentOpacity = Animated.interpolate(fall, {
      inputRange: [0.85, 1],
      outputRange: [1, 0],
      extrapolate: Animated.Extrapolate.CLAMP,
    })
    /**
     * @TODO Implement this.
     */
    return (
      <AnimatedView
        style={[styles.contentContainer, { opacity: animatedContentOpacity }]}
      >
        {renderHandler()}
      </AnimatedView>
    )
  }

  const renderSongCover = () => {
    const animatedSongCoverSize = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: songCoverSizes.slice().reverse(),
      extrapolate: Animated.Extrapolate.CLAMP,
    })

    const animatedSongCoverTopPosition = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: songCoverTopPositions.slice().reverse(),
      extrapolate: Animated.Extrapolate.CLAMP,
    })

    const animatedSongCoverLeftPosition = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: songCoverLeftPositions.slice().reverse(),
      extrapolate: Animated.Extrapolate.CLAMP,
    })

    return (
      <AnimatedView
        key={'song-cover-container'}
        style={[
          styles.songCoverContainer,
          {
            height: animatedSongCoverSize,
            width: animatedSongCoverSize,
            left: animatedSongCoverLeftPosition,
            top: animatedSongCoverTopPosition,
          },
        ]}
      >
        <Image
          key={'song-cover'}
          style={styles.songCoverImage}
          source={require('../../assets/avicii-tim.jpg')}
        />
      </AnimatedView>
    )
  }

  const renderHeader = () => {
    const animatedHeaderOpacity = Animated.interpolate(fall, {
      inputRange: [0.75, 1],
      outputRange: [0, 1],
      extrapolate: Animated.Extrapolate.CLAMP,
    })

    return [
      <AnimatedBlurView
        key={'header-container'}
        intensity={100}
        tint={'default'}
        style={[
          styles.headerContainer,
          {
            opacity: animatedHeaderOpacity,
          },
        ]}
      >
        <Text style={styles.songTitleSmall}>{`Ain't A Thing`}</Text>
        <TouchableOpacity style={styles.headerActionButton}>
          <Ionicons name="ios-play" size={32} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerActionButton}>
          <Ionicons name="ios-fastforward" size={32} />
        </TouchableOpacity>
      </AnimatedBlurView>,
      renderSongCover(),
    ]
  }

  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    })

    return (
      <AnimatedView
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    )
  }

  const renderHandler = () => {
    const animatedBar1Rotation = (outputRange: number[]) =>
      Animated.interpolate(fall, {
        inputRange: [0, 1],
        outputRange: outputRange,
        extrapolate: Animated.Extrapolate.CLAMP,
      })

    return (
      <View style={styles.handlerContainer}>
        <AnimatedView
          style={[
            styles.handlerBar,
            {
              left: -7.5,
              transform: [
                {
                  rotate: Animated.concat(
                    // @ts-ignore
                    animatedBar1Rotation([0.3, 0]),
                    'rad'
                  ),
                },
              ],
            },
          ]}
        />
        <AnimatedView
          style={[
            styles.handlerBar,
            {
              right: -7.5,
              transform: [
                {
                  rotate: Animated.concat(
                    // @ts-ignore
                    animatedBar1Rotation([-0.3, 0]),
                    'rad'
                  ),
                },
              ],
            },
          ]}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BottomSheet
        initialSnap={0}
        callbackNode={fall}
        snapPoints={[headerHeight, contentHeight]}
        renderHeader={renderHeader}
        renderContent={renderContent}
      />
      <Image style={styles.map} source={require('../../assets/map-bg.jpg')} />
      {renderShadow()}
      <Animated.Code>
        {() => Animated.block([Animated.debug('callbackNode', fall)])}
      </Animated.Code>
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

  // Shadow
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },

  // Content
  contentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: contentHeight,
    overflow: 'visible',
    marginTop: -headerHeight,
  } as ViewStyle,

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

  // Handler
  handlerContainer: {
    alignSelf: 'center',
    marginTop: 10,
    height: 20,
    width: 20,
  } as ViewStyle,

  handlerBar: {
    position: 'absolute',
    backgroundColor: '#D1D1D6',
    top: 5,
    borderRadius: 3,
    height: 5,
    width: 20,
  },

  // Song
  songTitleSmall: {
    flexGrow: 1,
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
  },

  songCoverContainer: {
    position: 'absolute',
    top: 10,
    left: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15.0,
  },

  songCoverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  } as ImageStyle,
})

export default AppleMusic
