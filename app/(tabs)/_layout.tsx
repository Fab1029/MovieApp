import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const TabIcon = ({focused, icon, title}: any) => {
    if (focused) {
        return (
            <View
                style={styles.iconContainer}
            >
                <Image
                    source={icon}
                    style={styles.icon}
                />
                <Text style={styles.text}>{title}</Text>
                
            </View>
        )
    }
    else {
        return (
            <View>
                <Image source={icon} tintColor='#A8B5DB'/>
            </View>
        )

    }
}

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            },
            tabBarStyle: {
                borderRadius: 50,
                marginHorizontal:20,
                marginBottom:36,
                height: 45,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#0F0D23',
                backgroundColor: '#0F0D23',
                alignItems: 'center',
                justifyContent: 'center',
            }
        }}
    >
        <Tabs.Screen
            name='index'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} icon ={icons.home} title = 'Home'/>
                )
            }}
        />
        <Tabs.Screen
            name='search'
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} icon ={icons.search} title = 'Search'/>
                )
            }}
        />
        <Tabs.Screen
            name='saved'
            options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} icon ={icons.save} title = 'Saved'/>
                )
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} icon ={icons.person} title = 'Profile'/>
                )
            }}
        />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
  iconContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aa8cf7',

    height: 50,
    width: 100,
    overflow: 'hidden',
    borderRadius: 50,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'black'
  },
  text: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
})