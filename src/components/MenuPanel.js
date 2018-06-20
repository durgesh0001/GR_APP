import React, { Component } from 'react';
import {StyleSheet,View,Image,TouchableHighlight,Animated,LayoutAnimation,UIManager,Platform} from 'react-native';
import {Icon,CardItem,Right,Body,Left,Text} from 'native-base';
import {onSelectedIdChanged} from "../actions";
import { connect } from 'react-redux';

class MenuPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            title       : props.title,
            iconVal       : props.iconVal,
            expanded    : false,
            animation   : new Animated.Value()
        };

    }

    /*
@Method : componentWillUpdate
@Params :
@Returns : *
*/
    componentWillUpdate()
    {
        LayoutAnimation.spring();
    }



    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });
        if((this.props.title == this.props.selected) && (this.props.selected !='') ){
            let blank ="";
            this.props.onSelectedIdChanged(blank)
        }
        else{
            this.props.onSelectedIdChanged(this.props.title)

        }

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event) {
       if (!this.state.maxHeight) {
         this.setState({
           maxHeight: event.nativeEvent.layout.height,
           animation: new Animated.Value(event.nativeEvent.layout.height),
         });
       }
     }

     _setMinHeight(event) {
       if (!this.state.minHeight) {
         this.setState({
           minHeight: event.nativeEvent.layout.height,
           animation: new Animated.Value(event.nativeEvent.layout.height),
         });
       }
     }

          renderHeaderItem(icon){
          if(this.props.title == "Inbound GR"){
            return (
                    <TouchableHighlight
                    style={styles.button}
                    onPress={this.toggle.bind(this)}
                    underlayColor="#fff">
                    <CardItem style={{backgroundColor:'#fff',border:0,paddingLeft:18,paddingTop:18,paddingBottom:18,  flexDirection: 'row',justifyContent: 'space-between'}} onLayout={this._setMinHeight.bind(this)} >
                        <View style={{flexDirection:"row",color:"#134286", alignItems: 'flex-start'}}>
                            <Image style={{marginRight:10}} source={require("../images/vecv/SideMenu/side_menu_inbound_gr_selected.png")}  />

                            <Text style={{paddingLeft:0,color:"#134286", fontSize:16}}>{this.state.title}</Text>
                        </View>
                        <Icon name={icon} style={{paddingLeft:15, color:"#134286", alignSelf: 'flex-end'}} />
                    </CardItem>
                </TouchableHighlight>

                );
               }
          else if(this.props.title == "Outbound Order"){

            return (

                    <TouchableHighlight
                    style={styles.button}
                    onPress={this.toggle.bind(this)}
                    underlayColor="#fff">
                        <CardItem style={{backgroundColor:'#fff',border:0,paddingLeft:18,paddingTop:18,paddingBottom:18,  flexDirection: 'row',justifyContent: 'space-between'}} onLayout={this._setMinHeight.bind(this)} >
                            <View style={{flexDirection:"row",color:"#134286", alignItems: 'flex-start'}}>
                                <Image style={{marginRight:10}} source={require("../images/vecv/SideMenu/side_menu_outbound_order_selected.png")}  />

                                <Text style={{paddingLeft:0,color:"#134286", fontSize:16}}>{this.state.title}</Text>
                            </View>
                            <Icon name={icon} style={{paddingLeft:15, color:"#134286", alignSelf: 'flex-end'}} />
                        </CardItem>
                </TouchableHighlight>

                );  
        }
    
     }

     renderChildrenData(){

         if(this.props.title == this.props.selected)
         {
             return (
                 <View style={styles.body}>
                     {this.props.children}
                 </View>
             )
         }

     }

    render(){
        let icon = 'ios-arrow-forward-outline';

        if(this.props.title == this.props.selected)
        {
            icon = 'ios-arrow-down-outline';

        }
        else{
            icon = 'ios-arrow-forward-outline';

        }


        return (
            <View
                style={styles.container}>
                {this.renderHeaderItem(icon)}
                {this.renderChildrenData()}

            </View>
        );
    }
}

var styles = StyleSheet.create({

    container : {
        backgroundColor: '#fff',
        margin:-2,
        borderWidth: 2,
        borderWidth: 2,
        borderRadius: 0,
        borderColor: 'transparent',
        overflow:'hidden',
    },
    iconStyle : {
        color : '#E62F32',
        marginRight : 1,
        marginTop : 18,
        fontSize: 25
    },
    titleContainer : {
        flexDirection: 'row',
        marginTop : -2
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#E62F32',
        fontWeight:'bold',
        marginTop : -2
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        paddingTop  : 0
    },
    list_container: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 4,
        margin:3,
        padding:10,
        backgroundColor : '#f4f7f9',
        paddingTop : 30,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,.2)'
      },
      list_item: {
        fontSize: 15,
      },
      list_header: {
        margin:10,
        marginTop:20,
        marginLeft:10,
        fontSize: 16,
        color:'#949dac',
        //fontWeight:'500'

            },
      list_sub_header: {
        fontSize: 17,
        fontWeight :'bold',
      },
});

const mapStateToProps = ({home}) => {

    const {selected} = home
    return {selected}
};
export default connect(mapStateToProps, {
    onSelectedIdChanged
})(MenuPanel);

