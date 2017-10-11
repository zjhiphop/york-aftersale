
import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';


export default class Logo extends React.Component {
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
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    }
});