import { View, Text, Image, StyleSheet } from "react-native";

const DetailScreen = ({ route }) => {
 const { title, popularity, poster_path, overview, releaseDate } = route.params;
  console.log("DetailScreen", route.params);
   const fullImagePath = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <View style={{alignItems:"center"}}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{ uri: fullImagePath }} />
      <Text style={styles.overview}>{overview}</Text>
      <Text style={styles.popularity}>Popularity: {popularity} | ReleaseDate: {releaseDate} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {

 marginTop:60,
 marginBottom:30,
    fontSize: 18,
    fontWeight: "bold",
  },
  overview: {
    fontSize: 12,
    width:300,
    marginBottom:30,
    marginTop:10,
  
  },
  popularity: {
    fontSize: 14,
    color: "gray",
  },
  image: {
    resizeMode: "contain",
    height: 300,
    width: 300,
  },
});

export default DetailScreen;
