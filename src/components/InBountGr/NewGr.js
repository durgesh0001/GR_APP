import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container,Fab,Body,Input,Header,Icon,Content,Right,Text,Card,Button,CardItem,List,Item,ListItem} from 'native-base';
import {HeaderComponent,Spinner,Autocomplete} from '../common';
import {SideNavigationBar} from '../SideMenu';
import {getInvoice,getOutwardDetails,saveHistory} from '../../actions';
import ListItemView from './ListItem';
import {ListView,View,ImageBackground,TouchableOpacity,TouchableWithoutFeedback,Keyboard, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {centerAlign} from '../../actions/style';




class NewGr extends Component {
    state = {menuActive: false,isSearchClicked:false,searchText:"",data: [],query:"",invoiceUri:""};

    constructor(props) {
        super(props);
        this.onTyping = this.onTyping.bind(this);
    }

    /*
@Method : onTyping
@Params :
@Returns : *
*/
    onTyping(text) {
        if(text){
            const invoiceTemp = this.props.invoiceData.filter(filterData =>
                filterData.Inv.toLowerCase().startsWith(text.toLowerCase())
            ).map(filterData => filterData.Inv);

            this.setState({ data: invoiceTemp });
        }
        else{
            this.setState({ data: [] });

        }
        this.setState({query:text});
    }


    /*
@Method : onSelect
@Params :
@Returns : *
*/

    onSearch() {
        if(this.state.query){
            this.props.getOutwardDetails(this.state.query);
        }
    }

    /*
@Method : componentWillMount
@Params :
@Returns : *
*/
    componentWillMount()
    {
        this.props.getInvoice();
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
                <HeaderComponent label="New GR" onPress={this.onSideMenuChange.bind(this)} isBackActive={false} isSearchActive={false} isSettingActive={false} isHeight={true}/>
            )
    }

    /*
@Method : renderSearchItem
@Params :
@Returns : *
*/
    renderSearchItem(item){
        return (
              <CardItem style={styles.listItemStyle}>
                    <Body>
                    <TouchableOpacity onPress={()=>{
                        Keyboard.dismiss();
                        this.setState({query:item,data:[]});
                        this.props.getOutwardDetails(item);

                    }}>
                    <Text style={{color:'black'}}>{item}</Text>
                    </TouchableOpacity>
                    </Body>
                    {/*<Right>*/}
                        {/*<TouchableOpacity onPress={()=>{*/}

                        {/*}}>*/}
                           {/*<Icon name='md-close'></Icon>*/}
                        {/*</TouchableOpacity>*/}

                    {/*</Right>*/}
                </CardItem>

        );



    }



    /*
@Method : renderAutocomplete
@Params :
@Returns : *
*/
    renderAutocomplete(){
        return(
          <View style={{paddingLeft:15,paddingRight:15, flex:1,justifyContent: 'space-between', flexDirection:"row"}}>
            <Item
                  style={styles.autoCompleteItemStyle}
            >
                <Autocomplete placeholder={"Invoice No."} inputContainerStyle={{margin:0,height:50,border:0, borderRadius:6, backgroundColor:'#fff'}}
                    data={this.state.data} listContainerStyle={{position:'relative',maxHeight:250}}
                    defaultValue={this.state.query}
                    onChangeText={text => {
                        this.onTyping(text);
                    }}
                    renderItem={item => (
                        <View style={{flex:1}}>
                            {this.renderSearchItem(item)}
                        </View>
                    )}
                />
            </Item>
              <View style={{width:30, height: 30, position: 'absolute',right:30,top: 11, zIndex:1025}}>
                  <TouchableOpacity onPress={this.onSearch.bind(this)}>
                    <Image source={require("../../images/vecv/Dashboard/new_gr_search.png")}   />
                  </TouchableOpacity>
              </View>
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
        if(this.props.loading){
            return(
                <Spinner size="large"/>
            )
        }
        else{
            return(
                <Content bounces={false} style={{marginTop:-25}} >
                    {this.renderAutocomplete()}
                </Content>
            )
        }
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
    containerBackgroundColor: {
        backgroundColor: '#f3f3f3'
    },
    customHeaderStyle:{
        backgroundColor:'transparent',elevation: 0,
        shadowOpacity:0,borderBottomWidth:0
    },
    listStyle:{

        marginRight:17
    },
    autoCompleteItemStyle:{
        zIndex:1024, width:'100%'
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

    }
}
const mapStateToProps = ({home}) => {
    let invoiceData=[];
    const {loading} = home;
    invoiceData = home.invoiceData;
    return {loading,invoiceData};
};

export default connect(mapStateToProps, {getInvoice,getOutwardDetails,saveHistory})(NewGr);

