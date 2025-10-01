import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const saved = () => {
  return (
    <View style={{backgroundColor: colors.primary, flex:1}}>
      <Image
        source={icons.save}
        style={{margin: 'auto'}}
      />
    </View>
  )
}

export default saved

const styles = StyleSheet.create({})