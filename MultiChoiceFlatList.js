import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';


class MultiChoiceFlatList extends Component {
    componentWillReceiveProps(nextProps) {
        const data1 = this.state.data;
        const data2 = nextProps.data;
        let rerender = false;
        if(data1.length != data2.length){
            rerender = true;
        }else if(typeof (this.props.keyExtractor) == 'function'){
            let eq = true;
            for (let i = 0 ; i < data2.length ; i++){
                if(this.props.keyExtractor(data1[i]) != this.props.keyExtractor(data2[i])){
                    rerender = true;
                    break;
                }
            }
        }

        if(rerender){
            this.setState({data:this.getDataMap(nextProps.data) , selectedIndexes: this.props.selectedIndexes,
                selectedIndex: this.props.selectedIndex});
        }

    }

    getDataMap(data){
        return data.map((item, index) => {
            if (this.props.singleMode) {
                item.isSelected = this.props.selectedIndex == index ? true : false;

            } else {
                item.isSelected = this.props.selectedIndexes.includes(index) ? true : item.isSelected || false;
            }
            return item;
        });
    }

    state = {
        selectedIndexes: this.props.selectedIndexes,
        selectedIndex: this.props.selectedIndex,
        data: this.getDataMap(this.props.data),
    }

    selectItem = (item, index) => {
        if (this.props.singleMode) {
            const tmp = this.state.selectedIndex;
            if (tmp < this.state.data.length) {
                this.state.data[tmp] = {...this.state.data[tmp], isSelected: false};
                item.isSelected = true;
                this.state.data[index] = item;
            } else {
                this.state.data = this.state.data.map((item) => {
                    item.isSelected = false;
                    return item;
                })
                item.isSelected = true;
                this.state.data[index] = item;
            }
            this.props.onSelectedIndexesChange(item, index, item.isSelected);

            this.setState({
                data: this.state.data,
                selectedIndex: index
            });
        } else {
            item.isSelected = !item.isSelected;
            this.state.data[index] = item;
            this.props.onSelectedIndexesChange(item, index, item.isSelected);
            this.setState({
                data: this.state.data,
            });
        }


    };

    renderItem = (item, index) => {
       const itemView = item.isSelected ? this.props.renderSelectedItem(item, index) : this.props.renderItem(item, index);
        return (
            <TouchableOpacity
        onPress={() => this.selectItem(item, index)}
    >
        {itemView}
    </TouchableOpacity>
    )
    }

    getSelectedItems() {
        const newList = this.state.data.filter((item) => {
            return item.isSelected;
        })
        return newList;
    }

    getNonSelectedItems() {
        const newList = this.state.data.filter((item) => {
            return !item.isSelected;
        })
        return newList;
    }


    render() {
        return (
            <FlatList
        {...this.props}
        data={this.state.data}
        renderItem={({item, index}) => {
            return this.renderItem(item, index)
        }
    }
        extraData={this.state}

        />
    )
    }

}

MultiChoiceFlatList.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    onSelectedIndexesChange: PropTypes.func,
    data: PropTypes.array,
    renderItem: PropTypes.func,
    renderSelectedItem: PropTypes.func,
    selectedIndexes: PropTypes.array,
    selectedIndex: PropTypes.number,
    singleMode: PropTypes.boolean

}

MultiChoiceFlatList.defaultProps = {
    onSelectedIndexesChange: (index, item, selectedIndexes) => {
        return {index, item};
    },
    data: [],
    renderItem: (item, index) => {
    },
    renderSelectedItem: (item, index) => {
    },
    selectedIndexes: [],
    selectedIndex: 0,
    singleMode: true,

}

export default MultiChoiceFlatList