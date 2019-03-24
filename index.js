import React, { Component } from 'react'
import { Dimensions, Platform, View } from 'react-native'
import Animated from 'react-native-reanimated'
import {
  PanGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'
const { height: screenHeight } = Dimensions.get('window')

const P = (android, ios) => Platform.OS === 'ios' ? ios : android

const magic = {
  damping: 50,
  mass: 0.3,
  stiffness: 121.6,
  overshootClamping: true,
  restSpeedThreshold: .3,
  restDisplacementThreshold: .3,
  deceleration: 0.999,
  bouncyFactor: 1,
  velocityFactor: P(1, 1.2),
  tossForMaster: 0.4,
  coefForTranslatingVelocities: 5
}


const {
  damping,
  mass,
  stiffness,
  overshootClamping,
  restSpeedThreshold,
  restDisplacementThreshold,
  deceleration,
  velocityFactor,
  tossForMaster
} = magic


const { set, cond, onChange, block, eq, greaterOrEq, sqrt, not, defined, max, add, and, Value, spring, or, divide, greaterThan, sub, event, diff, multiply, clockRunning, startClock, stopClock, decay, Clock, lessThan } = Animated


function runDecay(clock, value, velocity, wasStartedFromBegin) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }

  const config = { deceleration }

  return [
    cond(clockRunning(clock), 0, [
      cond(wasStartedFromBegin, 0, [
        set(wasStartedFromBegin, 1),
        set(state.finished, 0),
        set(state.velocity, multiply(velocity, velocityFactor)),
        set(state.position, value),
        set(state.time, 0),
        startClock(clock),
      ]),
    ]),
    cond(clockRunning(clock), decay(clock, state, config)),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]
}

function withPreservingAdditiveOffset(drag, state) {
  const prev = new Value(0)
  const valWithPreservedOffset = new Value(0)
  return block([
    cond(eq(state, State.BEGAN), [
      set(prev, 0)
    ], [
      set(valWithPreservedOffset, add(valWithPreservedOffset, sub(drag, prev))),
      set(prev, drag),
    ]),
    valWithPreservedOffset
  ])
}

function withDecaying(drag, state, decayClock, velocity, prevent) {
  const valDecayed = new Value(0)
  const offset = new Value(0)
  // since there might be moar than one clock
  const wasStartedFromBegin = new Value(0)
  return block([
    cond(eq(state, State.END),
      [
        cond(prevent,
          stopClock(decayClock),
          set(valDecayed, runDecay(decayClock, add(drag, offset), velocity, wasStartedFromBegin))
        )
      ],
      [
        stopClock(decayClock),
        cond(eq(state, State.BEGAN, set(prevent, 0))),
        cond(eq(state, State.BEGAN), [
          set(wasStartedFromBegin, 0),
          set(offset, add(sub(valDecayed, drag)))
        ]),
        set(valDecayed, add(drag, offset))
      ],
    ),
    valDecayed,
  ])
}

export default class BottomSheetBehavior extends Component {
  static defaultProps = {
    overdragResistanceFactor: 0,
    initialSnap: 0,
    enabledImperativeSnapping: true,
    enabledGestureInteraction: true,
    enabledInnerScrolling: true,
    springConfig: {},
  };

  decayClock = new Clock();
  panState = new Value(0);
  tapState = new Value(0);
  velocity = new Value(0);
  panMasterState = new Value(State.END);
  masterVelocity = new Value(0);
  isManuallySetValue = new Value(0);
  manuallySetValue = new Value(0);
  masterClockForOverscroll = new Clock();
  preventDecaying = new Value(0);
  dragMasterY = new Value(0);
  dragY = new Value(0);

  constructor(props) {
    super(props)
    this.state = BottomSheetBehavior.getDerivedStateFromProps(props)
    const { snapPoints, init } = this.state
    const middlesOfSnapPoints = []
    for (let i = 1; i < snapPoints.length; i++) {
      middlesOfSnapPoints.push(divide(add(snapPoints[i - 1], snapPoints[i]), 2))
    }
    const masterOffseted =
      new Value(init)
    // destination point is a approximation of movement if finger released
    const destinationPoint = add(masterOffseted, multiply(tossForMaster, this.masterVelocity))
    // method for generating condition for finding the nearest snap point
    const currentSnapPoint = (i = 0) => i + 1 === snapPoints.length ?
      snapPoints[i] :
      cond(
        lessThan(destinationPoint, middlesOfSnapPoints[i]),
        snapPoints[i],
        currentSnapPoint(i + 1)
      )
    // current snap point desired
    this.snapPoint = currentSnapPoint()

    const masterClock = new Clock()
    const prevMasterDrag = new Value(0)
    const wasRun = new Value(0)
    this.translateMaster = block([
      cond(eq(this.panMasterState, State.END),
        [
          set(prevMasterDrag, 0),
          cond(or(clockRunning(masterClock), not(wasRun), this.isManuallySetValue),
            [
              cond(this.isManuallySetValue, stopClock(masterClock)),
              set(masterOffseted,
                this.runSpring(masterClock, masterOffseted, this.masterVelocity,
                  cond(this.isManuallySetValue, this.manuallySetValue, this.snapPoint),
                  wasRun, this.isManuallySetValue)
              ),
              set(this.isManuallySetValue, 0)
            ]
          ),
        ],
        [
          stopClock(masterClock),
          set(this.preventDecaying, 1),
          set(masterOffseted, add(masterOffseted, sub(this.dragMasterY, prevMasterDrag))),
          set(prevMasterDrag, this.dragMasterY),
          set(wasRun, 0), // not sure about this move for cond-began
          cond(eq(this.panMasterState, State.BEGAN),
            stopClock(this.masterClockForOverscroll),
          ),
        ]
      ),
      cond(greaterThan(masterOffseted, snapPoints[0]), masterOffseted,
        max(
          multiply(
            sub(snapPoints[0], sqrt(add(1, sub(snapPoints[0], masterOffseted)))),
            props.overdragResistanceFactor
          ),
          masterOffseted
        )
      )
    ])

    this.Y = this.withEnhancedLimits(
      withDecaying(
        withPreservingAdditiveOffset(this.dragY, this.panState),
        this.panState,
        this.decayClock,
        this.velocity,
        this.preventDecaying),
      masterOffseted)
  }

