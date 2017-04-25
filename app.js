
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Header from "./header";
import Footer from "./footer";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allComplete: false,
            value: "Enter first time: ",
            items: []
        }
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    }

    handleToggleAllComplete() {
        const complete = !this.state.allComplete;
        const newItems = this.state.items.map((item) => ({
            ... item,
            complete
        }))
        console.table(newItems);
        this.setState({
            items: newItems,
            allComplete: complete
        })
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
        this.setState({
            items: newItems,
            value: "Enter any values: "
        })
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
    }
});
