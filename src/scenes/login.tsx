import React, { Component, PropTypes } from 'react';
import Logo from '../components/logo';
import Form from '../components/login-form';
import Wallpaper from '../components/wallpaper';
import ButtonSubmit from '../components/button-submit';
import UserSvc from '../utils/user-svc';
import { NavigationActions } from 'react-navigation';

export default class LoginScreen extends Component<any, any> {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }
    state = {
        phone: '',
        password: ''
    }

    onSubmit() {
        return UserSvc.login(this.state.phone, this.state.password)
            .then(res => {
                // go to home screen
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Main' })
                    ]
                });

                this.props.navigation.dispatch(resetAction);
            });
    }

    render() {
        return (
            <Wallpaper>
                <Logo />
                <Form onChange={(stateObj) => {
                    this.setState(stateObj);
                }} />
                <ButtonSubmit submit={this.onSubmit} />
            </Wallpaper>
        )
    }
}