  runSpring(clock, value, velocity, dest, wasRun = 0, isManuallySet = 0) {
    const state = {
      finished: new Value(0),
      velocity: new Value(0),
      position: new Value(0),
      time: new Value(0),
    }

    const config = {
      damping,
      mass,
      stiffness,
      overshootClamping,
      restSpeedThreshold,
      restDisplacementThreshold,
      toValue: new Value(0),
      ...this.props.springConfig
    }

    return [
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.velocity, velocity),
        set(state.position, value),
        set(config.toValue, dest),
        cond(and(wasRun, not(isManuallySet)), 0, startClock(clock)),
        cond(defined(wasRun), set(wasRun, 1)),
      ]),
      spring(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position,
    ]
  }

  handleMasterPan = event([{
    nativeEvent: ({
      translationY: this.dragMasterY,
      state: this.panMasterState,
      velocityY: this.masterVelocity
    })
  }]);

  handlePan = event([{
    nativeEvent: ({
      translationY: this.props.enabledInnerScrolling ? this.dragY : this.dragMasterY,
      state: this.props.enabledInnerScrolling ? this.panState : this.panMasterState,
      velocityY: this.props.enabledInnerScrolling ? this.velocity : this.masterVelocity
    })
  }]);

  handleTap = event([{ nativeEvent: { state: this.tapState } }]);

  withEnhancedLimits(val, masterOffseted) {
    const wasRunMaster = new Value(0)
    const min = multiply(-1, add(this.state.heightOfContent, this.state.heightOfHeaderAnimated))
    const prev = new Value(0)
    const limitedVal = new Value(0)
    const diffPres = new Value(0)
    const flagWasRunSpring = new Value(0)
    const justEndedIfEnded = new Value(1)
    const wasEndedMasterAfterInner = new Value(1)
    const prevMaster = new Value(1)
    const prevState = new Value(0)

    const rev = new Value(0)
    return block([
      set(rev, limitedVal),
      cond(or(eq(this.panState, State.BEGAN), and(eq(this.panState, State.ACTIVE), eq(prevState, State.END))), [
        set(prev, val),
        set(flagWasRunSpring, 0),
        stopClock(this.masterClockForOverscroll),
        set(wasRunMaster, 0),
      ], [
        set(limitedVal, add(limitedVal, sub(val, prev))),
        cond(lessThan(limitedVal, min), set(limitedVal, min)),
      ]),
      set(prevState, this.panState), //on iOS sometimes BEGAN event does not trigger
      set(diffPres, sub(prev, val)),
      set(prev, val),
      cond(or(greaterOrEq(limitedVal, 0),
        greaterThan(masterOffseted, 0))
      , [
        cond(eq(this.panState, State.ACTIVE),
          set(masterOffseted, sub(masterOffseted, diffPres)),
        ),
        cond(greaterThan(masterOffseted, 0), [
          set(limitedVal, 0)
        ]),
        cond(not(eq(this.panState, State.END)), set(justEndedIfEnded, 1)),
        cond(or(eq(this.panState, State.ACTIVE), eq(this.panMasterState, State.ACTIVE)), set(wasEndedMasterAfterInner, 0)),
        cond(and(eq(prevMaster, State.ACTIVE), eq(this.panMasterState, State.END), eq(this.panState, State.END)), set(wasEndedMasterAfterInner, 1)),
        set(prevMaster, this.panMasterState),
        cond(and(eq(this.panState, State.END), not(wasEndedMasterAfterInner), not(eq(this.panMasterState, State.ACTIVE)), not(eq(this.panMasterState, State.BEGAN)), or(clockRunning(this.masterClockForOverscroll), not(wasRunMaster))), [
          // cond(justEndedIfEnded, set(this.masterVelocity, diff(val))),
          set(this.masterVelocity, cond(justEndedIfEnded, diff(val), this.velocity)),
          set(masterOffseted, this.runSpring(this.masterClockForOverscroll, masterOffseted, diff(val), this.snapPoint, wasRunMaster)),
          set(this.masterVelocity, 0)
        ]),
        //   cond(eq(this.panState, State.END), set(wasEndedMasterAfterInner, 0)),
        cond(eq(this.panState, State.END), set(justEndedIfEnded, 0)),
        set(this.preventDecaying, 1),
        0
      ], [
        set(this.preventDecaying, 0),
        limitedVal
      ])
    ])
  }

  panRef = React.createRef();

  snapTo = index => {
    if (!this.props.enabledImperativeSnapping) {
      return
    }
    this.manuallySetValue.setValue(this.state.snapPoints[this.state.propsToNewIncides[index]])
    this.isManuallySetValue.setValue(1)
  };

  height = new Value(0)

  handleLayoutHeader = ({
    nativeEvent: {
      layout: {
        height: heightOfHeader
      }
    }
  }) => {
    this.state.heightOfHeaderAnimated.setValue(heightOfHeader)
    this.setState({ heightOfHeader })
  };


  handleFullHeader = ({
    nativeEvent: {
      layout: {
        height
      }
    }
  }) => this.height.setValue(height)



  handleLayoutContent = ({
    nativeEvent: {
      layout: {
        height
      }
    }
  }) => this.state.heightOfContent.setValue(height - this.props.snapPoints[0]);


  static renumber = str => Number(str.split('%')[0]) * screenHeight / 100
  static getDerivedStateFromProps(props, state) {
    let snapPoints
    const sortedPropsSnapPints = props.snapPoints.map((s, i) => {
      if (typeof s === 'number') {
        return { val: s, ind: i }
      } else if (typeof s === 'string') {
        return { val: BottomSheetBehavior.renumber(s), ind: i }
      } else {
        // exception
      }
    }).sort(({ val: a }, { val: b }) => a < b)
    if (state && state.snapPoints) {
      state.snapPoints.forEach((s, i) => s.setValue(sortedPropsSnapPints[0].val - sortedPropsSnapPints[i].val))
      snapPoints = state.snapPoints
    } else {
      snapPoints = sortedPropsSnapPints.map(p => new Value(sortedPropsSnapPints[0].val - p.val))
    }

    const propsToNewIncides = {}
    sortedPropsSnapPints.forEach(({ ind }, i) => propsToNewIncides[ind] = i)

    const { initialSnap } = props


    return {
      init: sortedPropsSnapPints[0].val - sortedPropsSnapPints[propsToNewIncides[initialSnap]].val,
      propsToNewIncides,
      heightOfHeaderAnimated: (state && state.heightOfHeaderAnimated) || new Value(0),
      heightOfContent: (state && state.heightOfContent) || new Value(0),
      initSnap: sortedPropsSnapPints[0].val,
      snapPoints,
      heightOfHeader: (state && state.heightOfHeader) || 0

    }
  }

  master = React.createRef();

  render() {
    return (
      <React.Fragment>
        <Animated.View style={{
          height: '100%',
          width: 0,
          position: 'absolute'
        }}
        onLayout={this.handleFullHeader}
        />
        <Animated.View style={{
          width: '100%',
          position: 'absolute',
          zIndex: 100,
          transform: [
            {
              translateY: this.translateMaster
            },
            {
              translateY: sub(this.height, this.state.initSnap)
            }
          ]
        }}>
          <PanGestureHandler
            enabled={this.props.enabledGestureInteraction}
            ref={this.master}
            waitFor={this.panRef}
            onGestureEvent={this.handleMasterPan}
            onHandlerStateChange={this.handleMasterPan}
          >
            <Animated.View
              style={{
                zIndex: 101
              }}
              onLayout={this.handleLayoutHeader}
            >
              {this.props.renderHeader && this.props.renderHeader()}
            </Animated.View>
          </PanGestureHandler>
          <View
            style={{
              height: this.props.snapPoints[0] - this.state.heightOfHeader,
              overflow: 'hidden'
            }}
          >

            <PanGestureHandler
              enabled={this.props.enabledGestureInteraction}
              waitFor={this.master}
              ref={this.panRef}
              onGestureEvent={this.handlePan}
              onHandlerStateChange={this.handlePan}
            >
              <Animated.View>
                <TapGestureHandler
                  enabled={this.props.enabledGestureInteraction}
                  onHandlerStateChange={this.handleTap}
                >
                  <Animated.View
                    style={{
                      width: '100%',
                      transform: [
                        { translateY: this.Y }
                      ]
                    }}
                    onLayout={this.handleLayoutContent}
                  >
                    {this.props.renderContent && this.props.renderContent()}
                  </Animated.View>
                </TapGestureHandler>
              </Animated.View>
            </PanGestureHandler>
            <Animated.Code
              exec={onChange(this.tapState, cond(eq(this.tapState, State.BEGAN), stopClock(this.decayClock)))}/>
            {this.props.callbackNode &&
            <Animated.Code
              exec={onChange(this.translateMaster, set(this.props.callbackNode, divide(this.translateMaster, this.state.snapPoints[this.state.snapPoints.length - 1])))}/>}
          </View>
        </Animated.View>
      </React.Fragment>
    )
  }
}

