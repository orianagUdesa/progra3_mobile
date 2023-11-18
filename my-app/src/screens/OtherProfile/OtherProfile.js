import React, { Component } from 'react';
import { TextInput,View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { auth, db } from '../../firebase/Config';
//import PostEnProfile from '../PostEnProfile/PostEnProfile';
import Post from '../../Components/Post/Post';
import SearchResults from '../SearchResults/SearchResults';


class OtherProfile extends Component {
    constructor(){
        super()
        this.state={
            user: this.props.route.params.owner,
            results: [],
            arrayPost: [],
        }
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', auth.state.user).onSnapshot(
            docs =>{
                let users = [];
                docs.forEach( doc => {
                    users.push({
                       id: doc.id,
                       data: doc.data()
                    })
                    this.setState({
                    results: users
                })
                })
            }
        )

        db.collection('posts').where('owner', '==', this.state.user).onSnapshot(
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
                    arrayPost: postsAMostrar
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
                    data= {this.state.results}
                    keyExtractor={ item => item.id.toString() }
                    renderItem={ ({item}) }
                />
            </View>
            <Text>My posts</Text>
            <Text>
                {item.data.userName}, 
                {item.data.owner}     
            </Text>
            
            <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
            </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 'medium',
    },
    contenedorPrin: {
        flex: 1,
        borderRadius: 6,
        marginHorizontal: 20,
        marginVertical: 5
    }
})

export default OtherProfile;