import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MovieCard from "../components/MovieCard";
import {getAiringTodayTV,  getOnTheAirTV,  getPopularTV,  getTopRatedTV,} from "../services/api";

const TvShows = ({ navigation }) => {
  const [tvShowData, setTvShowData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("airingToday");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [selectedOption, currentPage]);

  const fetchData = async () => {
    try {
      let response;
      switch (selectedOption) {
        case "airingToday":
          response = await getAiringTodayTV(currentPage);
          break;
        case "onTheAir":
          response = await getOnTheAirTV(currentPage);
          break;
        case "popular":
          response = await getPopularTV(currentPage);
          break;
        case "topRated":
          response = await getTopRatedTV(currentPage);
          break;
        default:
          break;
      }

      if (currentPage === 1) {
        setTvShowData(response.results.slice(0, 10)); // Display the 10 first movies on the first page
        setTotalPages(response.total_pages);
      } else {
        setTvShowData((prevData) => [...prevData, ...response.results]);
      }
    } catch (error) {
      console.error(`Error fetching TV shows (${selectedOption}, Page ${currentPage}):`, error);
    }
  };

  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
    setCurrentPage(1); // Reset current page when changing options
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleShowAll = () => {
    setTvShowData((prevData) => {
      const allResults = (currentPage === 1) ? tvShowData : prevData;
      return allResults;
    });
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => handleOptionChange(itemValue)}
      >
        <Picker.Item label="Airing Today" value="airingToday" />
        <Picker.Item label="On The Air" value="onTheAir" />
        <Picker.Item label="Popular" value="popular" />
        <Picker.Item label="Top Rated" value="topRated" />
      </Picker>

      <FlatList
        data={tvShowData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            title={item.name}
            popularity={item.popularity}
            releaseDate={item.first_air_date}
            poster_path={item.poster_path}
            overview={item.overview}
            onPress={() =>
              navigation.navigate("../screens/DetailScreen", {
                title: item.name,
                popularity: item.popularity,
                releaseDate: item.first_air_date,
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

export default TvShows;
