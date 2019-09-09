# Reanimated Bottom Sheet
Highly configurable component imitating [native bottom sheet behavior](https://material.io/design/components/sheets-bottom.html#standard-bottom-sheet), with fully native 60 FPS animations!

Built from scratch with [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler) and [react-native-reanimated](https://github.com/kmagiera/react-native-reanimated).

Usable with Expo with no extra native dependencies!

![](gifs/1.gif)  |  ![](gifs/2.gif) |  ![](gifs/3.gif)  |  ![](gifs/4.gif)  |
:---------------:|:----------------:|:-----------------:|:-----------------:|


## Installation

Open a Terminal in the project root and run:

```sh
yarn add reanimated-bottom-sheet
```

or if you use `npm`:

```sh
npm install reanimated-bottom-sheet
```

If you are using Expo, you are done.

If you don't use Expo, install and link [react-native-gesture-handler](https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html) and [react-native-reanimated](https://github.com/kmagiera/react-native-reanimated).

## Usage

```javascript
import BottomSheet from 'reanimated-bottom-sheet'

class Example extends React.Component {
  renderInner = () => (
    /* render */
  )

  renderHeader = () => (
    /* render */
  )

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          snapPoints = {[450, 300, 0]}
          renderContent = {this.renderInner}
          renderHeader = {this.renderHeader}
        />
    </View>)
  }
}
```

## Props

| name                      | required | default | description |
| ------------------------- | -------- | ------- | ------------|
| snapPoints                | yes      |         | E.g. `[300, 200, 0]`. Points for snapping of bottom sheet coomponent. They define distance from bottom of the screen. Might be number or percent (as string e.g. `'20%'`) for points or percents of screen height from bottom. |
| initialSnap               | no       |    0    | Determines initial snap point of bottom sheet. The value is the index from snapPoints. |
| renderContent             | no       |         | Method for rendering scrollable content of bottom sheet. |
| renderHeader              | no       |         | Method for rendering non-scrollable header of bottom sheet. |
| enabledGestureInteraction | no       | `true`  | Defines if bottom sheet could be scrollable by gesture. |
| enabledManualSnapping     | no       | `true`  | If `false` blocks snapping using `snapTo` method. |
| enabledInnerScrolling     | no       | `true`  | Defines whether it's possible to scroll inner content of bottom sheet. |
| callbackNode              | no       |         | `reanimated` node which holds position of bottom sheet, where `0` it the highest snap point and `1` is the lowest. |
| contentPosition           | no       |         | `reanimated` node which holds position of bottom sheet's content (in dp) |
| headerPosition           | no       |         | `reanimated` node which holds position of bottom sheet's header (in dp) |
| overdragResistanceFactor  | no       |   0     | `Defines how violently sheet has to stopped while overdragging. 0 means no overdrag |
| springConfig              | no       | `{ }`   | Overrides config for spring animation |
| innerGestureHandlerRefs   | no       |         | Refs for gesture handlers used for building bottom sheet. The array consists fo three refs. The first for PanGH used for inner content scrolling. The second for PanGH used for header. The third for TapGH used for stopping scrolling the content.   |
| simultaneousHandlers | no       |         | Accepts a react ref object or an array of refs to handler components. |
| onOpenStart | no       |         | Accepts a function to be called when the bottom sheet starts to open. |
| onOpenEnd | no       |         | Accepts a function to be called when the bottom sheet is almost fully openned. |
| onCloseStart | no       |         | Accepts a function to be called when the bottom sheet starts to close. |
| onCloseEnd | no       |         | Accepts a function to be called when the bottom sheet is almost closing. |
| callbackThreshold | no       |    0.01     | Accepts a float value from 0 to 1 indicating the percentage (of the gesture movement) when the callbacks are gonna be called. |


## Methods

### `snapTo(index)`

Imperative method on for snapping to snap point in given index. E.g.

```javascript
// Snap to the snap point at index 0 (e.g. 450 in [450, 300, 0])
this.bottomSheetRef.current.snapTo(0)
```

Here `this.bottomSheetRef` refers [to the `ref`](https://reactjs.org/docs/react-api.html#reactcreateref) passed to the `BottomSheet` component.

## Example

More complex examples can be found in the `Example` folder. To view the examples in the [Expo app](https://expo.io/), open a Terminal and run:

```sh
yarn
cd Example
yarn
expo start
```

The example app is also available on [Expo](https://expo.io/@osdnk/reanimated-bottomsheet-expample).

## Todo

It's not finished and some work has to be done yet.

1. Play with magic config values
2. Horizontal mode
3. Deal with GH in inner scrollView
4. Cleanup code (e.g. measuring of components)

## Contributing

### Publishing a release

We use [release-it](https://github.com/release-it/release-it) to automate our release. If you have publish access to the NPM package, run the following from the master branch to publish a new release:

```sh
yarn release
```

NOTE: You must have a `GITHUB_TOKEN` environment variable available. You can create a GitHub access token with the "repo" access [here](https://github.com/settings/tokens).
