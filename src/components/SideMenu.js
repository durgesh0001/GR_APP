import React from 'react';
import {View,TouchableOpacity,ScrollView,Alert,StatusBar,Dimensions,Image} from 'react-native';
import {Container,Thumbnail,Content,Icon,CardItem,Item,Card,Text,Header,Drawer,Button,Left,Right,Body} from 'native-base';
import {Menues} from './common';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import firebase from 'firebase';
import FCM from 'react-native-fcm';
import MenuPanel from './MenuPanel';

let deviceHeight = Dimensions.get("window").height;
deviceHeight = parseFloat(deviceHeight) - 632;
import {NativeModules} from 'react-native';


const SideNavigationBar =({children,isMenuActive,onSideMenuChange,onClose})=>
{
    const {currentUser} = firebase.auth();
    if(Actions.currentScene =="NewGrComponent" || Actions.currentScene =="GrDraft" ||  Actions.currentScene =="HomeComponent" || Actions.currentScene =="Home")
    {
        return (

            <Drawer
                type="displace"
                ref={(ref) => {
                    this._drawer = ref;
                }}
                open={isMenuActive}
                content={MenuComponent(currentUser)}
                side="left"
                panOpenMask={.25}
                onClose={onClose}
                captureGestures="open"
            >
                <Container>
                    {children}
                </Container>
            </Drawer>

        )
    }
    else
    {
        return (

            <Drawer
                type="displace"
                ref={(ref) => {
                    this._drawer = ref;
                }}
                open={false}
                side="left"
                panOpenMask={.25}
                content={MenuComponent(currentUser)}
                captureGestures="open"
            >
                <Container>
                    {children}
                </Container>
            </Drawer>

        )
    }
}


const renderProfile =()=>
{

        return (
            <Header span style={{backgroundColor: '#E62F32',

            }}>
                <CardItem style={{backgroundColor:'#E62F32'}} >
                    {this.renderLogo()}
                </CardItem>
            </Header>
        )

}

renderPicture=(currentUser)=>
{
    if(currentUser)
    {
        if(currentUser.photoURL)
        {
            return(
                <Thumbnail  source={{ uri: currentUser.photoURL }} />
            )
        }
        else
        {
            return(
                <Thumbnail source={require("../images/no_photo.jpg")} />
            )
        }
    }
}

renderLogo=()=>
{
    return(
        <Image source={require("../images/vecv/Dashboard/logo.png")} style={{width:150,height:26}}   />
    )

}

/*
@Method : odataLogout
@Params :
@Returns : *
*/
oDataLogout = (callback) => {
    NativeModules.OData.oDataLogout(callback);
}

const onRowPress=(val)=>{

    if(val)
    {
        if(val == "NewGrComponent"){
            Actions.NewGrComponent({type:"reset"});
        }
        else if(val == "HomeComponent"){
            Actions.Home({type:"reset"});
        }
        else if(val == "GrDraft"){
            Actions.GrDraft({type:"reset"});
        }
        else if(val == "Logout")
        {
            Alert.alert(
                'Logout',
                'Are you sure, you want to logout?',
                [
                    {text: 'No', onPress: () => console.log('Cancel Pressed')},
                    {text: 'Yes', onPress: () => {

                        oDataLogout((data) => {
                            if(data == 1)
                            {
                                Actions.Auth({type:'reset'});
                            }
                        })
                    }},
                ],
                { cancelable: false }
            )

        }

    }

}


const MenuComponent=(currentUser) => {
    return(
        <Container >
            <Content bounces={false} style={{overflow:"hidden",backgroundColor:'#fff'}}>
                {renderProfile()}

                {
                    _.map(Menues.menu,(val)=>{
                        return(
                            renderMenus(val.name,val.link,val.icon,val.submenu)
                        )
                    })
                }


            </Content>
        </Container>
    );
}

/*
@Method : renderSubMenu
@Params :
@Returns : *
*/
renderSubMenu=(name,submenu) =>
{
    return(
        _.map(submenu,(val,key) =>{
            if(Actions.currentScene == val.link)
            {
                return(
                    <TouchableOpacity key={key} style={TouchableLink} onPress={()=>{onRowPress(val.link,(Actions.currentScene == val.link))}}
                    >
                        <CardItem style={{backgroundColor:'#134286',borderWidth:0,borderRightWidth:0,borderRadius:0}}>
                            <Text >       </Text>
                            <Icon  name={val.icon}   style={{paddingLeft:5,color:"#fff"}}   />
                            <Text style={{color:'#fff', fontSize:18}}>{val.name}</Text>
                        </CardItem>

                    </TouchableOpacity>
                )

            }else{
                return(
                    <TouchableOpacity  key={key} style={TouchableLink} onPress={()=>{onRowPress(val.link,(Actions.currentScene == val.link))}}
                    >
                        <CardItem style={{backgroundColor:'#fff'}} >
                            <Text >       </Text>
                            <Icon  name={val.icon}   style={{paddingLeft:5, color:"#134286"}}   />
                            <Text style={{color:"#134286", fontSize:18}}>{val.name}</Text>
                        </CardItem>
                    </TouchableOpacity>
                )
            }
        })
    )
}

/*
@Method : renderMenus
@Params :
@Returns : *
*/
const renderMenus = (name,link,icon,submenu) => {
    if(_.isEmpty(submenu))
    {
        if(Actions.currentScene == link)
        {
            return(
                <TouchableOpacity key={name} style={TouchableLink} onPress={() => {
                    onRowPress(link,(Actions.currentScene == link));
                }}>
                    <CardItem style={{backgroundColor:'#134286',borderWidth:0,borderRightWidth:0,borderRadius:0}}>
                        <Icon  name={icon}   style={{marginRight:5,color:"#fff", width:30}}   />
                        <Text style={{color:'#fff', fontSize:16}}>{name}</Text>
                    </CardItem>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity key={name} style={TouchableLink} onPress={()=>{
                    onRowPress(link,(Actions.currentScene == link));
                }}>
                    <CardItem style={{backgroundColor:'#fff'}} >
                        <Icon  name={icon}   style={{marginRight:5, color:"#134286", width:30}}   />
                        <Text style={{color:"#134286", fontSize:16}}>{name}</Text>
                    </CardItem>
                </TouchableOpacity>
            )
        }
    }else{
        return(
            <MenuPanel  title={name} iconVal={icon}>
                <View key={name}>
                    {renderSubMenu(name,submenu)}
                </View>
            </MenuPanel>
        )
    }
}




const TouchableLink = {
    backgroundColor: '#fff'
}

export {SideNavigationBar};
