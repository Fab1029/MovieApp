import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const TrendingCard = ({movie:{movie_id, title, poster_url}, index}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity style={{width: 100, position:'relative', paddingLeft: 5}}>
            <Image
                source={{uri: poster_url}}
                style={{width: 100, height:150, borderRadius: 10}}
            />
            <View style={{position: 'absolute', bottom: -20, left:-10}}>
                <Text
                    style={{
                    fontWeight: 900,
                    color: "#ffffffbb",
                    fontSize: 50,
                    textShadowColor: "rgba(0,0,0,0.9)", 
                    textShadowOffset: { width: 2, height: 2 },
                    textShadowRadius: 4,
                    }}
                >
                    {index + 1} 
                </Text>
            </View>
        </TouchableOpacity>

    </Link>
  )
}

export default TrendingCard

const styles = StyleSheet.create({})