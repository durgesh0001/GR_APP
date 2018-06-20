import React from 'react';
import {TextInput,View,Dimensions,TouchableOpacity,Image } from 'react-native';
import {
    Content,
    Item,
    Input as InputText,
    Label,
    Icon,
    Text,
    Left,
    Right,
    Button as Btn
} from 'native-base';
import Camera from 'react-native-camera';
import { Button } from '../common'



/*
@Method : QrCodeScanner
@Params :
@Returns : *
*/
const QrCodeScanner =({children,isFlashActive,isSaveActive,qrcodeHeading,qrcode,onBarCodeRead,closeQr,onOffFlash,saveAndClose})=>
{
    /*
@Method : renderSaveAndClose
@Params :
@Returns : *
*/
     renderSaveAndClose = (isSaveActive,qrcode,saveAndClose)=>{
         if((qrcode) && (isSaveActive) ){
             return (
                 <View style={{height:40}}>
                     <Button onPress={saveAndClose} label="SAVE & CLOSE"  >
                         <Icon name="ios-document-outline" />
                     </Button>
                 </View>
             )
         }
     }

    /*
@Method : renderFlash
@Params :
@Returns : *
*/
     renderFlash=(isFlashActive,onOffFlash)=>{
         if(isFlashActive){
             return(
                 <TouchableOpacity  onPress={onOffFlash}  style={{width:28, height:28, color:'#ffffff', borderWidth:1, borderColor:'#fff', borderRadius:100, fontSize:15, justifyContent: 'center',
                     alignItems: 'center'}}    >
                     <Image source={require("../../images/vecv/flash_on.png")}  style={{width:15, height:15}} />
                 </TouchableOpacity>
             ) ;
         }
         else{
             return(
                 <TouchableOpacity  onPress={onOffFlash}   style={{width:28, height:28, color:'#ffffff', borderWidth:1, borderColor:'#fff', borderRadius:100, fontSize:15, justifyContent: 'center',
                     alignItems: 'center'}}   >
                     <Image source={require("../../images/vecv/flash_off.png")} style={{width:15, height:15}}  />
                 </TouchableOpacity>
             ) ;
         }
      }


    return (
        <View  style={styles.container}>
            <Camera
                style={styles.preview}
                onBarCodeRead={onBarCodeRead}
                ref={cam => this.camera = cam}
                flashMode={1}
                torchMode={isFlashActive}
                type={Camera.constants.Type.back}
                aspect={Camera.constants.Aspect.fill}
            >
            </Camera>

            <View style={{position:'absolute',top:0, left:0, height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>

                <View style={{flex:1, padding:15 }}>
                    <View style={{flexDirection:'row', height:30}}>
                        <Icon name="md-close" onPress={closeQr} style={{width:28, height:28, color:'#ffffff', borderWidth:1, borderColor:'#fff', borderRadius:100, fontSize:15, textAlign:'center',paddingTop:6}} />
                        <Text style={{color:'#ffffff', width:'85%', textAlign:'center', fontSize:18}} >{qrcodeHeading}</Text>
                        {renderFlash(isFlashActive,onOffFlash)}
                    </View>
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}>
                            <View style={styles.rectangleColor} />
                            <View style={styles.topLeft} />
                            <View style={styles.topRight} />
                            <View style={styles.bottomLeft} />
                            <View style={styles.bottomRight} />
                        </View>
                    </View>
                    <View style={{padding:15, justifyContent: 'flex-end'}}>
                        {children}
                        {renderSaveAndClose(isSaveActive,qrcode,saveAndClose)}
                    </View>
                </View>

            </View>
        </View>
    )

}

export {QrCodeScanner};

const styles = {
    container: {
        flex: 1, position:'relative',
    },
    preview: {
        flex: 1
    },
    containerBackgroundColor: {
        backgroundColor: '#fbfbfe'
    },
    customHeaderStyle:{
        backgroundColor:'transparent',elevation: 0,
        shadowOpacity:0,borderBottomWidth:0
    },
    rectangleContainer: {
       width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        height:200

    },
    rectangle: {
        borderLeftColor: 'rgba(255, 255, 255, .0)',
        borderRightColor: 'rgba(255, 255, 255, .0)',
        borderTopColor: 'rgba(255, 255, 255, .0)',
        borderBottomColor: 'rgba(255, 255, 255, .0)',
        borderLeftWidth: 5,
        borderRightWidth:5,
        borderTopWidth: 5,
        borderBottomWidth:5,
        width:180
    },
    rectangleColor: {
        height: 180,
        width: 180,
        backgroundColor: 'transparent'
    },
    topLeft: {
        width: 50,
        height: 50,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        position: 'absolute',
        left: -5,
        top: -5,
        borderLeftColor: '#00c1f6',
        borderTopColor: '#00c1f6'
    },
    topRight: {
        width: 50,
        height: 50,
        borderTopWidth: 5,
        borderRightWidth: 5,
        position: 'absolute',
        right: -5,
        top: -5,
        borderRightColor: '#00c1f6',
        borderTopColor: '#00c1f6'
    },
    bottomLeft: {
        width: 50,
        height: 50,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        position: 'absolute',
        left: -5,
        bottom: -5,
        borderLeftColor: '#00c1f6',
        borderBottomColor: '#00c1f6'
    },
    bottomRight: {
        width: 50,
        height: 50,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        position: 'absolute',
        right: -5,
        bottom: -5,
        borderRightColor: '#00c1f6',
        borderBottomColor: '#00c1f6'
    }
}