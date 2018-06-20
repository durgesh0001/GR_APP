import React,{Component} from 'react';
import {View,Modal,Dimensions, Image} from 'react-native';
import {Card,CardItem,Button,Text,Left,Right} from 'native-base';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const ConfirmSubmit =({children,visible,onAccept,onDecline})=>
{
    const {containerStyle,textStyle,cardSectionStyle} = styles;
    return (
        <Modal
            transparent
            presentationStyle={"fullScreen"}
            visible={visible}
            animationType="fade"
            onRequestClose={()=>{}}
        >
            <Card style={containerStyle}>
                <View style={{padding:20, height:265, alignItems:'center'}}>
                    <View style={cardSectionStyle}>
                        <Image source={require("../../images/vecv/Dashboard/confirm.png")}    />
                        <Text style={styles.popupTitle}>Submitted Successfully</Text>
                        <View style={{paddingTop:20, paddingLeft:20, paddingRight:20}}>
                            <Text>
                            GR has been Submitted Successfully
                            </Text>
                        </View>
                        <View style={{borderTopWidth:1, marginTop:20,backgroundColor:'#ccc', borderTopColor:'#cccccc', flexDirection:'row',width:'100%', alignItems:'center', justifyContent:'space-between', borderBottomLeftRadius:6, borderBottomRightRadius:6, height:50}}>
                            <Button style={{width:'100%',alignItems:'center',borderRadius:0,borderBottomLeftRadius:6, borderBottomRightRadius:6, justifyContent:'center',backgroundColor:'#ffffff', height:50}} transparent onPress={onAccept}><Text style={{textAlign:'center', color:'#444', fontSize:16}}>Ok</Text></Button>

                        </View>
                    </View>
                </View>
            </Card>
        </Modal>
    );
}
/*

*/

const styles = {
    cardSectionStyle:{
        justifyContent:'center',
        borderRadius:6,
        paddingTop:20, flexDirection:'column',
        backgroundColor:"#fff",alignItems:'center',textAlign:'center',width:300,backgroundColor:'#f7f7f7'
    },
    popupTitle:{
        fontSize:19,paddingTop:15, color:'#000000'
    },
    textStyle:{
        flex:1,
        fontSize:18,
        textAlign:'center',
        lineHeight:40

    },
    containerStyle:{
        backgroundColor:'rgba(0,0,0,.5)',
        flex:1,
        justifyContent:'center',alignItems:'center',
        height:deviceHeight,
        width:deviceWidth
    }

}
export {ConfirmSubmit};