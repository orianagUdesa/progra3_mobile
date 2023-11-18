import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList, StyleSheet} from 'react-native';
import {db, auth} from "../../firebase/Config";
import Post from "../../Components/Post/Post"
import Profile from '../MiPerfil/Profile';

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
            <View style={styles.mainContainer}>
                <Text style={styles.title}>VSCO inspiration</Text>
                <Text>Posts</Text>
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Text>Cargando...</Text>
                    :
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post posts = { item } /> }
                    />
                }
                <TouchableOpacity  onPress={()=>this.logout()} style={styles.buttonLogout}>
                    <Text style={styles.textButtonLogout}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: '26px',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    mainContainer: {
        flex: 1,
        borderRadius: 6,
        marginHorizontal: 20,
        marginVertical: 5,
        flex: 1,
        backgroundColor: '#F7F7F7',
        padding: 20,
    },
    buttonLogout: {
        backgroundColor: '#87CEEB',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        marginTop: 16,
        alignSelf: 'flex-start',
    },
    textButtonLogout: {
        color: '#15297c',
        fontSize: 16,
    },
})


export default Home;