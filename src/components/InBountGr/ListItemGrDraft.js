import React, {Component} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ListItem,CardItem, Text, Body, Right, Left, Button, Icon} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {getDraftDetails,getInvoice,getOutwardDetails,getSearchInvoiceDetails} from '../../actions';
import {ConfirmDelete} from '../common';
import {connect} from 'react-redux';


class ListItemViewDraft extends Component {
  state = {
    activeConfirmDelete:false,
    activeConfirmDeleteSucces:false
  }
    /*
@Method : onRowPress
@Params :
@Returns : *
*/
    onRowPress() {
        this.props.getOutwardDetails('0000001111');
      }

    /*
@Method : onClose
@Params :
@Returns : *
*/
    onCloseDelete(){
        this.setState({
            activeConfirmDelete:false,
            activeConfirmDeleteSucces:false
        });
    }

    /*
@Method : onAccept
@Params :
@Returns : *
*/
    onAccept(){
        this.setState({
            activeConfirmDelete:false,
            activeConfirmDeleteSucces:false
        });
     }

    /*
@Method : renderConfirmDelete
@Params :
@Returns : *
*/
    renderConfirmDelete(){
        return (
            <ConfirmDelete visible={this.state.activeConfirmDelete} onAccept={this.onAccept.bind(this)} onDecline={this.onCloseDelete.bind(this)} />
        );
     }


    /*
@Method : render
@Params :
@Returns : *
*/
    render() {
        const {Ebelp,ConnectCode,Po,PartCd,InDev,Inv,Scode,totalInvoice} = this.props.invoiceInfo;
        let Quantity = ""
        if(this.props.invoiceInfo.Quan){
            Quantity = parseInt(this.props.invoiceInfo.Quan);

        }
        return (
            <View style={{flex:1,zIndex:2}}>
            <TouchableOpacity onPress={()=>{
              this.onRowPress()
            }} style={styles.listWrapperStyle}>
                <CardItem style={styles.listItemStyle}>
                    <View style={{width:6, height:50,position:'absolute', left:-2}}>
                        <Image source={require("../../images/vecv/Dashboard/strip_yello.png")}   />
                    </View>
                    <Body>
                    <Text style={{color:'#134286', fontWeight:'500'}}>Not Found</Text>
                    <Text note>{PartCd}</Text>
                    </Body>
                    <Right>
                        <View style={{flex:1, flexDirection:'row', justifyContent: 'flex-end'}}>
                            <Text style={{color:'#f7c04b',fontSize:28}}>{0}</Text>
                            <Text style={{color:'#999999',fontSize:15, paddingTop:14}}>/{Quantity}</Text>
                            <Icon style={{color:'#999999',fontSize:20, paddingTop:14,paddingLeft:12}} name="ios-arrow-forward-outline"/>
                        </View>
                    </Right>
                </CardItem>
            </TouchableOpacity>
                <Icon name="md-close"  onPress={()=>{
                    this.setState({activeConfirmDelete:true});

                }}  style={{
                    position:'absolute',
                    top: -10,
                    right:0,width:28,height:28, color:'#999999',backgroundColor:"#fff", borderWidth:2, borderColor:'#fff', borderRadius:100, fontSize:15, textAlign:'center',paddingTop:6}}

                />
                {this.renderConfirmDelete()}
            </View>

        );
    }
}

const mapStateToProps = ({home}) => {
    const {loading,invoiceDataDraftInfo,invoiceData,invoiceDataDraftInfoTemp} = home;
    return {loading,invoiceData,invoiceDataDraftInfo,invoiceDataDraftInfoTemp};
};

export default connect(mapStateToProps, {getDraftDetails,getInvoice,getOutwardDetails,getSearchInvoiceDetails})
(ListItemViewDraft);



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
        position: "relative",
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