import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Left,Container,Fab,Body,Input,Header,Icon,Content,Right,Text,Card,Button,CardItem,List,Item,ListItem} from 'native-base';
import {HeaderComponent,Spinner,QrCodeScanner,Confirm} from '../common';
import {SideNavigationBar} from '../SideMenu';
import {getQrDetails,onSelectedIdChanged,getDevices,getSearchDeviceList,getUserDetails} from '../../actions';
import ListItemView from './ListItem';
import {ListView,View,TouchableOpacity,ImageBackground,Image, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {Grid,Col,Row} from 'react-native-easy-grid';
import firebase from 'firebase';
import {centerAlign} from '../../actions/style';
import {showToast} from "../../actions/types";
import {NativeModules} from 'react-native';


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

//
// import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
// import icoMoonConfig from './selection.json';
// const Icon = createIconSetFromIcoMoon(icoMoonConfig);






class Home extends Component {
    state = {isflashShow:0,qrcode:"",isbarCodemenuActive:"",qrcodeHeadingData:"",menuActive: false,isSearchClicked:false,isLoading:true,searchText:""};

    /*
@Method : constructor
@Params :
@Returns : *
*/
    constructor(props) {
        super(props);

        this.state.isflashShow = 0;
    }

    /*
@Method : componentWillMount
@Params :
@Returns : *
*/

    componentWillMount() {
        this.setState({isLoading:false})
        this.createDataSource(this.props);
        this.props.onSelectedIdChanged("Home");
    }




    /*
@Method : componentWillReceiveProps
@Params :
@Returns : *
*/

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }
    /*
@Method : createDataSource
@Params :
@Returns : *
*/
    createDataSource({homeData})
    {

        const ds = new ListView.DataSource({
            rowHasChanged:(r1,r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(homeData);
    }
    /*
@Method : renderRow
@Params :
@Returns : *
*/
    renderRow(device)
    {
        return (
            <ListItemView device={device} />
        );
    }

    /*
@Method : filter
@Params :
@Returns : *
*/
    filter(text)
    {
        let filteredDevices = this.props.homeDataTemp.filter(devices => {
            if(!(devices.tank_name == undefined))
            {
                return ((devices.tank_name.indexOf(text) > -1)||((devices.tank_name.toLowerCase().indexOf(text) > -1))||((devices.tank_name.toUpperCase().indexOf(text) > -1))) ;
            }
            else
            {
                return {};
            }
        });
        this.props.getSearchDeviceList({"search":filteredDevices});


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
@Method : removeInvalidChars
@Params :
@Returns : *
*/
    removeInvalidChars(text) {
        let newText = '';
        let numbers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';

        for (var i = 0; i < text.length; i++) {
            if ( numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }

        return newText;
    }


    /*
@Method : onChangeSearch
@Params :
@Returns : *
*/
    onChangeSearch(text)
    {
        if(text)
        {
            this.setState({searchText:this.removeInvalidChars(text)});
            this.filter(this.removeInvalidChars(text));

        }
        else
        {
            this.setState({searchText:""});
            this.props.getDevices();
        }
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
@Method : onRowPress
@Params :
@Returns : *
*/
    onRowPress(data) {
        if(data.device_id)
        {
            Actions.ViewDevice({deviceId:data.device_id});
        }
    }

    /*
@Method : convertDate
@Params :
@Returns : *
*/
    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }

    /*
@Method : formatAMPM
@Params :
@Returns : *
*/
    formatAMPM(date) {
        let deviceDate = this.convertDate((new Date(date)));
        let Today = this.convertDate((new Date()))
        if(deviceDate == Today)
        {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            let strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
        else
        {
            return deviceDate;
        }

    }

    /*
@Method : convertNumberToDetcimal
@Params :
@Returns : *
*/
    convertNumberToDetcimal(number)
    {
        if(parseFloat(number))
        {
            let numberTemp = parseFloat(number)/100;
            return numberTemp;
        }
        else
        {
            let numberTemp = 0;
            return numberTemp;
        }
    }

    /*
@Method : render
@Params :
@Returns : *
*/




    renderHeader()
    {
            return(
                <HeaderComponent isHome={true} label="Dashboard" onPress={this.onSideMenuChange.bind(this)} isBackActive={false} isSearchActive={this.props.homeData.length > 0} isSettingActive={false} isHeight={true} />

            )
    }

    /*
@Method : renderSearch
@Params :
@Returns : *
*/



    /*
@Method : renderData
@Params :
@Returns : *<Icon name="ios-download-outline" style={{fontSize:40,color:'#1fabf4'}} />
*/

    renderDataInBound()
    {
        return(
            <View bounces={false} style={{marginTop:0,flex:1,paddingottom:18}}>
               <View style={{paddingLeft:25, paddingRight:25, paddingTop:20}}>
                <View style={styles.whiteBoxWrapper}>
                    <Text style={{fontSize:26, fontWeight:'500', paddingTop:5, paddingBottom:20,color:'#000000'}}>
                        Inbound GR
                    </Text>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, paddingRight:25}}>
                            <Text style={{ fontSize:17, color:'#999999'}}>Today's GR</Text>
                            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                <Text style={{fontSize:28, fontWeight:'500', paddingTop:5, paddingBottom:20,color:'#000000'}}>50</Text>
                                <Image style={{marginTop:8}} source={require("../../images/vecv/Dashboard/dashboard_download.png")}   />
                            </View>
                        </View>

                        <View style={{flex:1, paddingLeft:25}}>
                            <Text style={{ fontSize:17, color:'#999999'}}>Draft</Text>
                            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                <Text style={{fontSize:28, fontWeight:'500', paddingTop:5, paddingBottom:20,color:'#000000'}}>50</Text>
                                <Image style={{marginTop:8}} source={require("../../images/vecv/Dashboard/dashboard_edit.png")}   />
                                
                            </View>
                        </View>

                    </View>
                </View>
                <Button onPress={()=>{
                    Actions.NewGrComponent();
                }} style={{borderBottomLeftRadius:15, width:'100%',flex:1, borderBottomRightRadius:15, backgroundColor:'#003d7d', borderColor:'#003d7d', height:48,flexDirection:'row',justifyContent: 'center'}}>
                    <Icon style={{marginRight:-3}} name="md-add"/>
                    <Text style={{marginLeft:-3, fontSize:16, fontWeight:'500'}}>ADD </Text>
                  </Button>
                  </View>
            </View>
        )
    }


    /*
@Method : renderDataOutBound
@Params :<Icon name="ios-create-outline" style={{fontSize:40,color:'#fcbc5d'}} />
@Returns : *
*/

    renderDataOutBound()
    {
        return(
            <View bounces={false} style={{marginTop:0,flex:1,paddingottom:18}}>
                <View style={{paddingLeft:25, paddingRight:25, paddingTop:20}}>
                    <View style={styles.whiteBoxWrapper}>
                        <Text style={{fontSize:26, fontWeight:'500', paddingTop:5, paddingBottom:20,color:'#000000'}}>
                            Outbound Order
                        </Text>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:1, paddingRight:25}}>
                                <Text style={{ fontSize:17, color:'#999999'}}>Today's Order</Text>
                                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                    <Text style={{fontSize:28, fontWeight:'500', paddingTop:5, paddingBottom:20,color:'#000000'}}>50</Text>
                                    <Image style={{marginTop:8}} source={require("../../images/vecv/Dashboard/dashboard_download.png")}   />
                                </View>
                            </View>

                            <View style={{flex:1, paddingLeft:25}}>
                                <Text style={{ fontSize:17, color:'#999999'}}>Draft</Text>
                                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                    <Text style={{fontSize:28, fontWeight:'500', paddingTop:5, paddingBottom:20,color:'#000000'}}>50</Text>
                                    <Image style={{marginTop:8}} source={require("../../images/vecv/Dashboard/dashboard_edit.png")}   />
                                </View>
                            </View>

                        </View>
                    </View>
                    <Button  style={{borderBottomLeftRadius:15, width:'100%',flex:1, borderBottomRightRadius:15, backgroundColor:'#003d7d', borderColor:'#003d7d', height:48,flexDirection:'row',justifyContent: 'center'}}>
                        <Icon style={{marginRight:-3}} name="md-add"/>
                        <Text style={{marginLeft:-3, fontWeight:'500'}}>ADD </Text>
                    </Button>
                </View>
            </View>
        )
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
@Method : onBarCodeRead
@Params :
@Returns : *
*/

    onBarCodeRead = (e) => {
        let QrStr = e.data;
        let resQrAfterSplit = QrStr.split("#");
        if(resQrAfterSplit.length == 9){
            this.props.getQrDetails(resQrAfterSplit[3],(response)=>{
                if(!response.RtlrName){
                    response.RtlrName = "N/A" ;
                }
                if((!(response.RetInvNo)) && !(response.RetInvDate)){
                    response.RetInvNo = "N/A" ;
                    response.RetInvDate = "N/A";
                }

                this.setState({qrcode: response});
            })
        }
        else{
            showToast("denger","Qr Code is no valid");
            this.setState({qrcode: ""});
        }
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
@Method : renderQrCodeData
@Params :
@Returns : *
*/

    renderQrCodeData(){
        if(this.state.qrcode){
            return (
        
                <View style={{height:240,fontSize:11, backgroundColor:'#fff', flexDirection:'row', borderRadius:5, marginBottom:15, padding:20, width:'100%'}}>
                    <Grid>

                        <Row >
                            <Col size={40}>
                                <Text style={{fontSize:10,color:'#000000'}}>Part No/Desc</Text>
                            </Col>
                            <Col size={60}>

                                <Text style={{fontSize:10,color:'#999999'}}>{this.state.qrcode.PartCode},{this.state.qrcode.PartDescp}</Text>
                            </Col>

                        </Row>

                        <Row >
                            <Col size={40}>
                        <Text style={{fontSize:10,color:'#000000'}}>Connect Code</Text>
                            </Col>
                            <Col size={60}>

                        <Text style={{fontSize:10,color:'#999999'}}>{this.state.qrcode.ConnectCode}</Text>
                            </Col>

                        </Row>

                        <Row>
                            <Col size={40}>
                                <Text style={{fontSize:10,color:'#000000'}}>Distributor Name</Text>
                            </Col>
                            <Col size={60}>

                                <Text style={{fontSize:10,color:'#999999'}}>{this.state.qrcode.Name}</Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col size={40}>
                                <Text style={{fontSize:10,color:'#000000'}}>Vecv Invoice No/Date</Text>
                            </Col>
                            <Col size={60}>
                                <Text style={{fontSize:10,color:'#999999'}}>{this.state.qrcode.VecvInvNo},{this.state.qrcode.VecvInvDate}</Text>
                            </Col>
                        </Row>


                        <Row>
                            <Col size={40}>
                                <Text style={{fontSize:10,color:'#000000'}}>Dist,GRN No/Date</Text>
                            </Col>
                            <Col size={60}>
                                <Text style={{fontSize:10,color:'#999999'}}>{this.state.qrcode.DCode}</Text>
                            </Col>
                        </Row>

                        <Row >
                            <Col size={40}>
                                <Text style={{fontSize:10,color:'#000000'}}>Retailer Billed To</Text>
                            </Col>
                            <Col size={60}>

                                <Text style={{fontSize:10,color:'#999999'}}>{this.state.qrcode.RtlrName}</Text>
                            </Col>
                        </Row>

                        <Row>
                            <Col size={40}>
                                <Text style={{fontSize:10,color:'#000000'}}>Retail Inv/Date</Text>
                            </Col>
                            <Col size={60}>

                                <Text style={{fontSize:10,color:'#999999'}}>{this.state.qrcode.RetInvNo},{this.state.qrcode.RetInvDate}</Text>
                            </Col>
                        </Row>
                    </Grid>
                </View>
            );
        }
    }


    /*
@Method : render
@Params :
@Returns : *
*/


    render() {
        if(this.props.loading)
        {
            return (
                <Spinner size="large"/>
            )
        }
        else
        {
            if(this.state.isbarCodemenuActive){
                return (
                    <QrCodeScanner isFlashActive = {this.state.isflashShow} isSaveActive={false}  qrcodeHeading={this.state.qrcodeHeadingData} onBarCodeRead={this.onBarCodeRead}
                                   qrcode={this.state.qrcode} onOffFlash={this.onOffFlash.bind(this)}
                                   closeQr={this.closeQr.bind(this)} >
                        {this.renderQrCodeData()}
                    </QrCodeScanner>
                )

            }
            else{
                return (
                    <SideNavigationBar isMenuActive={this.state.menuActive} onClose={this.onClose.bind(this)}>
                        <Container style={styles.containerBackgroundColor}>
                            {this.renderHeader()}
                            <Content  style={styles.bottomSectionHome}>
                            {this.renderDataInBound()}
                            {this.renderDataOutBound()}
                            <View style={{flex:1,height:25}}>
                            </View>
                            </Content>
                            <Fab
                                containerStyle={{ }}
                                style={{ backgroundColor: 'transparent' }}
                                position="bottomRight"
                                onPress={() =>  {
                                    this.setState({isbarCodemenuActive:true})

                                }}>
                                <Image source={require("../../images/vecv/Dashboard/info.png")}    />
                            </Fab>
                        </Container>
                    </SideNavigationBar>
                );
            }
        }
    };
}

const styles = {
    bottomSectionHome:{
        height:deviceHeight - 135.1,
        paddingBottom:50
    },
    whiteBoxWrapper:{
        backgroundColor:'#ffffff', paddingLeft:20, paddingRight:20, paddingTop:20, paddingBottom:10, borderTopLeftRadius:15, borderTopRightRadius:15,
        shadowColor: '#000000',
        shadowOffset: {
         width: 0,
         height: 3
        },
       shadowRadius: 5,
       shadowOpacity: 0.5,
       elevation: 7,
    },
    containerBackgroundColor: {
        backgroundColor: '#f3f3f3'
    },
    customHeaderStyle:{
        backgroundColor:'transparent',
        elevation: 0,
        shadowOpacity:0,borderBottomWidth:0
    },
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    listItemStyle:{
        borderWidth:8,
        borderColor:'transparent'

    },
    progressBardTextStyle:
        {
            color: '#E62F32'
        },
    textStyle: {
        color:'#000'
    },
    progressStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:7,
        paddingBottom:10
    },
    progressLinkIcon:{
        color:"#E62F32",
        fontSize:22
    },
    progressBarBorderColor: '#E62F32',
    progressBarBorderColorDenger: 'red',
}
const mapStateToProps = ({home}) => {
    let homeData =[];
    let homeDataTemp= [];
    let loading = true;
    loading = home.loading;
    return {loading, homeData,homeDataTemp};
};

export default connect(mapStateToProps, {getQrDetails,onSelectedIdChanged,getDevices,getSearchDeviceList,getUserDetails})(Home);
