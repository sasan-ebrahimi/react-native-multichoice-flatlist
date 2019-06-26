
## Multiple / Single Choice Flatlist

### Advantages :

- Completely customizable
- Supports all FlatList props
- Supports both multiple mode and single mode

## Version 1.0.7

- rerendering on data change bug fixed

## 1. Install

    npm install --save react-native-multichoice-flatlist

## 2. Usage

    import {MultiChoiceFlatList} from "react-native-multichoice-flatlist";
    ...
    <MultiChoiceFlatList
        ref={"mc"}
        data={[
            {id: 1, title: "First Item" , anotherProp:"the other prop" },
            {id: 2, title: "Second Item" , anotherProp:"the other prop" },
            {id: 3, title: "Third Item" , anotherProp:"the other prop" },
            {id: 4, title: "Fourth Item" , anotherProp:"the other prop" },
            {id: 5, title: "Fifth Item" , anotherProp:"the other prop" },
        ]}
        renderItem={(item, index) => {
            return (
                <View
                    style={{
                        borderWidth:1.2,
                        borderRadius:15,
                        borderColor:'#5d5d5d',
                        paddingHorizontal:15,
                        paddingVertical:4,
                        marginHorizontal:10,
                        marginVertical:3
                    }}>
                    <Text style={{
                        color:'#5d5d5d'
                    }}>
                        {item.title}
                    </Text>
                </View>
            )
        }}

        renderSelectedItem={(item, index) => {
           return (
               <View
                   style={{
                       borderWidth:1.2,
                       borderRadius:15,
                       borderColor:'green',
                       backgroundColor:'#11c600bb',
                       paddingHorizontal:15,
                       paddingVertical:4,
                       marginHorizontal:10,
                       marginVertical:3
                    }}>
                    <Text style={{
                        color:'white'
                    }}>
                        {item.title}
                        </Text>
                </View>
            )
        }}

        onSelectedIndexesChange={(item, index, selected) => {
            console.log("item ", item)
            console.log("index ", index)
            console.log("is selected ", selected);
        }}

        singleMode={false}
        selectedIndexes={[2,3]}
        keyExtractor={(item, index) => item.id}

    />

## Props

|Prop| Type | Default | Description |
|--|--|--|--|
| data | array  | [] | the data to be shown (as orginal flatlist) |
| renderItem | function | - | renders non selected item |
| renderSelectedItem | function | - | renders selected item |
| singleMode | boolean | true | if 'true' just one item can be selected, if 'false' it's multichoice |
| selectedIndex | int | 0 | ( ONLY WHEN 'singleMode=true' ) default selected item |
| selectedIndexes | array of int | [] | ( ONLY WHEN 'singleMode=false' ) default selected items |
| onSelectedIndexesChange | function | - | listener function for item selection which provides touched item , index of touched item, a boolean which shows if the item is selected or not |
| keyExtractor | function | - | is required for rerendering the flatlist when data changes. |

## Methods

| Method | Return Type | Description |
|--|--|--|
| getSelectedItems | array  | returns an array containing selected items |
| getNonSelectedItems | array  | returns an array containing non selected items |

## Screenshots
|Screenshots|
|--|
|![ios](http://s-ebrahimi.com/lib_images/react-native-multichoice-flatlist.png)|

