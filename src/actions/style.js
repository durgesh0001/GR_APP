//Style File
import {  Dimensions } from "react-native";

const deviceWidthFordropDown = Dimensions.get("window").width;

export const inputShadow = {
	elevation: 2,
	marginBottom:3,
	shadowOpacity: 0.5
}

export const centerAlign = {
   paddingTop:20,
   justifyContent: 'center',
   alignItems: 'center',
}

export const formStyle = {
	paddingLeft:15,
    paddingRight:15,
    formInputs:{
        marginBottom:15
    }

}


export const dropdownPickerForDevice = {
	color:"#949dac",
	width:deviceWidthFordropDown - 65
}

export const dropdownPicker = {
    color:"#949dac"
}