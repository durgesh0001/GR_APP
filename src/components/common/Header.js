
import React from 'react';
import {
    Header,
    Left,
    Button,
    Body,
    Title,
    Icon,
    Right,
    Item,
    Text,
    Input,
    Drawer
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {ImageBackground,StatusBar,Image,View} from 'react-native';



/*
@Method : HeaderComponent
@Params :
@Returns : *
*/

const HeaderComponent =({isHome,label,onPress,isBackActive,isSettingActive=false,isSearchActive=false,isHeight=false,children})=>
{

renderLogo=()=>
{
    return(
        <Image source={require("../../images/vecv/Dashboard/logo.png")} style={{width:150,height:26}}   />
    )

}

    if(isHome){
          return(
            <ImageBackground source={require('../../images/vecv/Dashboard/dashboard_header.png')} style={{textAlign:'center', resizeMode: 'contain', height:135,  justifyContent: 'flex-start'}}>
                <Header span androidStatusBarColor="#E62F32"  style={{ backgroundColor: "transparent",elevation: 0,shadowOpacity:0,borderBottomWidth:0 }}  searchBar rounded>

                    <Left style={{ flex: 1, justifyContent: 'flex-start'}}>
                       {renderBackOrMenuButton(onPress,isBackActive,isSettingActive)}
                    </Left>
                    <Body style={{ flex: 3, alignItems: 'center', width:'80%',}}>
                    <View style={{ alignItems:'center', position:'relative',top:15}}>
                    {renderLogo()}
                    <Text style={{fontSize:14, color:'#cccccc', paddingBottom:0,paddingTop:10}}>Distributor Code </Text>
                    <Text style={{fontSize:25, color:'#ffffff'}}>VECV101025</Text>
                    </View>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {children}
                    </Right>
                </Header>

            </ImageBackground>
        );

    }

    else if(isHeight)
    {
        return(
            <ImageBackground source={require('../../images/vecv/Dashboard/dashboard_header.png')} style={styles.headerStyleWithHeight}>
                <Header  androidStatusBarColor="#E62F32"  style={{ backgroundColor: "transparent",elevation: 0,shadowOpacity:0,borderBottomWidth:0}}  searchBar rounded>

                    <Left style={{ flex: 1 }}>
                        {renderBackOrMenuButton(onPress,isBackActive,isSettingActive)}
                    </Left>
                    <Body style={{ flex: 3,  justifyContent: 'center', alignItems: 'center' }}>
                    <Title  style={styles.titleStyle} >
                        {label}
                    </Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {children}
                    </Right>
                </Header>

            </ImageBackground>
        );
    }
    else
    {
        return(
            <ImageBackground source={require('../../images/vecv/Dashboard/dashboard_header.png')} style={styles.headerStyle}>
                <Header androidStatusBarColor="#E62F32" style={{ backgroundColor: "transparent",elevation: 0,shadowOpacity:0,borderBottomWidth:0}}  searchBar rounded>

                    <Left style={{ flex: 1 }}>
                        {renderBackOrMenuButton(onPress,isBackActive,isSettingActive)}
                    </Left>
                    <Body style={{ flex: 3,  justifyContent: 'center', alignItems: 'center' }}>
                    <Title  style={styles.titleStyle} >
                        {label}
                    </Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {children}
                    </Right>
                </Header>

            </ImageBackground>
        );
    }


}

/*
@Method : renderSettingIcon
@Params :
@Returns : *
*/
const renderSettingOrSearchIcon=(isSettingActive,isSearchActive)=>
{
    if(isSettingActive)
    {
        return(
            <Button transparent >
                <Icon name="settings" />
                <Text>   </Text>
            </Button>
        ) ;
    }
    else if(isSearchActive)
    {
        return(
            <Button transparent >
                <Icon name="search" />
                <Text>   </Text>
            </Button>
        ) ;

    }
    else
    {

    }

}
/*
@Method : renderBackOrMenuButton
@Params :<Icon name='ios-menu'></Icon>
@Returns : *
*/
const renderBackOrMenuButton=(onPress,isBackActive)=>
{
    if(isBackActive)
    {
            return(
                <Button  large transparent onPress={()=>{
                    Actions.pop();
                }}>
                    <Icon name='ios-arrow-back'></Icon>
                    <Text>   </Text>
                </Button>
            ) ;
    }
    else
    {
        return(
            <Button large style={{paddingTop:20}} transparent onPress={onPress}>
                <Image  source={require("../../images/vecv/Dashboard/dashboard_menu.png")}   />
                <Text>   </Text>
            </Button>
        ) ;
    }

}


export {HeaderComponent};

const styles = {
    headerStyle:{
        // backgroundColor:'#E62F32',
        textAlign:'center',
        resizeMode: 'contain'
    },
    headerStyleWithHeight:{
        // backgroundColor:'#E62F32',
        textAlign:'center',
        resizeMode: 'contain',
        paddingBottom:30
    },
    titleStyle : {
        textAlign:'center'
    }
};
