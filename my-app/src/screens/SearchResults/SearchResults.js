import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/Config';

class SearchResults extends Component {
    constructor(props){
        super(props)
        this.state={
            usersFiltrados:[],
            users: [],
            textoSearch: '',
            search: false,
        }
    }
    //Nos guardamos la informacion de todos los usuarios en dbUsers, y despues lo pasamos al state
    componentDidMount(){
        db.collection('users').onSnapshot(
            users => {
                let dbUsers = [];

                users.forEach( user => {
                    dbUsers.push(
                        {
                            id: user.id,
                            datos: user.data()
                        }
                    )
                })

                this.setState({
                    users: dbUsers
                })
            }
        )
    }

    //Vaya buscando palabra por palabra y encontrar los datos que coincidan con la palabra. De usuarios//
    buscarResultados(textoS){
        if (textoS === ''){
            this.setState({
                usersFiltrados: [],
                textoSearch: '',
                search: false
            })
        } else {
            let buscarResultados = this.state.users.filter((user)=> user.datos.email.toLowerCase().includes(textoS.toLowerCase()))
            this.setState({
                usersFiltrados: buscarResultados,
                textoSearch: textoS,
                search: true
            })
        }
    }

    entrarProfile(item){
        if(item.datos.email === auth.currentUser.email){
            this.props.navigation.navigate('Profile')
        } else {
            this.props.navigation.navigate('OtherProfile')
        }
    }

    render(){
        return(
            <View>
                <Text>Resultados</Text>
                <TextInput
                    onChangeText={textoS => this.buscarResultados(textoS)}
                    placeholder='Search user'
                    keyboardType='default'
                    value={this.state.textoSearch}>
                </TextInput>

                {
                    this.state.usersFiltrados.length === 0 && this.state.search === true ?
                    <Text> No hay resultados que coincidan</Text>
                    :
                    <FlatList
                    info = {this.state.usersFiltrados}
                    keyExtractor= {user => user.id.toString()}
                    renderItem= {({item}) => <Text onPress={()=> this.entrarProfile(item)}>{item.datos.email}</Text>}/>
                }
            </View>
        )
    }

}


export default SearchResults;