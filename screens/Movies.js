
import React, { useState, useEffect } from "react";
import { Text,StyleSheet,View,SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MovieCard from "../components/MovieCard";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "../services/api";

const Movies = ({ navigation }) => {
  const [movieShowData, setMovieShowData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("popularMovies");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [selectedOption, currentPage]);

  const fetchData = async () => {
    try {
      let response;
      switch (selectedOption) {
        case "popularMovies":
          response = await getPopularMovies(currentPage);
          break;
        case "nowPlayingMovies":
          response = await getNowPlayingMovies(currentPage);
          break;
        case "topRatedMovies":
          response = await getTopRatedMovies(currentPage);
          break;
        case "upComingMovies":
          response = await getUpcomingMovies(currentPage);
          break;
        default:
          break;
      }

      if (currentPage === 1) {
        setMovieShowData(response.results.slice(0, 10)); 
        setTotalPages(response.total_pages);
      } else {
        setMovieShowData((prevData) => [...prevData, ...response.results]);
      }
    } catch (error) {
      console.error(`Error fetching movies (${selectedOption}, Page ${currentPage}):`, error);
    }
  };
  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
    setCurrentPage(1); 
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleShowAll = () => {
   
    setMovieShowData((prevData) => {
      const allResults = (currentPage === 1) ? movieShowData : prevData;
      return allResults.slice(0, 10);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => handleOptionChange(itemValue)}
        >
          <Picker.Item label="Popular" value="popularMovies" />
          <Picker.Item label="Now Playing" value="nowPlayingMovies" />
          <Picker.Item label="Top Rated" value="topRatedMovies" />
          <Picker.Item label="Upcoming" value="upComingMovies" />
        </Picker>

        <FlatList
          data={movieShowData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              popularity={item.popularity}
              releaseDate={item.release_date}
              poster_path={item.poster_path}
              onPress={() =>
                navigation.navigate("DetailScreen", {
                  title: item.title,
                  popularity: item.popularity,
                  releaseDate: item.release_date,
                  poster_path: item.poster_path,
                  overview: item.overview,
                })
              }
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <View style={{ marginVertical: 10 }}>
              {currentPage < totalPages ? (
                <TouchableOpacity onPress={handleLoadMore}>
                  <Text style={styles.button}>Load More</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleShowAll}>
                  <Text style={styles.button}>Show All</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: 'lightblue',
  },
});

export default Movies;

