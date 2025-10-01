import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fetchMovieDetails } from '../../services/api'

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
};

const MovieInfo = ({label, value}: MovieInfoProps) => (
  <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginTop:5}}>
    <Text style={{color: colors.light[200], fontSize: 12, fontWeight: 500}}>
      {label}
    </Text>
    <Text style={{color: colors.light[100], fontWeight: 600, fontSize: 12}}>
      {value || 'NA'}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const loadMovieDetails = async() => {
      const data = await fetchMovieDetails(`${id}`);
      setMovieDetails(data);
    };

    loadMovieDetails();
    setLoading(false);
  }, []);

  return (
    <View style={{backgroundColor: colors.primary, flex:1}}>
      {loading ? (
        <ActivityIndicator 
          size='large'
          color='#0000ff'
          style={{alignSelf: 'center', marginVertical: 'auto'}}
        />
      ): (
        <>
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
          <View>
            <Image source={{uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}} style={{width: '100%', height: 550, resizeMode: 'stretch'}}/>
          </View>

          <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginTop: 5, paddingHorizontal: 5}}>
            <Text style={{color: 'white', fontWeight: 800, fontSize: 18}}>
              {movieDetails?.title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 2}}>
              <Text style={{color:colors.light[200], fontSize: 10}}>
                {movieDetails?.release_date?.split('-')[0]}
              </Text>
              <Text style={{color:colors.light[200], fontSize: 10}}>
                {movieDetails?.runtime}m
              </Text>
            </View>
            <View style={{flexDirection:'row', alignItems: 'center', backgroundColor: colors.dark[100], padding: 5, borderRadius: 5, gap: 5, marginTop: 2}}>
              <Image
                source={icons.star}
                style={{width:10, height: 10}}
              />
              <Text style={{color:'white', fontWeight: 800, fontSize: 10}}>
                {Math.round(movieDetails?.vote_average ?? 0)} / 10
              </Text>
              <Text style={{color: colors.light[200], fontSize: 10}}>
                ({movieDetails?.vote_count} votess) 
              </Text>
            </View>
            <MovieInfo
              label='Overview'
              value={movieDetails?.overview}
            />
            <MovieInfo
              label='Genres'
              value={movieDetails?.genres.map((g) => g.name).join(' - ') || 'NA'}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '50%'}}>
              <MovieInfo
                label='Budget'
                value={movieDetails?.budget ? `$${movieDetails.budget / 1_000_000} million` : 'NA'}
              />
              <MovieInfo
                label='Revenue'
                value={movieDetails?.revenue ? `$${Math.round(movieDetails.revenue) / 1_000_000}` : 'NA'}
              />
            </View>
            <MovieInfo
                label='Production Companies'
                value={movieDetails?.production_companies.map((p) => p.name).join(' - ') || 'NA'}
              />
          </View>
        </ScrollView>
        
        <TouchableOpacity style={{position: 'absolute', bottom: 25, left: 0, right: 0, backgroundColor: colors.accent, paddingVertical: 8, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}
          onPress={router.back}
        >
          <Image
            source={icons.arrow}
            style={{width: 25, height: 25,  marginRight: 1, marginTop: 1, tintColor: '#ffff', transform: [{ rotate: '180deg' }], resizeMode: 'contain'}}
          />
          <Text style={{color: 'white', fontWeight: 600, fontSize: 16}}>
            Go Back
          </Text>
        </TouchableOpacity>
        </>
        
      )}
      
      
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})