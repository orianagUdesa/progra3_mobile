import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from '../../screens/Home/Home';
import PostForm from '../../screens/postForm/postForm';
import Profile from '../../screens/MiPerfil/Profile';
import SearchResults from '../../screens/SearchResults/SearchResults';

const Tab = createBottomTabNavigator();

function Menu (){

    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={ { headerShown: false } }/>
            <Tab.Screen name='New Post' component={PostForm} options={ { headerShown: false } }/>
            <Tab.Screen name= 'Profile' component={Profile} options={{ headerShown: false}} />
            <Tab.Screen name= 'SearchResults' component={SearchResults} options={{ headerShown: false}} />
        </Tab.Navigator>
    )
}

export default Menu;