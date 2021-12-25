import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
/* import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' */
import HomeScreen from '../screens/Home/HomeScreen';
import SpendingBookScreen from '../screens/SpendingBook/SpendingBookScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import HealthScreen from '../screens/health/HealthScreen';
import TipsScreen from '../screens/tips/TipsScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import ReadPostScreen from '../screens/ReadPost/ReadPostScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';

// login
import StartScreen from '../screens/Start/StartScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPassword/ResetPasswordScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import Dashboard from '../screens/Dashboard';

import SearchFood from '../screens/Foods/SearchforFoods';

/* const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Categories' component={CategoriesScreen}/>
      <Stack.Screen name='Recipe' component={RecipeScreen}/>
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
    </Stack.Navigator>
  )
} */

const MainNavigator = createStackNavigator(
  {
  StartScreen: {
    screen: StartScreen, 
    navigationOptions: {
      header: null,
    },
  },
  LoginScreen: {
    screen: LoginScreen, 
    navigationOptions: {
      header: null,
    },
  },
  ResetPasswordScreen: {
    screen: ResetPasswordScreen, 
    navigationOptions: {
      header: null,
    },
  },
  RegisterScreen: {
    screen: RegisterScreen, 
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: {
    screen: Dashboard, 
    navigationOptions: {
      header: null,
    },
  },
    // Dashboard: Dashboard,
    Home: HomeScreen,
    Spending: SpendingBookScreen,
    Categories: CategoriesScreen,
    health: HealthScreen,
    tips: TipsScreen,
    Recipe: RecipeScreen,
    RecipesList: RecipesListScreen,
    ReadPost: ReadPostScreen,
    Ingredient: IngredientScreen,
    Search: SearchScreen,
    IngredientsDetails: IngredientsDetailsScreen,
    FoodSearch: SearchFood
  },
  {
    initialRouteName: 'StartScreen',
    // headerMode: 'float',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      }
    })
  }
); 

/* const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      drawerContent={props=> DrawerContainer}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} */

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);

/* export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} */
 
export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;