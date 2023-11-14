import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList} from 'react-native';
import {db, auth} from "../../firebase/Config";
import Post from "../../Components/Post/Post"

class Home extends Component {
    constructor(){
        super()
        this.state={
            listaPost: [],
        }
    }
// apenas se ejecute la home, se carga component y trae los post
    componentDidMount(){
        //Traer datos
        db.collection('posts').onSnapshot(
            posteos => {
                let postsAMostrar = [];

                posteos.forEach( unPost => {
                    postsAMostrar.push(
                        {
                            id: unPost.id,
                            datos: unPost.data()
                        }
                    )
                })

                this.setState({
                    listaPost: postsAMostrar
                })
            }
        )
    }
    
    logout(){
        auth.signOut();
         //Redirigir al usuario a la home del sitio.
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View >
                <Text>Home mimi!</Text>
                <TouchableOpacity  onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <Text>Lista de Posts</Text>
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } /> }
                    />
                }
                
            </View>
        )
    }
}




export default Home;