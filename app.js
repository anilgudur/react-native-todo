
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  Keyboard
} from 'react-native';
import Header from "./header";
import Footer from "./footer";
import Row from "./row";

export default class App extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            allComplete: false,
            value: "Enter first time: ",
            items: [],
            dataSource: ds.cloneWithRows([])
        }
        this.setSource = this.setSource.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    }

    setSource(items, itemsDatasource, otherState = {}) {
        this.setState({
            items,
            dataSource: this.state.dataSource.cloneWithRows(itemsDatasource), 
            ... otherState
        })
    }

    handleToggleAllComplete() {
        const complete = !this.state.allComplete;
        const newItems = this.state.items.map((item) => ({
            ... item,
            complete
        }))
        console.table(newItems);
        this.setSource(newItems, newItems, {allComplete: complete})
        // this.setState({
        //     items: newItems,
        //     allComplete: complete
        // })
    }

    handleAddItem() {
        if (!this.state.value) return;
        const newItems = [
            ... this.state.items,
            {
                key:        Date.now(),
                text:       this.state.value,
                complete:   false
            }
        ]
        this.setSource(newItems, newItems, {value: "Enter any values: "})
        // this.setState({
        //     items: newItems,
        //     value: "Enter any values: "
        // })
        console.log(newItems);
        console.log(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header 
                    value={this.state.value} 
                    onAddItem={this.handleAddItem} 
                    onChange={(value) => this.setState({value})} 
                    onToggleAllComplete={this.handleToggleAllComplete}
                />
                <View style={styles.content}>
                    <ListView 
                        style={styles.list} 
                        enableEmptySections 
                        dataSource={this.state.dataSource} 
                        onScroll={() => Keyboard.dismiss()} 
                        renderRow={( {key, ... value} ) => {
                            return (
                                <Row 
                                    key={key} 
                                    { ... value }
                                />
                            )
                        }} 
                        renderSeparator={(sectionId, rowId) => {
                            return <View key={rowId} style={styles.separator} />
                        }}
                    />
                </View>
                <Footer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        ... Platform.select({
            android: {paddingTop:10}
        })
    }, 
    content: {
        flex: 1
    },
    list: {
        backgroundColor: "#FFF"
    }, 
    separator: {
        borderWidth: 1,
        borderColor: "#F5F5F5"
    }
});
