/**
 * Example: 
 *  
 */
import * as React from 'react';
import {
    StyleSheet, View, ListView, RefreshControl, ListViewDataSource
} from 'react-native';

interface PullToSrollProps {
    renderRow: any,
    dataArray: Array<any>,
    onScrollStart?: (e) => void,
    onScrollEnd?: (e) => void,
    onRefresh?: () => void,
    enableRefresh: boolean,
    refreshing: boolean
}


export default class PullToSrollComponent extends React.Component<PullToSrollProps> {
    ds: ListViewDataSource
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
    render() {
        let dataSource = this.ds.cloneWithRows(this.props.dataArray);

        return (
            <ListView
                onScrollBeginDrag={this.props.onScrollStart}
                onScrollEndDrag={this.props.onScrollEnd}
                dataSource={dataSource}
                renderRow={this.props.renderRow}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        enabled={this.props.enableRefresh}
                        onRefresh={this.props.onRefresh}
                    />
                }
            >
            </ListView>
        );
    }

    state = {
        refreshing: false
    }
}

const styles = StyleSheet.create({

});