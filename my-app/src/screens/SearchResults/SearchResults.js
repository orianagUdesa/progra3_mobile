import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/Config';

class SearchResults extends Component {
    constructor(props){
        super(props)
        this.state={
            usersFiltrados:[],
            users: [],
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
                    users: dbUsers
                })
            }
        )
    }

    /*buscarResultados(textoSearch){
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
    }*/

    buscarResultados(textoSearch){
        let listaNueva = []
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].datos.owner.includes(textoSearch) ) {
                // IF Para no duplicar usuarios en resultados:
                if(this.state.usersFiltrados.includes(this.state.users[i]))
                {null}
                else{listaNueva.push(this.state.users[i])}
            }
            if (textoSearch.length==0){
                nuevaLista = []
            }
        }
        this.setState({
            usersFiltrados: listaNueva
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
                    value={this.state.textoSearch}>
                </TextInput>

            </View>
        )
    }

}


export default SearchResults;