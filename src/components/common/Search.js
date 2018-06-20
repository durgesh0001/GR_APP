import React from 'react';
import {TextInput,View, Image } from 'react-native';
import {
    Content,
    Item,
    Input as InputText,
    Label,
    Icon
} from 'native-base';

const Search =({label,onFocus,multiline,isShadow,numberOfLines,iconName,value,onChangeText,placeholder,secureTextEntry,isSubmitted=false,isDisabled=false})=>
{
  if(isShadow)
    {
        return(
            <Item   error={(value == '' && isSubmitted == true)}
                  success={(!(value == '') && isSubmitted == true)}
                  style={{ elevation: 2,marginBottom:3,shadowOpacity:0,backgroundColor:'#fff', borderRadius:6, paddingLeft:15, paddingRight:15}}
            >
                <InputText onFocus={onFocus}    multiline={multiline} numberOfLines={numberOfLines} blurOnSubmit={false} placeholder={label} disabled={isDisabled} secureTextEntry={secureTextEntry}  autoCorrect={false}  value={value} onChangeText={onChangeText} maxLength={30}  placeholderTextColor="#949dac" style={{color:"#949dac"}} />
               
                <Image source={require("../../images/vecv/Dashboard/new_gr_search.png")}   />

            </Item>
        );
    }
    else
    {
        return(
            <Item   error={(value == '' && isSubmitted == true)}
                  success={(!(value == '') && isSubmitted == true)}
                  style={{ elevation: 2,marginBottom:3,shadowOpacity: 0.3,backgroundColor:'#fff'}}
            >
                <InputText onFocus={onFocus}    multiline={multiline} numberOfLines={numberOfLines} blurOnSubmit={false} placeholder={label} disabled={isDisabled} secureTextEntry={secureTextEntry}  autoCorrect={false}  value={value} onChangeText={onChangeText} maxLength={30}  placeholderTextColor="#949dac" style={{color:"#949dac"}} />
               <Image source={require("../../images/vecv/Dashboard/new_gr_search.png")}   />

            </Item>
        );
    }


}

export {Search};
