
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';


export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')} style={styles.image} />
                <Text style={styles.text}>约克智能温控</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 191,
        height: 68,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    }
});