import React from 'react';
import {TextInput,View } from 'react-native';
import {
    Content,
    Item,
    Input as InputText,
    Label,
    Icon
} from 'native-base';
import DatePicker from 'react-native-datepicker'


const DatePickerInput =({label,onFocus,iconName,onDateChange,minDate,maxDate,value,onChangeText,placeholder,secureTextEntry,isSubmitted=false,isDisabled=false})=>
{


    return(
        <Content>
            <Item  style={{backgroundColor:'#fff', elevation: 2,marginBottom:3,shadowOpacity: 0.3,overflow:'hidden'}} rounded  error={(value == '' && isSubmitted == true)}
                  success={(!(value == '') && isSubmitted == true)} >
                <Icon  name={iconName}   style={{color:"#E62F32",marginLeft:5}} color="#E62F32"  />
                <DatePicker
                    style={{height:52,lineHeight:52,color:"#949dac"}}
                    date={value}
                    showIcon={false}
                    mode="date"
                    placeholder={placeholder}
                    format="YYYY-MM-DD"
                    minDate={minDate}
                    maxDate={maxDate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={onDateChange}
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                            color:"#E62F32"
                        },
                        dateInput: {
                            backgroundColor:'#fff',
                            marginRight: 50,
                            borderWidth:0,borderBottomWidth:0,
                            placeholderTextColor:"#949dac",
                            color:"#949dac",
                            paddingTop:10
                        },
                        placeholderText:{color:'#949dac',fontSize:16},
                        dateText:{color:'#949dac',fontSize:16}
                    }}

                />
            </Item>
        </Content>
    );

}

export {DatePickerInput};
