import React from 'react';
import {View,ActivityIndicator} from 'react-native';
import { Spinner as SpinnerComponent} from 'native-base';

const Spinner =({size})=>{

    return (
        <View style={styles.spinnerStyle}>
            <SpinnerComponent color='#E62F32' size={size ||'large'}/>
        </View>
    );
}
export {Spinner};
const styles ={
    spinnerStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
};