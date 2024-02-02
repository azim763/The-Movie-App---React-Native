import Movies from "../screens/Movies"
import SearchResults from '../screens/SearchResults'
import TvShows from '../screens/TvShows'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const TabNavigator = ()=>{
    return(
<Tab.Navigator>
    <Tab.Screen name="Movies" component={Movies} options={{headerShown:false}}/>
    <Tab.Screen name="Search Results" component={SearchResults}  options={{headerShown:false}}/>
    <Tab.Screen name="Tv Shows" component={TvShows}  options={{headerShown:false}} />

</Tab.Navigator>
    )
}

export default TabNavigator;