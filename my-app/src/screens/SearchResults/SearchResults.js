import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/Config';

class SearchResults extends Component {
    constructor(props){
        super(props)
        this.state={
            usersFiltrados:[],
            todosUsers: [],
            textoSearch: ''
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot(
            usuarios => {
                let dbUsers = [];

                usuarios.forEach( user => {
                    dbUsers.push(
                        {
                            id: user.id,
                            datos: user.data()
                        }
                    )
                })

                this.setState({
                    todosUsers: dbUsers
                })
            }
        )
    }

    buscarResultados(textoSearch){
        this.state.todosUsers.forEach( user => {
            if (textoSearch.length==0){
                this.setState({
                    usersFiltrados: []
                })
            } else if (user.datos.owner.includes(textoSearch)){
                if(this.state.usersFiltrados.includes(user))
                {null}
                else{this.state.usersFiltrados.push(user)}
            }
        })
    }


    render(){
        return(
            <View>
                <Text>Resultados</Text>
                <TextInput
                    onChangeText={(text)=> (this.buscarResultados(text), this.setState({textoSearch: text}))}
                    placeholder='Search user'
                    keyboardType='default'
                    value={this.state.searchText}>
                </TextInput>
            </View>
        )
    }

}


export default SearchResults;