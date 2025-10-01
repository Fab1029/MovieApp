import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { fetchMovies, updateSearchCount } from '../../services/api'

const search = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchInitialMovies = async () => {
      const data = await fetchMovies('');
      setMovies(data);
      setLoading(false);
    };

    fetchInitialMovies();
  }, []);

  useEffect(() => {
    const timeID = setTimeout(async () => {
      const data = await fetchMovies(query);
      
      setMovies(data);
      setLoading(false);  

      if (query && data.length > 0)
        updateSearchCount(query, data[0]);

    }, 1100);

    return () => clearTimeout(timeID);
    
  }, [query]);

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <Image source={images.bg} style={styles.imageBackground}/>
      <FlatList
        data={movies} 
        style={{padding: 5}}
        renderItem={({item}) => <MovieCard {...item}/>}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{justifyContent: 'center', gap: 16, marginVertical: 16}}
        contentContainerStyle={{paddingBottom: 100}}
        ListHeaderComponent={ 
          <>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center'}}>
              <Image
                source={icons.logo} style={{width: 50, height: 50, resizeMode: 'contain', marginTop: 5}}
              />
            </View>
            <View style={{marginVertical: 5}}>
              <SearchBar placeholder='Search movies...' onPress={() => {}} value = {query} onChangeText={(text:string) => setQuery(text)} />
            </View>

            {loading && (
              <ActivityIndicator size='large' color='#0000ff' style={{marginVertical: 3}}/>
            )}

            {!loading && query.trim() && movies.length > 0 && (
              <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 10,}}>
                <Text style={{color: 'white'}}>Search Results for</Text>
                <Text style={{color: colors.accent, fontSize: 18}}>{query}</Text>
                
              </View>
            )

            }
          </>
        }
        ListEmptyComponent={
          <>
            {!loading ? (
              <View style={{marginTop: 10, paddingHorizontal: 5}}>
                <Text style={{textAlign: 'center', color: 'gray', fontWeight: 500}}>
                  {query.trim() ? 'No movies found' : 'Search for a movie'}
                </Text>
              </View>
            ) : null}
          </>
        }
      />
    </View>
  )
}

export default search

const styles = StyleSheet.create({
  imageBackground : {
    flex:1,
    zIndex: 0,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute'
  }
})