# React Native Sliding Button
[![npm version](https://badge.fury.io/js/rn-sliding-button.svg)](https://badge.fury.io/js/rn-sliding-button)

React Native Button component which support Slide event to perform action.It support only slideComplete event not tappe event.

![rnslidingbutton](https://user-images.githubusercontent.com/31007929/34517639-d1fab516-f0a1-11e7-9158-b29bc6fe5591.gif)

# Installation.
Install the package with NPM.

```sh
npm install rn-sliding-button --save
```

Or with YARN

```sh
yarn install rn-sliding-button
```


# How to use.

Very simple to use just add this component in your file.
```js
// import packages
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';

// use in your class
onSlideRight = () => {
    //perform Action on slide success.
};

//use in your class
onSlideBoth = (x) => {
//Here x will give you the value of your button along x-axis(left < 0 && right > 0) when your onSlideBoth function is trigerred
//With the help of x you can perform different action when value is less than 0 and when value is 
//greter that 0
}

<RNSlidingButton
  style={{
    width: 240
  }}
  height={35}
  onSlidingSuccess={this.onSlideRight}
  slideDirection={SlideDirection.RIGHT}>
  <View>
    <Text numberOfLines={1} style={styles.titleText}>
      SLIDE RIGHT TO ACCEPT >
    </Text>
  </View>
</RNSlidingButton>

// If you are using for both left and right i.e ANY case
 <RNSlidingButton
  style={{
    width: 240
  }}
  height={35}
  onSlidingSuccess={this.onSlideBoth}
  slideDirection={SlideDirection.ANY}>
  <View>
    <Text numberOfLines={1} style={styles.titleText}>
      < SLIDE IN BOTH DIRECTION >
    </Text>
  </View>
</RNSlidingButton>

const styles = StyleSheet.create({
    titleText: {
        fontSize: 17,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#ffffff'
    }
});
```

API
---
### SlidingButton

| Prop           | Type       | Default               |   Description
| -------------  |:----------:|:---------------------:|:------------------
| height         | number     | <required>            | Height of button
| slideDirection | string     | `SlideDirection.RIGHT`| Determines which direction to slide. Either `SlideDirection.LEFT`, `SlideDirection.RIGHT`, `SlideDirection.ANY`.
| onSlidingSuccess | function   | <optional>            | Fired when slide succeeds
| onSlide        | function   | <optional>            | Fired on every movement. Distance of movement is passed as argument.
| successfulSlidePercent | number | <optional>        | Percent of total button width needed to slide before movement is seen as a successful slide. Default is 40.

