import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import DetailScreen from "../screens/DetailScreen";


const Stack = createStackNavigator(); 

const GlStack = ()=>{
    return(
<Stack.Navigator>
     <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerTitle:'Movies App', headerTitleAlign:"center",headerStyle:{backgroundColor:"grey"}}}/>
     <Stack.Screen name="DetailScreen" component={DetailScreen} />    

</Stack.Navigator>
    )
}

export default GlStack;