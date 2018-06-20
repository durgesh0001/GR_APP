import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Button as Btn,Content,Text,Icon} from 'native-base';

const Button =({onPress,label,children,iconName})=>
{
    return (
          <Btn  block  style={styles.butonStyle} onPress={onPress}>
              {children}
              <Text style={{marginLeft:-3, fontSize:15}}>
              {label}
              </Text>
          </Btn>
    );
}
export {Button};
const styles = {
    butonStyle:{
      flex:1,
      alignSelf:'stretch',
      backgroundColor:'#003d7d',
      borderWidth:1,
      borderColor:'#003d7d',
      marginLeft:5,
      marginRight:5,
      borderRadius:6, height:48
    }
};