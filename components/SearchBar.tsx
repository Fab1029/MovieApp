import { colors } from '@/constants/colors';
import { icons } from '@/constants/icons';
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

interface Props {
    placeholder: string;
    onPress: () => void;
    value: string;
    onChangeText: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText}: Props) => {
  return (
    <View style={styles.searchBarContainer}>
      <Image source={icons.search} style={styles.searchIcon}/>
      <TextInput 
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        style={styles.textInputSeacrhBar}

      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBarContainer: {
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.dark[200]
    },
    searchIcon: {
        width: 20,
        marginLeft: 5,
        tintColor: '#ab8bff',
        resizeMode: 'contain',
    },
    textInputSeacrhBar: {
        flex: 1,
        marginLeft: 5,
        color: 'white',
    }
})