import axios from 'axios';
import { APP_KEY as API_KEY, BASE_URL as API_BASE_URL, ACCESS_TOKEN as API_ACCESS_TOKEN } from '../config/ApiConfig';

const apiKey = API_KEY;
const baseUrl = API_BASE_URL;

const createUrl = (endpoint, queryParams) => {
  const params = new URLSearchParams({
    api_key: apiKey,
    ...queryParams,
  });
  return `${baseUrl}${endpoint}?${params.toString()}`;
};

const createAuthHeader = () => ({
  Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  'Content-Type': 'application/json', 
});


/********* Movies API ***********/
export const getNowPlayingMovies = async (page = 1) => {
  const url = createUrl('/movie/now_playing', { page });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};

export const getUpcomingMovies = async (page = 1) => {
  const url = createUrl('/movie/upcoming', { page });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};

export const getPopularMovies = async (page = 1) => {
  const url = createUrl('/movie/popular', { page });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};

export const getTopRatedMovies = async (page = 1) => {
  const url = createUrl('/movie/top_rated', { page });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};


/********* Search Movies API ***********/
export const searchMovies = async (query) => {
  const url = createUrl('/search/movie', { query });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};

export const searchMulti = async (query) => {
  const url = createUrl('/search/multi', { query });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};

export const searchTV = async (query) => {
  const url = createUrl('/search/tv', { query });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};

/********* TV Shows API ***********/

export const getOnTheAirTV = async (page = 1) => {
  const url = createUrl('/tv/on_the_air', { page });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};

export const getAiringTodayTV = async (page = 1) => {
  const url = createUrl('/tv/airing_today', { page });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};

export const getTopRatedTV = async (page = 1) => {
  const url = createUrl('/tv/top_rated', { page });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};

export const getPopularTV = async (page = 1) => {
  const url = createUrl('/tv/popular', { page });
  const response = await axios.get(url, { headers: createAuthHeader() });
  return response.data;
};
