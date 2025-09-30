import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity style={{width: '30%'}}>
        <Image
          source={{
            uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
          }}
          style = {styles.imageMovieCard}
        />
        
        <Text style={{fontSize: 12, color: 'white'}} numberOfLines={1}>{title}</Text>

        <View style={styles.detailsMovieCardContainer}>
          <Image
            source={icons.star}
            style={{width: 10, height: 10}}
          />
          <Text style={{fontSize: 10, color: 'white', fontWeight: 800}}>
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 9, color: 'white'}}>
            {release_date.split('-')[0]}
          </Text>
          <Text style={{fontSize: 9, color: 'white'}}>
            MOVIE
          </Text>
        </View>
        
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard

const styles = StyleSheet.create({
  imageMovieCard: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  detailsMovieCardContainer : {
    gap: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})