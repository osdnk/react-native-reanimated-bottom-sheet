## Reanimated Bottom Sheet
Component imitating native bottom sheet behavior built from scratch with react-native-gesture-handler and react-native-reanimated.

Usable with Expo with no extra native dependencies. 

## Installation
Make sure that you have previously installed and linked react-native-gesture-handler and react-native-reanimated and then:

```j
yarn add reanimated-bottom-sheet
```

or:
```
npm install reanimated-bottom-sheet
```


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
| snapPoints                | yes      |    -    | E.g. `[300, 200, 0]`. Points for snapping of bottom sheet coomponent. They define distance from bottom of the screen. Might be number or percent (as spring) for points from bottoms or percents of screen height. |
| initialSnap               | no       |    0    | Determines initial snap point of bottom sheet. |
| renderContent             | no       |         | Method for rendering scrollable content of bottom sheet. |
| renderHeader              | no       |         | Method for rendering non-scrollable header of bottom sheet. |
| enabledGestureInteraction | no       | `true`  | Defines if bottom sheet could be scrollable by gesture. | 
| enabledManualSnapping     | no       | `true`  | If `false` blocks snapping using `snapTo` method. | 
| enabledInnerScrolling     | no       | `true`  | Defines whether it's possible to scroll inner content of bottom sheet.
| callbackNode              | no       |         | `reanimated` node which holds position of bottom sheet, where `1` it the highest snap point and `0` is the lowest.  


## Methods
### `snapTo(index)`
Imperative command for snapping to snap point in given index. E.g.

```javascript
this.bottomSheet.current.snaptTo(0)
```

## Example
Few more complicated examples could be found in `Example` folder which is simple Expo app

```javascript
cd Example
yarn
expo start
```
