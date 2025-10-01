import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const profile = () => {
  return (
    <View style={{backgroundColor: colors.primary, flex:1}}>
      <Image
        source={icons.person}
        style={{margin: 'auto'}}
      />
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})