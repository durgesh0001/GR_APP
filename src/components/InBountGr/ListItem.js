import React, {Component} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ListItem,CardItem, Text, Body, Right, Left, Button, Icon} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';



class ListItemView extends Component {

    /*
@Method : onRowPress
@Params :
@Returns : *
*/
    onRowPress() {

    }


    /*
@Method : render
@Params :
@Returns : *
*/

    render() {
        const {Ebelp,ConnectCode,Po,PartCd,PartCdScanCount,InDev,Inv,Scode,totalInvoice} = this.props.invoiceInfo;
        let Quantity = ""
        if(this.props.invoiceInfo.Quan){
            Quantity = parseInt(this.props.invoiceInfo.Quan);

        }
            return (
                 <View style={styles.listWrapperStyle}>
                    <CardItem style={styles.listItemStyle}>
                       <View style={{width:6, height:50,position:'absolute', left:-2}}>
                       <Image source={require("../../images/vecv/Dashboard/strip_yello.png")}   />
                       </View>
                        <Body>
                        <Text note>{PartCd}</Text>
                        <Text style={{color:'black', fontWeight:'500'}}>Not Found</Text>
                        </Body>
                        <Right>
                        <View style={{flex:1, flexDirection:'row', justifyContent: 'flex-end'}}>
                             <Text style={{color:'#f7c04b',fontSize:28}}>{PartCdScanCount}</Text>
                             <Text style={{color:'#999999',fontSize:15, paddingTop:14}}>/{Quantity}</Text>

                        </View>
                        </Right>
                    </CardItem>
                </View>
            );


    }
}

export default ListItemView;

const styles = {
    listWrapperStyle:{
       backgroundColor:'#f3f3f3',
        paddingLeft:15, flex:1,paddingRight:15,paddingBottom:10
    },
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    listItemStyle:{
        borderColor:'#fff',paddingTop:25,paddingBottom:25,borderRadius:6,paddingLeft:25, paddingRight:25, position:'relative',overflow:"hidden"

    },
    progressBardTextStyle:
        {
            color: '#E62F32'
        },
    textStyle: {
        fontWeight: 'bold'
    },
    progressStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBarBorderColor: '#E62F32'
}