import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { Searchbar, Divider } from 'react-native-paper';


export default function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <Divider />
            <View style={styles.searchResult}>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
    searchBar: {
        flex: 0.15,
        width: '90%',
        margin: '5%',
        justifyContent: 'center',
    },
    searchResult: {
        flex: 0.85,
    },
});
