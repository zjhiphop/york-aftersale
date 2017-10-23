import * as React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Image,
    Alert,
    View,
    Dimensions
} from 'react-native';
import {
    ActivityIndicator
} from 'antd-mobile';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.buttomAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this.onPress = this.onPress.bind(this);
    }

    buttomAnimated;
    growAnimated;

    state = {
        isLoading: false
    }

    onPress() {
        if (this.state.isLoading) return;

        this.setState({ isLoading: true });

        // Animated.timing(this.buttomAnimated, {
        //     toValue: 1,
        //     duration: 200,
        //     easing: Easing.linear
        // }).start();

        // setTimeout(() => {
        //     this.onGrow();
        // }, 2000);

        // setTimeout(() => {
        //     this.setState({ isLoading: false });
        //     this.buttomAnimated.setValue(0);
        //     this.growAnimated.setValue(0);
        // }, 5000);

        this.props.submit();

        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 2000)
    }

    onGrow() {
        Animated.timing(
            this.growAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();
    }

    render() {
        const changeWidth = this.buttomAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
        });

        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN]
        });

        return (
            <View style={styles.container}>
                <Animated.View style={{ width: changeWidth }}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={1}
                        onPress={this.onPress}>
                        {this.state.isLoading ?
                            <ActivityIndicator
                                text="正在登录"
                                animating={true}
                            /> :
                            <Text style={styles.text}>登录</Text>
                        }
                    </TouchableOpacity>
                    <Animated.View style={[styles.circle, { transform: [{ scale: changeScale }] }]} />
                </Animated.View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 0,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,255, .8)',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#F035E0',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
});