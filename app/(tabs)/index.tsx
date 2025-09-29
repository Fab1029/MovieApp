import SearchBar from "@/components/SearchBar";
import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";


export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.homeContainer}> 
      <Image source={images.bg} style={styles.imageBackground}/>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}
        contentContainerStyle={{minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={styles.logoIcon}/>

        <View style = {{flex: 1, marginTop: 5}}>
          <SearchBar 
            placeholder= 'Search for a movie'
            onPress={() => router.push('/search')}
          />
        </View>

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
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  logoIcon: {
    width: 50,
    height: 50,
    marginTop: 30,
    resizeMode: 'contain',
    marginHorizontal: 'auto'
  }
})