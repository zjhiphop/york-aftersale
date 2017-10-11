import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, WingBlank, WhiteSpace, Toast, Button, ActionSheet } from 'antd-mobile';
import call from 'react-native-phone-call';
import OrderSvc from '../utils/order-svc';
import { MAPS_TYPE, MapSvc } from '../utils/map-svc';

export default class RequestScreen extends React.Component {
    constructor(props) {
        super(props);

        // OrderSvc.list().then(res => {
        //     console.log(res);
        //     this.setState({
        //         'list': res.list || []
        //     });
        // })

        MapSvc.getMapTypes().then(res => {
            this.setState({
                mapTypes: res
            })
        });

        MapSvc.getLocation().then(res => {
            this.setState({
                currLocation: res
            })
        })
    }
    static navigationOptions = {
        title: '待维修单'
    };

    state = {
        currLocation: {},
        mapTypes: [],
        list: [
            {
                title: '王晓二',
                customerPhone: '13666666666',
                detail: '水泵故障',
                customerAddress: '无锡市南长区XXX',
                createAt: '2017-09-22 15:20:30',
                _id: 1
            },
            {
                title: '杨思',
                customerPhone: '13666666666',
                detail: '水泵故障',
                customerAddress: '无锡市南长区XXX',
                createAt: '2017-09-22 15:20:30',
                _id: 2
            },
            {
                title: '马三',
                customerPhone: '13666666666',
                detail: '水泵故障',
                customerAddress: '无锡市南长区XXX',
                createAt: '2017-09-22 15:20:30',
                _id: 3
            }
        ]
    }

    render() {
        console.log(this.state);

        return (
            <View>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {this.state.list.map(this._renderCard.bind(this))}
                </WingBlank>
            </View>
        );
    }

    setDone(id) {
        OrderSvc.setDone(id).then(res => {
            console.log(res);

            this.setState({
                list: this.state.list.filter(item => item._id !== id)
            })

            Toast.show('设置成功！');
        });
    }

    showMapAction(message) {
        let BUTTONS = this.state.mapTypes.map(item => item.name).concat(['取消']);

        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            title: '请选择地图打开',
            message: message,
            maskClosable: true
        },
            (buttonIndex) => {
                if (this.state.mapTypes[buttonIndex]) {
                    MapSvc.openNav(this.state.mapTypes[buttonIndex], message);
                }
            });
    }

    _renderCard(data) {

        const { navigate } = this.props['navigation'];
        return <View
            onTouchStart={e => {
                navigate('SettingDetail', { data: data });
            }}>
            <Card>
                <Card.Header
                    title={data.title}
                    extra={
                        <View
                            onTouchStart={e => {
                                e.stopPropagation();
                                const args = {
                                    number: data.customerPhone, // String value with the number to call
                                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                                }

                                call(args).catch(console.error)
                            }}>
                            <Text style={styles.title}
                            >{data.customerPhone}</Text>
                        </View>}
                />
                <Card.Body>
                    <View style={styles.body}>
                        <Text style={styles.detail}> {data.detail} </Text>
                        <View onTouchStart={e => {
                            e.stopPropagation();
                            this.showMapAction(data.customerAddress);
                        }}><Text style={styles.address}> 住址：{data.customerAddress}</Text></View>
                    </View>
                </Card.Body>
                <Card.Footer content={<Text style={styles.footerTitle}>{data.createAt}</Text>} extra={<View onTouchStart={e => {
                    e.stopPropagation();
                    this.setDone(data._id);
                }}><Text style={styles.button} >维修完毕</Text></View>} />
            </Card>
            <WhiteSpace size="lg" />
        </View>
    }
};

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        right: 5,
        top: -5,
        color: 'grey'
    },
    body: {
        padding: 10
    },
    footerTitle: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        color: 'grey'
    },
    button: {
        position: 'absolute',
        top: -30,
        right: 10,
        fontSize: 18,
        color: 'blue'
    },
    detail: {
        color: '#333'
    },
    address: {
        color: '#999',
        marginTop: 10,
        marginBottom: 10
    }
})