import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text, StyleSheet } from "react-native";
import { SearchBar } from '@rneui/themed';
import { searchMovies, searchMulti, searchTV } from "../services/api";
import MovieCard from "../components/MovieCard";
import { Button } from "@rneui/base";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native"

const SearchResults = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState("searchMovies");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (selectedOption) {
          case "searchMovies":
            response = await searchMovies(searchText);
            break;

          case "searchMulti":
            response = await searchMulti(searchText);
            break;

          case "searchTV":
            response = await searchTV(searchText);
            break;
          default:
            break;
        }
        setSearchResult(response.results);
      } catch (error) {
        console.error(`Error fetching movies (${searchText}):`, error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
  };

  const handleSearch = () => {
    const fetchData = async () => {
      try {
        let response;
        switch (selectedOption) {
          case "searchMovies":
            response = await searchMovies(searchText);
            break;

          case "searchMulti":
            response = await searchMulti(searchText);
            break;

          case "searchTV":
            response = await searchTV(searchText);
            break;
          default:
            break;
        }
        setSearchResult(response.results);
      } catch (error) {
        console.error(`Error fetching movies (${searchText}):`, error);
      }
    };

    fetchData();
  };

  return (
    <SafeAreaView>
      <View style={{ margin: 20 }}>
        <Text style={{}}>
          Search Movie/Tv Show Name
        </Text>
        <SearchBar
          placeholder="i.e. James Bond, CSI"
          value={searchText}
          onChangeText={(newText) => setSearchText(newText)}
          style={styles.searchbarstyle}

        />
        <Text>Choose Search Type*</Text>
      </View>

      <View style={styles.pickerstyle}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => handleOptionChange(itemValue)}
          style={{ width: 240 }}
        >
          <Picker.Item label="Movies" value="searchMovies" />
          <Picker.Item label="Multi" value="searchMulti" />
          <Picker.Item label="TV" value="searchTV" />
        </Picker>
        <Button

          onPress={handleSearch}
        >
          Search
        </Button>

      </View>
      {searchResult.length === 0 && (
        <Text style={styles.search_result}>Please initiate a search</Text>
      )}
      <FlatList
        data={searchResult}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            popularity={item.popularity}
            releaseDate={item.release_date}
            poster_path={item.poster_path}  
            onPress={() => navigation.navigate("DetailScreen", {
              title: item.title,
              popularity: item.popularity,
              releaseDate: item.release_date,
              poster_path: item.poster_path,
              overview: item.overview,
            })}
          />
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  pickerstyle: { flexDirection: "row", 
  justifyContent: "space-between",
   margin: 20 
  },
  search_result: { fontSize: 30, 
    textAlign: "center", 
    marginTop: 50 
  },
  searchbarstyle:{ backgroundColor: "white" ,
padding: "2"
}
});
export default SearchResults;
