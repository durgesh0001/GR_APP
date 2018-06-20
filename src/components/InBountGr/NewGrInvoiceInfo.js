import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container,Fab,Body,Input,Header,Icon,Content,Right,Left,Text,Card,CardItem,List,Item,ListItem} from 'native-base';
import {HeaderComponent,Spinner,Autocomplete,Search,Button,QrCodeScanner,ConfirmDelete,ConfirmUpdate,ConfirmSubmit} from '../common';
import {SideNavigationBar} from '../SideMenu';
import {setScanList,saveToDraft,saveForSubmit,getQrDetails,getInvoice,getOutwardDetails,getSearchInvoiceDetails} from '../../actions';
import ListItemView from './ListItem';
import {ListView,View,ImageBackground,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Dimensions,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {centerAlign} from '../../actions/style';
import { Col, Row, Grid } from "react-native-easy-grid";
import {showToast} from "../../actions/types";
import  Camera from 'react-native-camera';




class NewGrInvoiceInfo extends Component {
    state = {qrcodeHeadingData:"",isflashShow:0,isbarCodemenuActive:false,menuActive: false,isSearchClicked:false,searchText:"",data: [],query:"",invoiceUri:""};

    constructor(props) {
        super(props);
        this.state = {
            qrcode: '',
            scannedData:[]
        }
        this.state.isflashShow = 0;
        this.state.isConfirmSubmitShow = false;
        this.state.isConfirmUpdateShow = false;
    }

    onBarCodeRead = (e) => {
        let QrStr = e.data;
        let resQrAfterSplit = QrStr.split("#");
        if(resQrAfterSplit.length == 9){
                this.props.getQrDetails(resQrAfterSplit[3],(response)=>{
                this.setState({qrcode: response});
            });
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
    createDataSource({invoiceDataInfo})
    {

        const ds = new ListView.DataSource({
            rowHasChanged:(r1,r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(invoiceDataInfo);
    }
    /*
@Method : renderRow
@Params :
@Returns : *
*/
    renderRow(invoiceInfo)
    {
        return (
            <ListItemView invoiceInfo={invoiceInfo}  />
        );
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
            <HeaderComponent label="New GR" onPress={this.onSideMenuChange.bind(this)} isBackActive={true} isSearchActive={false} isSettingActive={false} isHeight={true}/>
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
        let filteredDevices = this.props.invoiceDataInfoTemp.filter(invoice => {
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
                <Search isShadow={true} placeholder="Name" label="Item Search" iconName="ios-search-outline"
                       onChangeText={this.onSearch.bind(this)} value={this.state.query}
                       isSubmitted={this.state.isSubmitted}/>
            </View>
        );


    }

    /*
@Method : renderAutocomplete
@Params :
@Returns : *
*/
    renderInvoiceInfo(){
        return (
            <CardItem style={{paddingTop:15, paddingBottom:15, backgroundColor:'#f3f3f3'}}>
                <Body>
                <Text style={{color:'#003d7d',fontWeight:'500', fontSize:20}}>{this.props.invoiceId}</Text>
                </Body>
                <Right>
                    <Text style={{color:'#999999', fontSize:14}}>Item Count : {this.props.invoiceDataInfo.length}</Text>
                </Right>
            </CardItem>

        );

    }

    /*
@Method : renderData
@Params :
@Returns : *
*/

    renderData()
    {
        if(this.props.invoiceDataInfo.length >0)
        {
            return(
                <Content bounces={false} style={{marginTop:-25}}>
                 <View style={{}}>
                    {this.renderSearch()}
                 </View>
                    {this.renderInvoiceInfo()}
                    <List style={{backgroundColor:'#f3f3f3'}}>
                        {this.renderListViewData()}
                    </List>
                </Content>
            )
        }
        else if((this.props.invoiceDataInfoTemp.length >0) && (this.props.invoiceDataInfo.length == 0))
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
        if(this.props.invoiceDataInfo.length >0){
            qrHeaderTemp = `GR Scan Count:0/${this.props.invoiceDataInfo[0].totalInvoice}`

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
@Method : onPressDraft
@Params :
@Returns : *
*/
    onPressDraft(){
        if(this.state.scannedData.length > 0){
            this.props.saveToDraft(this.props.invoiceId,this.state.scannedData,()=>{
                this.setState({isConfirmUpdateShow:true});

            })
        }
    }

    /*
@Method : onPressSubmit
@Params :
@Returns : *
*/
    onPressSubmit(){
        this.props.saveForSubmit(()=>{
            this.setState({isConfirmSubmitShow:true});

        })
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
                       
                        <Button onPress={this.onPressDraft.bind(this)} label="SAVE AS DRAFT" >
                         <Image style={{height:17, width:17, marginRight:-3}}  source={require("../../images/vecv/Dashboard/search_gr_save_draft.png")}   />
                       </Button>
                        </Left>
                        <Right style={{flex:1}}>
                            
                            <Button onPress={this.onPressSubmit.bind(this)} label="SUBMIT" >
                         <Image style={{height:17, width:17, marginRight:-3}}  source={require("../../images/vecv/Dashboard/search_gr_submit.png")}   />
                       </Button>
                        </Right>
                    </CardItem>
        );
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
        let state = this.state;
        if(state.isflashShow){
            state.isflashShow = 0;
        }
        else{
            state.isflashShow = 1;
        }
        this.setState(state);
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
                    <Text style={{fontSize:14, color:'#999999'}}>{this.state.qrcode.ConnectCode}</Text>
                    <Text style={{color:'#000000'}}>{this.state.qrcode.Name}</Text>
                </Left>
                <Right style={{textAlign:'left'}}>
                    <Text style={{fontSize:14, paddingTop:12, color:'#999999'}}>{this.state.qrcode.PartDescp}</Text>
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
        this.setState({isbarCodemenuActive:false,qrcode:""});
        let {invoiceDataInfoTemp} = this.props;
        let i =0;
        for(i=0;i<invoiceDataInfoTemp.length;i++ ){
            if(i == 2){
                let scannnedDataTemp = this.state.scannedData;
                scannnedDataTemp.push(invoiceDataInfoTemp[3]);
                this.setState({
                    scannedData:scannnedDataTemp
                })
            }
            if(invoiceDataInfoTemp[i].PartCd == this.state.qrcode.PartCode){
                invoiceDataInfoTemp[i].PartCdScanCount = invoiceDataInfoTemp[i].PartCdScanCount + 1;
            }
        }
        this.props.setScanList(invoiceDataInfoTemp);
        showToast("success","Record saved successfully");
    }
    /*
@Method : onAccept
@Params :
@Returns : *
*/
    onAccept(){
        this.setState({
            isConfirmSubmitShow:false,
            isConfirmUpdateShow:false

        })
    }

    /*
@Method : renderConfirmSubmit
@Params :
@Returns : *
*/
    renderConfirmSubmit(){
        return (
            <ConfirmSubmit visible={this.state.isConfirmSubmitShow} onAccept={this.onAccept.bind(this)}/>
        )
    }

    /*
@Method : renderConfirmUpdate
@Params :
@Returns : *
*/
    renderConfirmUpdate(){
        return (
            <ConfirmUpdate visible={this.state.isConfirmUpdateShow} onAccept={this.onAccept.bind(this)} />
        )
    }
    /*
@Method : render
@Params :
@Returns : *
*/

    render() {
        if(this.state.isbarCodemenuActive){
            return (
                <QrCodeScanner saveAndClose={this.saveAndClose.bind(this)} isFlashActive = {this.state.isflashShow} isSaveActive={true} qrcodeHeading={this.state.qrcodeHeadingData} onBarCodeRead={this.onBarCodeRead}
                               qrcode={this.state.qrcode} onOffFlash={this.onOffFlash.bind(this)} closeQr={this.closeQr.bind(this)} >
                    {this.renderQrCodeData()}
                </QrCodeScanner>
            )
        }
        else{
            return (
                    <Container style={styles.containerBackgroundColor}>
                        {this.renderHeader()}
                        {this.renderData()}
                        {this.renderScanQrButton()}
                        {this.renderActions()}
                        {this.renderConfirmSubmit()}
                        {this.renderConfirmUpdate()}
                    </Container>
            );
        }

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
    const {loading,invoiceDataInfo,invoiceData,invoiceDataInfoTemp} = home;

    return {loading,invoiceData,invoiceDataInfo,invoiceDataInfoTemp};
};

export default connect(mapStateToProps, {setScanList,saveToDraft,saveForSubmit,getQrDetails,getInvoice,getOutwardDetails,getSearchInvoiceDetails})(NewGrInvoiceInfo);

