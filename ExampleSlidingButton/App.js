/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import RNSlidingButton, {SlideDirection} from './src/component/ui/RNSlidingButton';


export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            slidingMessage: "Please slide..."
        };
    }

    onSlide = () => {
        this.setState({
            slidingMessage: "Sliding success..."
        });
    };

    onSlideLeft = () => {
        this.setState({
            slidingMessage: "Sliding left success..."
        });
    };

    onSlideRight = () => {
        this.setState({
            slidingMessage: "Sliding right success..."
        });
    };

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.content}>

                <Text style={styles.messageTest}>
                    {this.state.slidingMessage}
                </Text>

                <RNSlidingButton
                    style={{
                        borderColor: '#fff1c2',
                        borderRadius: 30,
                        borderWidth: 1,
                        alignSelf: 'stretch',
                    }}
                    height={35}
                    onSlidingSuccess={this.onSlide}
                    slideDirection={SlideDirection.ANY}>
                  <View>
                    <Text style={styles.titleText}>
                      SLIDE TO ACCEPT
                    </Text>
                  </View>
                </RNSlidingButton>

                <RNSlidingButton
                    style={{
                        alignSelf: 'stretch',
                    }}
                    height={35}
                    onSlidingSuccess={this.onSlideLeft}
                    slideDirection={SlideDirection.LEFT}>
                  <View>
                    <Text style={styles.titleText}>
                        {"< SLIDE LEFT TO ACCEPT"}
                    </Text>
                  </View>
                </RNSlidingButton>

                <RNSlidingButton
                    style={{
                        borderColor: '#1c2c87',
                        borderRadius: 30,
                        borderWidth: 1,
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
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    content: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flex: 0.5,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 17,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#ffffff'
    },
    messageTest: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        color: '#1c2c87',
        marginVertical: 20
    },
});
