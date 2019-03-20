# Reanimated Bottom Sheet
Highly configurable component imitating [native bottom sheet behavior](https://material.io/design/components/sheets-bottom.html#standard-bottom-sheet), with fully native 60 FPS animations!

Built from scratch with [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler) and [react-native-reanimated](https://github.com/kmagiera/react-native-reanimated).

Usable with Expo with no extra native dependencies!

![](gifs/1.gif)  |  ![](gifs/2.gif) |  ![](gifs/3.gif)  |
:---------------:|:----------------:|:-----------------:|


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
  );

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
| initialSnap               | no       |    0    | Determines initial snap point of bottom sheet. |
| renderContent             | no       |         | Method for rendering scrollable content of bottom sheet. |
| renderHeader              | no       |         | Method for rendering non-scrollable header of bottom sheet. |
| enabledGestureInteraction | no       | `true`  | Defines if bottom sheet could be scrollable by gesture. | 
| enabledManualSnapping     | no       | `true`  | If `false` blocks snapping using `snapTo` method. | 
| enabledInnerScrolling     | no       | `true`  | Defines whether it's possible to scroll inner content of bottom sheet.
| callbackNode              | no       |         | `reanimated` node which holds position of bottom sheet, where `1` it the highest snap point and `0` is the lowest.  


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
