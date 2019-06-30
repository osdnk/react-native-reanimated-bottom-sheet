import React from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { BlurView } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import { ImageStyle } from 'react-native'

const AnimatedView = Animated.View
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const songCoverSizes = [50, Dimensions.get('window').width - 60]
const songCoverTopPositions = [
  10,
  Dimensions.get('window').width / 2 - songCoverSizes[1] / 2,
]
const songCoverLeftPositions = [
  20,
  Dimensions.get('window').width / 2 - songCoverSizes[1] / 2,
]
const snapPoints = [
  70,
  songCoverSizes[1] + songCoverTopPositions[1] + 15 + 24 + 10 + 30 + 28,
]

const song = {
  id: '0',
  name: `Ain't A Thing`,
  album: 'TIM',
  artist: 'Avicii',
  length: '3:04',
}

const songs = [...Array(40)].map((_, index) => ({
  id: `${index}`,
  name: 'Song Name',
  artist: 'Artist Name',
  cover: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
}))

const AppleMusic = () => {
  let fall = new Animated.Value(1)

  const animatedSongCoverTopPosition = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: songCoverTopPositions.slice().reverse(),
    extrapolate: Animated.Extrapolate.CLAMP,
  })

  const animatedSongCoverSize = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [songCoverSizes[0], songCoverSizes[1]].slice().reverse(),
    extrapolate: Animated.Extrapolate.CLAMP,
  })

  const renderContent = () => {
    const animatedBackgroundOpacity = Animated.interpolate(fall, {
      inputRange: [0.85, 1],
      outputRange: [1, 0],
      extrapolate: Animated.Extrapolate.CLAMP,
    })

    const animatedContentOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Animated.Extrapolate.CLAMP,
    })

    return (
      <AnimatedView style={[styles.contentContainer]}>
        <AnimatedView
          style={[
            styles.contentBackground,
            { opacity: animatedBackgroundOpacity },
          ]}
        />

        <AnimatedView style={{ opacity: animatedContentOpacity }}>
          {renderHandler()}

          <AnimatedView
            style={{
              height: Animated.add(
                animatedSongCoverSize,
                animatedSongCoverTopPosition
              ),
            }}
          />

          <View style={styles.seekBarContainer}>
            <View style={styles.seekBarTrack} />
            <View style={styles.seekBarThumb} />
            <View style={styles.seekBarTimingContainer}>
              <Text style={styles.seekBarTimingText}>0:00</Text>
              <Text style={styles.seekBarTimingText}>{`-${song.length}`}</Text>
            </View>
          </View>

          <Text style={styles.songTitleLarge}>{song.name}</Text>
          <Text style={styles.songInfoText}>{`${song.artist} ⏤ ${
            song.album
          }`}</Text>
        </AnimatedView>
      </AnimatedView>
    )
  }

  const renderSongCover = () => {
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
        <View style={styles.headerTopBorder} />
        <Text style={styles.songTitleSmall}>{song.name}</Text>
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
        pointerEvents="none"
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

  const renderSongItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.songListItemContainer}>
        <View
          style={[
            {
              backgroundColor: `${item.cover}`,
            },
            styles.songListItemCover,
          ]}
        />
        <View style={styles.songListItemInfoContainer}>
          <Text>{item.name}</Text>
          <Text style={styles.songListItemSecondaryText}>{item.artist}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BottomSheet
        initialSnap={0}
        callbackNode={fall}
        snapPoints={snapPoints}
        renderHeader={renderHeader}
        renderContent={renderContent}
      />
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item, index) => `${item.id}${index}`}
      />
      {renderShadow()}
    </View>
  )
}

const styles = StyleSheet.create({
  // Screen
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Shadow
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },

  // Content
  contentContainer: {
    alignItems: 'center',
    height: snapPoints[1],
    overflow: 'visible',
    marginTop: -snapPoints[0],
  },

  contentBackground: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
  },

  // Header
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: snapPoints[0],
    paddingVertical: 10,
    paddingRight: 20,
    paddingLeft: 20 + songCoverSizes[0] + 20,
  },

  headerTopBorder: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    opacity: 0.5,
    height: 0.25,
    backgroundColor: '#9B9B9B',
  },

  headerActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    minWidth: 50,
  },

  // Handler
  handlerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 10,
    height: 20,
    width: 20,
  },

  handlerBar: {
    position: 'absolute',
    backgroundColor: '#D1D1D6',
    top: 5,
    borderRadius: 3,
    height: 5,
    width: 20,
  },

  // Song
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

  songTitleLarge: {
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 30,
  },

  songTitleSmall: {
    flexGrow: 1,
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
  },

  songInfoText: {
    textAlign: 'center',
    color: '#FE2D55',
    fontSize: 24,
    lineHeight: 28,
  },

  songCoverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#333',
  } as ImageStyle,

  // Seek Bar
  seekBarContainer: {
    height: 24,
    marginTop: 15,
    width: songCoverSizes[1],
  },

  seekBarThumb: {
    position: 'absolute',
    backgroundColor: '#8E8E93',
    top: -2,
    borderRadius: 6,
    width: 6,
    height: 6,
  },

  seekBarTrack: {
    backgroundColor: '#DDDEDD',
    height: 2,
    borderRadius: 4,
  },

  seekBarTimingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  seekBarTimingText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 13,
    fontWeight: '500',
    color: '#8E8E93',
  },

  // Song List Item
  songListItemContainer: {
    flexDirection: 'row',
  },

  songListItemCover: {
    marginLeft: 20,
    marginRight: 15,
    marginVertical: 5,
    width: songCoverSizes[0],
    height: songCoverSizes[0],
    borderRadius: 4,
  },

  songListItemInfoContainer: {
    flexGrow: 1,
    borderBottomColor: '#CAC9CE',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },

  songListItemSecondaryText: {
    fontSize: 12,
    color: '#8E8D92',
  },
})

export default AppleMusic
