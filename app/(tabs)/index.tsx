import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { fetchMovies } from "../../services/api";


export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const loadMovies = async() => {
      const data = await fetchMovies('');
      setMovies(data);
    }
    loadMovies();
    setLoading(false);
  }, []);



  return (
    <View style={styles.homeContainer}> 
      <Image source={images.bg} style={styles.imageBackground}/>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}
        contentContainerStyle={{minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={styles.logoIcon}/>

        {loading ? (
          <ActivityIndicator 
            size='large'
            color='#0000ff'
            style={styles.loadingIndicator}
          />
        )
        : (
          <View style = {{flex: 1, marginTop: 5}}>
            <SearchBar 
              placeholder= 'Search for a movie'
              onPress={() => router.push('/search')}
              value=""
              onChangeText={() => {}}
            />
            <>
              <Text style={{color: 'white', fontSize: 16, marginVertical: 10, fontWeight: 800}}> Lastest Movies</Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard
                    {...item}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                scrollEnabled={false}

              />
            </>
          </View>
        )
      }

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  imageBackground: {
    flex:1,
    zIndex: 0,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute'
  },
  logoIcon: {
    width: 50,
    height: 50,
    marginTop: 30,
    resizeMode: 'contain',
    marginHorizontal: 'auto'
  },
  loadingIndicator: {
    marginTop: 10,
    alignSelf: 'center'
  }
})