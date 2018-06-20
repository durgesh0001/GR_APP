import React from 'react';
import {View,Image,ImageBackground,Dimensions} from 'react-native';
import {Content,CardItem,Text,Container,Form} from 'native-base';
import {Card,AuthFooter} from './common';
const deviceHeight = Dimensions.get("window").height;


const NetWorkError =()=>
{

    return (
        <ImageBackground source={require('../images/network_error.jpg')} style={{flex:1,textAlign:'center', height:deviceHeight, justifyContent: 'center'}}>

        </ImageBackground>
    );

}

const styles = {
    containerBackgroundColor:{
        backgroundColor: '#fbfbfe'
    },
    headerStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        fontWeight:'bold'
    }
}

export {NetWorkError};
