import React, { Component } from "react";
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/Config';

class SearchUsers extends Component {
    constructor(props){
        super(props)
        this.state={
            usersFiltrados:[],
            users: [],
            mailDeUsers: [],
            textoSearch: "",
            search: false,
        }
    }
    //Nos guardamos la informacion de todos los usuarios en dbUsers, y despues lo pasamos al state
    componentDidMount(){
        db.collection('users').onSnapshot(
            (res) => {
                let dbUsers = [];

                res.forEach( (user) => {
                    dbUsers.push(
                        {
                            id: user.id,
                            data: user.data()
                        }
                    )
                });
                this.setState({
                    users: dbUsers,
                })
            }
        )
    }

    //Vaya buscando palabra por palabra y encontrar los datos que coincidan con la palabra. De usuarios//
    buscarResultados(textoS){
        this.setState({
            usersFiltrados: this.state.users.filter((user)=>
                user.data.userName.toLowerCase().includes(textoS.toLowerCase())),
            mailDeUsers: this.state.users.filter((user)=>
                user.data.owner.toLowerCase().includes(textoS.toLowerCase())),
                search: true,
                textoSearch: textoS,
        })
    }

    //tenemos que hacer que se elimine el historial una vez que completamos el campo, actualizamos los valores

    render(){
        return(
            <View style={styles.mainContainer}>
                <Text style= {styles.title}>Buscador</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Busca al usuario que desees'
                    keyboardType='default'
                    onChangeText={textoS => this.buscarResultados(textoS)}
                    value={this.state.textoSearch}>
                </TextInput>

                {
                    this.state.usersFiltrados.length === 0 && this.state.search === true && this.state.mailDeUsers.length === 0 ?
                    (<Text> No hay resultados que coincidan</Text>)
                    : (
                    <FlatList
                    data= {this.state.usersFiltrados}
                    keyExtractor= {user => user.id.toString()}
                    renderItem= {({item}) =>(
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Profile', {mail: item.data.owner })} >
                        <View>
                        <Text>Nombre de usuario:</Text>
                        <Text>{item.data.userName}</Text>
                        </View>
                        </TouchableOpacity>)}
                    />,
                    <FlatList
                    data= {this.state.mailDeUsers}
                    keyExtractor={user => user.id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('OtherProfile', { mail: item.data.owner })}>
                        <View>
                        <Text>Email:</Text>
                        <Text>{item.data.owner}</Text>
                        </View>
                        </TouchableOpacity>)}
                    />)
                }
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
    input:{
        height:20,
        width: 475,
        alignSelf: 'center',
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
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
})

export default SearchUsers;