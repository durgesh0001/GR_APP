import React,{Component} from 'react';
import {View,Modal,Dimensions, Image} from 'react-native';
import {Card,CardItem,Button,Text,Left,Right} from 'native-base';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Confirm =({children,visible,onAccept,onDecline})=>
{
 const {containerStyle,textStyle,cardSectionStyle} = styles;
return (
  <Modal
  transparent
  presentationStyle={"fullScreen"}
  visible={visible}
  animationType="slide"
  onRequestClose={()=>{}}
  >
      <Card style={containerStyle}>
         <View style={{padding:20, height:265, alignItems:'center'}}>
            <View style={cardSectionStyle}>
            <Image source={require("../../images/vecv/Dashboard/warning.png")}    />
                <Text style={styles.popupTitle}>Tank Capacity(m3) </Text>
            <View style={{paddingTop:20, paddingLeft:20, paddingRight:20}}>
            {children}
          </View>
         <View style={{borderTopWidth:1, marginTop:20,backgroundColor:'#ccc', borderTopColor:'#cccccc', flexDirection:'row',width:'100%', alignItems:'center', justifyContent:'space-between', borderBottomLeftRadius:5, borderBottomRightRadius:5, height:50}}>
              <Button style={{width:'49.75%',alignItems:'center',borderRadius:0,borderBottomLeftRadius:6, justifyContent:'center',backgroundColor:'#ffffff', height:50}} transparent onPress={onAccept}><Text style={{textAlign:'center', color:'#444', fontSize:16}}>Apply</Text></Button>
              <Button style={{width:'49.75%',borderLeftColor:'#cccccc',borderRadius:0, borderBottomRightRadius:6,borderLeftWidth:5,alignItems:'center', justifyContent:'center', color:'#444',backgroundColor:'#ffffff', height:50}}  transparent onPress={onDecline}><Text style={{textAlign:'center', color:'#444', fontSize:16}}>Cancel</Text></Button>
          </View>
      </View>
      </View>
      </Card>
  </Modal>
);
}
/*
<View style={{borderTopWidth:1, marginTop:20,backgroundColor:'#ccc', borderTopColor:'#cccccc', flexDirection:'row',width:'100%', alignItems:'center', justifyContent:'space-between', borderBottomLeftRadius:6, borderBottomRightRadius:6, height:50}}>
              <Button style={{width:'100%',alignItems:'center',borderRadius:0,borderBottomLeftRadius:6, borderBottomRightRadius:6, justifyContent:'center',backgroundColor:'#ffffff', height:50}} transparent onPress={onAccept}><Text style={{textAlign:'center', color:'#444', fontSize:16}}>Apply</Text></Button>
             
          </View>
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
export {Confirm};