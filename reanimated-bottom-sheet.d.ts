declare module 'reanimated-bottom-sheet' {
  import * as React from 'react';
  import Animated from 'react-native-reanimated';

  interface BottomSheetProps {
    /** Points for snapping of bottom sheet component. They define distance from bottom of the screen. Might be number or percent (as string e.g. '20%') for points or percents of screen height from bottom. */
    snapPoints: number[];

    /** Determines initial snap point of bottom sheet. Defaults to 0. */
    initialSnap?: number;

    /** Method for rendering scrollable content of bottom sheet. */
    renderContent?: () => React.ReactElement | null;

    /**  Method for rendering non-scrollable header of bottom sheet. */
    renderHeader?: () => React.ReactElement | null;

    /** Defines if bottom sheet could be scrollable by gesture. Defaults to true. */
    enabledGestureInteraction?: boolean;

    /** If false blocks snapping using snapTo method. Defaults to true */
    enabledManualSnapping?: boolean;

    /** Defines whether it's possible to scroll inner content of bottom sheet. Defaults to true. */
    enabledInnerScrolling?: boolean;

    /** Reanimated node which holds position of bottom sheet, where 1 it the highest snap point and 0 is the lowest. */
    callbackNode?: Animated.Node<any>;
  }

  export default class BottomSheet extends React.Component<BottomSheetProps> {
    /** Snap to the snap point at index (e.g. index 0 is 450 in [450, 300, 0]) */
    snapTo: (index: number) => void;
  }
}
