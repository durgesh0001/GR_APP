import React from 'react';
import {TextInput,View,Image } from 'react-native';
import {
    Content,
    Item,
    Input as InputText,
    Label,
    Icon,
    Text
} from 'native-base';

const EmailInput =({label,value,onChangeText,placeholder,secureTextEntry,isSubmitted=false,isDisabled=false,onFocus="",onBlur=""})=>
{

    /*
@Method : renderError
@Params : email
@Returns : *
*/
    renderError = (isSubmitted,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <View style={{flex:1,paddingLeft:30}}>
                    <Text note style={{color:'red'}}>Distributor Code is required</Text>
                </View>
            )
        }
    }

    /*
  @Method : validateEmail
  @Params : email
  @Returns : *<Icon  name='ios-person-outline' style={{color:"#999999",marginLeft:5, fontSize:30}}/>
  */
    validateEmail = (email) => {
        // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // return re.test(email);
        return false;
    };

    return(
           <View style={{flex:1,overflow:"visible"}}>
            <Item style={{marginBottom:3,shadowOpacity: 0,backgroundColor:'#fff', paddingLeft:5,paddingRight:5}}   error={(value == '' && isSubmitted == true)}
                  success={(!(value == '') && isSubmitted == true)} >
                <Image source={require("../../images/vecv/Login/login_user.png")}    />
                <InputText  onFocus={onFocus} onBlur={onBlur} disabled={isDisabled} placeholder={label} secureTextEntry={secureTextEntry}  autoCorrect={false}   value={value} onChangeText={onChangeText} maxLength={45} keyboardType="email-address" placeholderTextColor="#949dac" style={{color:"#949dac", marginTop:5}} />
            </Item>
               {renderError(isSubmitted,value)}
           </View>
    );

}

export {EmailInput};
