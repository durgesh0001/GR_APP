import React from 'react';
import {TextInput,View, Image } from 'react-native';
import {
    Content,
    Item,
    Input as InputText,
    Label,
    Icon,
    Button,
    Text
} from 'native-base';

const renderEyeIcon=(secureTextEntry,onEyeClick)=>
{
    if(onEyeClick == undefined)
    {

    }
    else
    {
        if(secureTextEntry)
        {
            return(
                <Button transparent onPress={onEyeClick} style={{position:'relative', top:5}}>
                    <Icon  name="eye"   style={{color:"#134286"}}   />
                </Button>
            )
        }
        else
        {
            return(
                <Button transparent onPress={onEyeClick} style={{position:'relative', top:5}}>
                    <Icon  name="eye-off"   style={{color:"#134286"}}   />
                </Button>
            )
        }
    }

}


/*
@Method : renderError
@Params : email
@Returns : *
*/
renderErrorPassword = (isSubmitted,isValid,value,isLengthMessageShow)=>
{
    if(isSubmitted && value=='')
    {
        return (
            <View style={{flex:1,paddingLeft:30}}>
                <Text note style={{color:'red'}}>Password is required</Text>
            </View>
        )
    }
    else if(isSubmitted && (!(isValid)))
    {
        if(isLengthMessageShow)
        {
            return (
                <View style={{flex:1,paddingLeft:30,paddingTop:5}}>
                    <Text note style={{color:'red'}}>Password should have minimum 6 Charcters, 1 caps,1small, 1 Special charcter, 1 number. </Text>
                </View>
            )
        }

    }

}

const Password =({label,iconName,isLengthMessageShow,oldPassword,onEyeClick,value,onChangeText,placeholder,secureTextEntry,isSubmitted=false,isDisabled=false,onFocus="",onBlur=""})=>
{

    /*
   @Method : validatePassword
   @Params : password<Icon  name="ios-lock-outline"   style={{color:"#999999",marginLeft:5, fontSize:30}}   />
   @Returns : *
   */
    validatePassword = (password) => {
        if(password){
            return true;

        }
        else{
            return false;

        }
    };

    if(oldPassword)
    {
        return(
            <View style={{flex:1}}>
                <Item  style={{marginBottom:3,shadowOpacity: 0,backgroundColor:'#fff', paddingLeft:5,paddingRight:5}}  error={(isSubmitted == true && !(validatePassword(value)) && (oldPassword != value))}
                      success={(isSubmitted == true && (validatePassword(value)) && (oldPassword == value))}>
                     <Image source={require("../../images/vecv/Login/login_password.png")}    />
                    <InputText    onFocus={onFocus} onBlur={onBlur} placeholderTextColor="#949dac"  placeholder={label} disabled={isDisabled} secureTextEntry={secureTextEntry}  autoCorrect={false}  value={value} onChangeText={onChangeText} maxLength={30} style={{marginTop:5}}  />
                    {renderEyeIcon(secureTextEntry,onEyeClick)}
                </Item>
                {renderErrorPassword(isSubmitted,validatePassword(value),value,isLengthMessageShow)}
            </View>
        );

    }
    else
    {
        return(
            <View style={{flex:1}}>
                <Item   style={{marginBottom:3,shadowOpacity:0,backgroundColor:'#fff', paddingLeft:5,paddingRight:5}} error={(isSubmitted == true && !(validatePassword(value)))}
                      success={(isSubmitted == true && (validatePassword(value)))}>
                    <Image source={require("../../images/vecv/Login/login_password.png")}    />
                    <InputText   onFocus={onFocus} onBlur={onBlur} placeholderTextColor="#949dac"  placeholder={label} disabled={isDisabled} secureTextEntry={secureTextEntry}  autoCorrect={false}  value={value} onChangeText={onChangeText} maxLength={30} style={{marginTop:5}}   />
                    {renderEyeIcon(secureTextEntry,onEyeClick)}
                </Item>
                {renderErrorPassword(isSubmitted,validatePassword(value),value,isLengthMessageShow)}
            </View>
        );

    }


}

export {Password};
