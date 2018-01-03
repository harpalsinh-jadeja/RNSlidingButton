'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';


const SlideDirection = {
    LEFT: "left",
    RIGHT: "right",
    ANY: "any"
};

export default class RNSlidingButton extends Component {
    constructor(props) {
        super(props);
        this.buttonWidth = 0;
        this.state = {
            initialX: 0,
            locationX: 0,
            dx: 0,
            animatedX: new Animated.Value(0),
            animatedY: new Animated.Value(0),
            released: false,
            swiped: true,
        };
    }


    isSlideSuccessful() {
        let slidePercent = this.props.successfulSlidePercent || 40;
        let successfulSlideWidth = this.buttonWidth * slidePercent / 100;
        if (!this.props.slideDirection) {
            return this.state.dx > successfulSlideWidth;  // Defaults to right slide
        } else if (this.props.slideDirection === SlideDirection.RIGHT) {
            return this.state.dx > successfulSlideWidth;
        } else if (this.props.slideDirection === SlideDirection.LEFT) {
            return this.state.dx < (-1 * successfulSlideWidth);
        } else if (this.props.slideDirection === SlideDirection.ANY) {
            return Math.abs(this.state.dx) > successfulSlideWidth;
        }
    }

    onSlide(x) {
        if (this.props.onSlide) {
            this.props.onSlide(x);
        }
    }

    componentWillMount() {
        let self = this;

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
            },

            onPanResponderMove: (evt, gestureState) => {
                self.setState({
                    locationX: evt.nativeEvent.locationX,
                    dx: gestureState.dx
                });
                self.onSlide(gestureState.dx);
            },

            onPanResponderRelease: (evt, gestureState) => {
                if (this.isSlideSuccessful()) {
                    self.props.onSlidingSuccess();
                    this.moveButtonOut(() => {
                        self.setState({swiped: true});
                    });
                }
                this.snapToPosition(() => {
                    self.setState({
                        released: false,
                        dx: self.state.initialX
                    });
                });
            },

            onPanResponderTerminate: (evt, gestureState) => {
                this.snapToPosition(() => {
                    self.setState({
                        released: false,
                        dx: self.state.initialX
                    });
                });
            },

            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            }
        });
    }

    onSlidingSuccess() {
        if (this.props.onSlidingSuccess !== undefined) {
            this.props.onSlidingSuccess();
        }
    }

    moveButtonOut(onCompleteCallback) {
        let self = this;
        let startPos = this.state.initialX + this.state.dx;
        let endPos = this.state.dx < 0 ? -this.buttonWidth : this.buttonWidth * 2;

        this.setState({
            released: true,
            animatedX: new Animated.Value(startPos),
            animatedY: new Animated.Value(startPos * -1)
        }, () => {
            Animated.timing(
                self.state.animatedX,
                {toValue: endPos}
            ).start(onCompleteCallback);

            Animated.timing(
                this.state.animatedY,
                {toValue: endPos}
            ).start(onCompleteCallback);

        });
    }

    snapToPosition(onCompleteCallback) {
        let self = this;
        let startPos = this.state.initialX + this.state.dx;
        let endPos = this.state.initialX;
        this.setState({
            released: true,
            animatedX: new Animated.Value(startPos),
            animatedY: new Animated.Value(startPos * -1)
        }, () => {
            Animated.timing(
                this.state.animatedX,
                {toValue: endPos}
            ).start(onCompleteCallback);

            Animated.timing(
                this.state.animatedY,
                {toValue: endPos}
            ).start(onCompleteCallback);

        });
    }

    onLayout(event) {
        this.buttonWidth = event.nativeEvent.layout.width;
        this.setState({
            initialX: event.nativeEvent.layout.x
        });
    }

    render() {
        let style = [styles.button, {
            left: this.state.dx,
            right: this.state.dx * -1,
            backgroundColor: 'transparent',
        }];
        let button: undefined;

        if (this.state.released) {
            style = [styles.button, {
                left: this.state.animatedX,
                right: this.state.animatedY,
                backgroundColor: 'transparent',
            }];
            button = (
                <Animated.View style={style}>
                    {this.props.children}
                </Animated.View>
            );
        } else {
            button = (
                <View style={style}>
                    <View onLayout={this.onLayout.bind(this)}>
                        {this.props.children}
                    </View>
                </View>
            );
        }

        return (
            <View style={[styles.slidingContainer, this.props.style, {height: this.props.height}]}>
                <View style={styles.container} {...this.panResponder.panHandlers}>
                    {button}
                </View>
            </View>
        );
    }
}

RNSlidingButton.propTypes = {
    successfulSlidePercent: PropTypes.number,
    height: PropTypes.number.isRequired,
    slideDirection: PropTypes.string
};

const styles = StyleSheet.create({
    slidingContainer: {
        backgroundColor: '#0761c1',
        overflow: 'hidden',
        justifyContent: 'center',
    },
    container: {
        position: 'relative',
        justifyContent: 'center',
        flex: 1,
    },
    button: {
        position: 'absolute',
    }
});

export {SlideDirection}