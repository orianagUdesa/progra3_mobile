import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import { db, storage } from '../../firebase/Config';
import { TouchableOpacity,View, Text, StyleSheet, Image } from 'react-native';


class MyCamera extends Component{
    constructor(props){
        super(props)
        this.state = {
            permisos: false, //me brinda acceso al hardwaew habilitando el uso de la camara
            urlInternaFoto: '',
            mostrarCamara: true,
        }
        this.metodosDeCamara = '' //aca van las referencias a los metodos internos del componente camara, permite llamar a los metodos internos de la camara sin necesitar usar get element by y todo eso
    }

    componentDidMount(){
        //le pido los permisos
        Camera.requestCameraPermissionsAsync()
        .then(() =>{
            this.setState({
                permisos: true //nos va a dejar renderizar la camara
            })
        })
        .catch(e => console.log(e))
    }

    SacarFoto(){ //saca la foto, guarda la url en el estado, y despues esconde la camara para mostrarme lo que saque
        console.log('sacando foto')
        this.metodosDeCamara.takePictureAsync()//lo que consiga aca va a ir como parametro de la funcion de la linea de abajo de esta
        .then(photo =>{
            this.setState({
                urlInternaFoto: photo.uri, //ruta de la url en la computadora
                mostrarCamara: false,
            })
        })
        .catch(e => console.log(e))
    }

    guardarFoto(){
        fetch(this.state.urlInternaFoto)
        .then(res => res.blob()) //recupera datos binarios(foto), procesa la foto y guarda eso en image(agajo parametro de la funcion)
        .then(image =>{

            const ruta = storage.ref(`photos/${Date.now()}.jpg`)//si no existe la carpeta fotos la crea! que cree un nombre en base a la date de la pic (que guarde la pic ak)
            ruta.put(image)
            .then(()=> {
                ruta.getDownloadURL() //buscamos la url de guardado de la foto que posee firebase, en internet (para poder asociarla a un posteo)
                    .then(url => {
                        this.props.traerUrlDeFoto(url)
                        //aca guardo l;a url del poseeo en internet como un dato +
                        this.setState({
                            urlInternaFoto:''
                        })
                    })
            })
        })
        .catch(e => console.log(e))
    }

    render(){
        return(
            <View style={ styles.container}>
                {
                    this.state.permisos ? //si es verdadero:
                        this.state.mostrarCamara == false?
                        //preview de la foto
                        <React.Fragment>
                        <Image
                            source = {{uri: this.state.urlInternaFoto}}
                            style = { styles.cameraBody }
                        />
                        <TouchableOpacity onPress={()=> this.guardarFoto()}>
                        < Text>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Text>Cancelar</Text>
                        </TouchableOpacity>
                        </React.Fragment>

                        :
                        //camara.
                        <React.Fragment>
                            <Camera 
                            type= { Camera.Constants.Type.front}
                            ref = {metodosDeCamara => this.metodosDeCamara = metodosDeCamara} 
                            style = { styles.cameraBody }
                            /> 
                            <TouchableOpacity style = { styles.button } onPress={() => this.SacarFoto()}>
                                <Text>Sacar foto</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    : //si es falso
                    <Text>La camara no tiene permisos</Text>
                }


            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        //flex:1,
    },
    cameraBody: {
        flex:7
    },
    button:{
        flex:2,
    }
})


export default MyCamera;
