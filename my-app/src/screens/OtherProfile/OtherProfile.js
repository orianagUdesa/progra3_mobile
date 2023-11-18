import React, { Component } from 'react';
import { TextInput,View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { auth, db } from '../../firebase/Config';



class OtherProfile extends Component {
    constructor(){
        super()
        this.state={
            user: item.autor,
            results: [],
            arrayPost: [],
        }
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', this.state.user).onSnapshot(
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
        console.log(this.state.results)

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
            <FlatList 
                    data= {this.state.results}
                    keyExtractor={ item => item.id.toString() }
                    renderItem={ ({item}) }
                />
            </View>
            <Text>
                {item.data.userName}, 
                {item.data.owner}     
            </Text>
            <Text>My posts</Text>
            <View>
                    <Text>cantidad de post { this.state.arrayPost.length}</Text>
                    <FlatList 
                        data= {this.state.arrayPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => 
                            <View>
                                <Post infoPost = { item } /> 
                            </View>
                            }
                    />
                   </View> 

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