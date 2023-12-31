import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { auth, db } from '../../firebase/Config';
import PostEnProfile from '../PostEnProfile/PostEnProfile';


class Profile extends Component {
    constructor(){
        super()
        this.state={
            userPost: [],
            users: [],
        }
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let users = [];
                docs.forEach( doc => {
                    users.push({
                       id: doc.id,
                       data: doc.data()
                    })
                    this.setState({
                    users: users
                })
                })
            }
        )

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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
                    userPost: postsAMostrar
                })
            }
        )
    }

    logout(){
        auth.signOut()
        .then(() => {
            this.props.navigation.navigate('Login')
            console.log(auth.currentUser.email);
        })
        .catch(e => {console.log(e)})
    }

    render(){
        return(
            <View style={styles.contenedorPrin}>
            <Text style={styles.title}>Profile</Text>
            <View>
            <Text>Email:{auth.currentUser.email}</Text>
            <FlatList 
                    data= {this.state.users}
                    keyExtractor={ user => user.id }
                    renderItem={ ({item}) => <Text>Username: {item.data.userName}</Text> }
                />
            </View>
            <Text style={styles.textPost}>My posts</Text>

            {
                this.state.userPost.length === 0
                ?
                <Text>Cargando...</Text>
                :
                <FlatList 
                        data= {this.state.userPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <PostEnProfile posts = { item } /> }  /*hay que hacerlo renderizar */
                    />
            }
    
            <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: '26px',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    contenedorPrin: {
        flex: 1,
        borderRadius: 6,
        marginHorizontal: 20,
        marginVertical: 5
    },
    button: {
        backgroundColor: '#808080',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        marginTop: 16,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#000000',
    },
    textPost: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    }
})

export default Profile;