import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container,Fab,Body,Input,Header,Icon,Content,Right,Left,Text,Card,CardItem,List,Item,ListItem} from 'native-base';
import {HeaderComponent,Spinner,Autocomplete,Search,Button,QrCodeScanner,ConfirmDelete} from '../common';
import {SideNavigationBar} from '../SideMenu';
import {getDraftDetails,getInvoice,getOutwardDetails,getSearchInvoiceDetails} from '../../actions';
import ListItemViewDraft from './ListItemGrDraft';
import {ListView,View,ImageBackground,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Dimensions,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {centerAlign} from '../../actions/style';
import { Col, Row, Grid } from "react-native-easy-grid";
import {showToast} from "../../actions/types";
import  Camera from 'react-native-camera';



class GrDraft extends Component {
    state = { qrcode:'',qrcodeHeadingData:"",isflashShow:false,isbarCodemenuActive:false,menuActive: false,isSearchClicked:false,searchText:"",data: [],query:"",invoiceUri:""};

    onBarCodeRead = (e) => {

        let QrStr = e.data;
        let resQrAfterSplit = QrStr.split("#");
        if(resQrAfterSplit.length == 9){
            this.setState({qrcode: resQrAfterSplit});
        }
        else{
            showToast("denger","Qr Code is no valid");
            this.setState({qrcode: ""});

        }
    }



    /*
@Method : componentWillMount
@Params :
@Returns : *
*/
    componentWillMount()
    {
        this.props.getDraftDetails();

        this.createDataSource(this.props);

    }
    /*
@Method : componentWillReceiveProps
@Params :
@Returns : *
*/

    componentWillReceiveProps(nextProps)
    {

        this.createDataSource(nextProps);
    }
    /*
@Method : createDataSource
@Params :
@Returns : *
*/
    createDataSource({invoiceDataDraftInfo})
    {

        const ds = new ListView.DataSource({
            rowHasChanged:(r1,r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(invoiceDataDraftInfo);
    }
    /*
@Method : renderRow
@Params :
@Returns : *
*/
    renderRow(invoiceInfo)
    {
        return (
            <ListItemViewDraft invoiceInfo={invoiceInfo} />
        );

    }

    /*
@Method : deleteDraft
@Params :
@Returns : *
*/

    deleteDraft(){
        this.setState({activeConfirmDelete:true})

    }



    /*
@Method : onSearch
@Params :
@Returns : *
*/

    onSearch(text) {
        this.setState({query:text});
        this.filter(text);
    }



    /*
@Method : onClose
@Params :
@Returns : *
*/
    onClose(){
        this.setState({menuActive:false});
    }

    /*
@Method : onSideMenuChange
@Params :
@Returns : *
*/
    onSideMenuChange() {
        this.setState({menuActive: true});
    }



    /*
@Method : renderHeader
@Params :
@Returns : *
*/
    renderHeader()
    {
        return(
            <HeaderComponent label="GR Draft" onPress={this.onSideMenuChange.bind(this)} isBackActive={false}
                             isSearchActive={false} isSettingActive={false} isHeight={true}/>
        )
    }

    /*
@Method : renderListViewData
@Params :
@Returns : *
*/
    renderListViewData() {
        if(this.props.loading)
        {
            return(
                <Spinner size="large"/>
            )
        }
        else
        {
            return (
                <ListView style={styles.listStyle} enableEmptySections
                          dataSource={this.dataSource}
                          renderRow={this.renderRow}
                />
            )
        }
    }

    /*
@Method : filter
@Params :
@Returns : *
*/
    filter(text)
    {
        let filteredDevices = this.props.invoiceDataDraftInfoTemp.filter(invoice => {
            if(!(invoice.PartCd == undefined))
            {
                return ((invoice.PartCd.indexOf(text) > -1)||((invoice.PartCd.toLowerCase().indexOf(text) > -1))||((invoice.PartCd.toUpperCase().indexOf(text) > -1))) ;
            }
            else
            {
                return {};
            }
        });
        this.props.getSearchInvoiceDetails({"search":filteredDevices});


    }



    /*
@Method : renderAutocomplete
@Params :
@Returns : *
*/
    renderSearch(){
        return(
            <View style={{paddingLeft:15,paddingRight:15}}>
                <Search isShadow={true} placeholder="Name" label="Search" iconName="ios-search-outline"
                        onChangeText={this.onSearch.bind(this)} value={this.state.query}
                        isSubmitted={this.state.isSubmitted}/>
            </View>
        );


    }

    /*
@Method : renderData
@Params :
@Returns : *
*/

    renderData()
    {
        if(this.props.invoiceDataDraftInfo.length >0)
        {
            return(
                <Content bounces={false} style={{marginTop:-25}}>
                    <View style={{}}>
                        {this.renderSearch()}
                    </View>
                    <List style={{backgroundColor:'#f3f3f3'}}>
                        {this.renderListViewData()}
                    </List>
                </Content>
            )
        }
        else if((this.props.invoiceDataDraftInfoTemp.length >0) && (this.props.invoiceDataDraftInfo.length == 0))
        {

            return(
                <Content bounces={false} style={{marginTop:-25}}>
                    <View style={{}}>
                        {this.renderSearch()}
                    </View>
                    {this.renderInvoiceInfo()}
                    <View style={centerAlign}>
                        <Text note>
                            No Record Found
                        </Text>
                    </View>
                </Content>
            )
        }

    }

    /*
@Method : renderScanQrButton
@Params :
@Returns : *
*/
    renderScanQrButton(){
        let qrHeaderTemp = "";
        if(this.props.invoiceDataDraftInfo.length >0){
            qrHeaderTemp = `GR Scan Count:0/${this.props.invoiceDataDraftInfo[0].totalInvoice}`

        }
        else{
            qrHeaderTemp = `GR Scan Count:0/0`

        }

        return (
            <CardItem style={{backgroundColor:'#f3f3f3',elevation:0, border:0, height:65}}>

                <Button label="SCAN QR" onPress={()=>{this.setState({isbarCodemenuActive:true,qrcodeHeadingData:qrHeaderTemp})}}>
                    <Image style={{height:17, width:17, marginRight:-3}}  source={require("../../images/vecv/Dashboard/search_gr_scan_qr.png")}   />
                </Button>
            </CardItem>
        );
    }

    /*
@Method : renderActions
@Params :
@Returns : *
*/
    renderActions(){

        return (
            <CardItem style={{backgroundColor:'#f3f3f3',elevation:0,border:0, flexDirection:'row'}}>
                <Left style={{flex:1}}>

                    <Button label="SAVE AS DRAFT" >
                        <Image style={{height:17, width:17, marginRight:-3}}  source={require("../../images/vecv/Dashboard/search_gr_save_draft.png")}   />
                    </Button>
                </Left>
                <Right style={{flex:1}}>

                    <Button label="SAVE AS DRAFT" >
                        <Image style={{height:17, width:17, marginRight:-3}}  source={require("../../images/vecv/Dashboard/search_gr_submit.png")}   />
                    </Button>
                </Right>
            </CardItem>

        )

    }

    /*
@Method : closeFlash
@Params :
@Returns : *
*/
    closeQr(){
        this.setState({isbarCodemenuActive:false,qrcode:""});
    }

    /*
@Method : onOffFlash
@Params :
@Returns : *
*/
    onOffFlash(){
        let flashValue = this.state.isflashShow;
        if(this.state.isflashShow){
            this.setState({isflashShow:false});
            //
            // flashValue =  this.state.isflashShow === Camera.constants.FlashMode.on
            //     ? Camera.constants.FlashMode.off : Camera.constants.FlashMode.off;


        }
        else{
            this.setState({isflashShow:true});

            // flashValue =  this.state.isflashShow === Camera.constants.FlashMode.off
            //     ? Camera.constants.FlashMode.on : Camera.constants.FlashMode.on;
        }

    }
    /*
@Method : renderQrCodeData
@Params :
@Returns : *
*/

    renderQrCodeData(){
        if(this.state.qrcode){
            return (
                <View style={{height:75, backgroundColor:'#fff', flexDirection:'row', borderRadius:5, marginBottom:15, padding:20, marginLeft:5, marginRight:5}}>
                    <Left style={{textAlign:'left'}}>
                        <Text style={{fontSize:14, color:'#999999'}}>{this.state.qrcode[3]}</Text>
                        <Text style={{color:'#000000'}}>{this.state.qrcode[2]}</Text>
                    </Left>
                    <Right style={{textAlign:'left'}}>
                        <Text style={{fontSize:14, paddingTop:12, color:'#999999'}}>{this.state.qrcode[7]}</Text>
                    </Right>
                </View>
            )
        }
    }
    /*
@Method : saveAndClose
@Params :
@Returns : *
*/
    saveAndClose(){
        this.setState({isbarCodemenuActive:false})
        showToast("success","Record saved successfully");

    }



    /*
@Method : render
@Params :
@Returns : *
*/

    render() {
            return (
                <SideNavigationBar isMenuActive={this.state.menuActive} onClose={this.onClose.bind(this)}>
                    <Container style={styles.containerBackgroundColor}>
                        {this.renderHeader()}
                        {this.renderData()}
                    </Container>
                </SideNavigationBar>
            );
    };
}

const styles = {
    container: {
        flex: 1, position:'relative',
    },
    preview: {
        flex: 1
    },
    containerBackgroundColor: {
        backgroundColor: '#f3f3f3'
    },
    customHeaderStyle:{
        backgroundColor:'transparent',elevation: 0,
        shadowOpacity:0,borderBottomWidth:0
    },
    listStyle:{

        marginRight:0
    },
    autoCompleteItemStyle:{
        zIndex:1024
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    listItemStyle:{
        borderBottomWidth:12,
        borderColor:'#fbfbfe'

    },
    rectangleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

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
        width:250
    },
    rectangleColor: {
        height: 200,
        width: 200,
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
const mapStateToProps = ({home}) => {
    const {loading,invoiceDataDraftInfo,invoiceData,invoiceDataDraftInfoTemp} = home;
    return {loading,invoiceData,invoiceDataDraftInfo,invoiceDataDraftInfoTemp};
};

export default connect(mapStateToProps, {getDraftDetails,getInvoice,getOutwardDetails,getSearchInvoiceDetails})(GrDraft);

