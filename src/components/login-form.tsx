import * as React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image, TextInput
} from 'react-native';

import { List, InputItem, WhiteSpace, Toast } from 'antd-mobile';
import eyeImg from '../assets/eye.png'

let DEFAULT_PHONE = '13888888888';
let DEFAULT_PASS = '22222222';

class LoginForm extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.showPass = this.showPass.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);

    }

    componentWillMount() {
        this.props.onChange({
            phone: DEFAULT_PHONE,
            password: DEFAULT_PASS
        });
    }

    state = {
        showPass: false,
        hasError: false
    }

    showPass() {
        this.setState({ showPass: !this.state.showPass });
    }

    onPhoneChange(value) {
        value = value.replace(/\s+/g, '');

        if (value.length !== 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });

            this.props.onChange({ phone: value });
        }
    }

    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入11位手机号');
        }
    }

    render() {

        return (
            <KeyboardAvoidingView behavior='padding'
                style={styles.container}>
                <InputItem
                    style={styles.input}
                    type="phone"
                    error={this.state.hasError}
                    onErrorClick={this.onErrorClick}
                    placeholder="138 8888 8888"
                    maxLength={11}
                    defaultValue={DEFAULT_PHONE}
                    onChange={this.onPhoneChange}
                >手机</InputItem>
                <InputItem
                    style={styles.input}
                    type={this.state.showPass ? 'text' : 'password'}
                    defaultValue={DEFAULT_PASS}
                    onChange={value => {
                        this.props.onChange({ password: value })
                    }}
                    placeholder="******"
                >密码</InputItem>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnEye}
                    onPress={this.showPass}
                >
                    <Image source={eyeImg} style={styles.iconEye} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: -100
    },
    input: {
        backgroundColor: 'transparent'
    },
    btnEye: {
        position: 'absolute',
        top: 55,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    }
})

export default LoginForm;