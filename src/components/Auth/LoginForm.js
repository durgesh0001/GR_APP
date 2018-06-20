import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {ImageBackground,View,ScrollView,Keyboard, Dimensions,Image} from 'react-native';
import {Geolocation,Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {emailChanged, passwordChanged,loginUser, resetForm, facebookLogin,phoneChanged} from '../../actions';
import {Button,Password, Input, Spinner,AuthFooter,EmailInput} from "../common";
import {Right,CardItem,Card, Form, Button as ButtonNative, Content,Container, Label,Text, Header, Title} from 'native-base';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import {NativeModules} from 'react-native';

class LoginForm extends Component {
    state = {isLoaded: null,isEmailVerified:false, validationError: '',secureTextEntry:true, isSubmitted: false,showFooter:true};
    constructor(props) {
        super(props);
    }


    /*
@Method : getOdataLoginStatus
@Params :
@Returns : *
*/
    getOdataLoginStatus = (callback) => {
        NativeModules.OData.getOdataLoginStatus(callback);
    }

    /*
       @Method : componentWillMount
       @Desc   : will check that user is logged in or not
       @Params :
       @Returns : *
       */
    componentWillMount() {
        this.props.resetForm();
        if(Platform.OS === 'android')
        {
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
        }
        this.getOdataLoginStatus((data) => {
            this.setState({isLoaded:true});
            if(data == 1)
            {
                Actions.Home();
            }
        })
    }



    /*
@Method : componentWillUnmount
@Desc   :
@Params :
@Returns : *
*/
    componentWillUnmount () {
        if(Platform.OS === 'android')
        {

                this.keyboardDidShowListener.remove();
                this.keyboardDidHideListener.remove();
        }
    }

    /*
@Method : _keyboardDidShow
@Desc   :
@Params :
@Returns : *
*/
    _keyboardDidShow () {
        this.setState({showFooter: false});
    }

    /*
@Method : _keyboardDidHide
@Desc   :
@Params :
@Returns : *
*/

    _keyboardDidHide () {
        this.setState({showFooter: true});
    }



    /*
@Method : removeInvalidChars
@Params :
@Returns : *
*/
    removeInvalidChars(text) {
        let regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
        return text.replace(regex, '');
    }

    /*
      @Method : onChangeEmail
      @Params :
      @Returns : *
      */
    onChangeEmail(text) {
        this.props.emailChanged(this.removeInvalidChars(text));

    }

    /*
    @Method : onChangePassword
    @Params :
    @Returns : *
    */
    onChangePassword(text) {
        this.props.passwordChanged(this.validatePassword(this.removeInvalidChars(text)));
    }

    /*
@Method : validateEmail
@Params : email
@Returns : *
*/
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };


    /*
     @Method : onButtonPress
     @Params :
     @Returns : *
     */
    onButtonPress() {
        this.setState({isSubmitted: true})
        const {email, password} = this.props;

        if (email && password) {
            this.setState({validationError: ''});
            Keyboard.dismiss();
            this.props.loginUser({email,password});
        }
    }

    /*
    @Method : renderAction
    @Params :s
    @Returns : *
    */
    renderAction() {

        if (this.props.loading) {
            return (
                <Spinner size="large"/>
            )
        }
        else {
            return (
                   <Button label="Login" onPress={this.onButtonPress.bind(this)}>
                     <Image style={{height:17, width:20,position:'relative', zIndex:1024}}  source={require("../../images/vecv/Login/login_login.png")}   />
                  </Button>
            );
        }
    }
    /*
@Method : validateNumber
@Params :
@Returns : *
*/
    validateNumber(text) {
        let newText = '';
        let numbers = '0123456789+';

        for (var i = 0; i < text.length; i++) {
            if ( numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }

        return newText;
    }


    /*
 @Method : onEyeClick
 @Params :
 @Returns : *
 */
    onEyeClick()
    {

        this.setState({secureTextEntry:!(this.state.secureTextEntry)})

    }

    /*
@Method : validatePassword
@Params :
@Returns : *
*/
    validatePassword(text) {
        return text.replace(/\s/g,'');
    }

    /*
@Method : renderLogo
@Params :
@Returns : *
*/
   renderLogo=()=>
   {
    return(
        <Image source={require("../../images/vecv/Dashboard/logo.png")} style={{width:150,height:26}}   />
    )

  }

    /*
   @Method : renderContent
   @Params :
   @Returns : *
   */
    renderContent() {
        if (this.state.isLoaded == null) {
            return (
                <View style={{paddingTop: 200}}>
                    <Spinner size="large"/>
                </View>
            );
        }
        else {
            return (
            <ImageBackground source={require('../../images/vecv/Login/login_bg.png')} style={{flex:1,textAlign:'center', height:deviceHeight, justifyContent: 'center'}}>
                  <Content bounces={false}>
                    <Form style={{flex:1,backgroundColor:'transparent'}}>
                        <Card style={{backgroundColor:'transparent',elevation:0, padding:25}}>
                            <CardItem header style={styles.headerStyle}>
                            <View style={{ flex:1, flexDirection:'column', height:170, alignItems:'center', paddingTop:30}}>
                                {renderLogo()}
                                <Text style={styles.textStyle}>Login </Text>
                                </View>
                            </CardItem>
                            <View style={{paddingLeft:20,paddingRight:20,paddingBottom:20,paddingTop:10, backgroundColor:'#ffffff',borderRadius:10}}>
                            <CardItem style={{backgroundColor:'transparent',elevation:0,height:90}}>
                                <EmailInput  placeholder="Distributor Code" label="Distributor Code"
                                            onChangeText={this.onChangeEmail.bind(this)} value={this.props.email}
                                            isSubmitted={this.state.isSubmitted}/>
                            </CardItem>
                            <CardItem style={{backgroundColor:'transparent',elevation:0,height:90}}>
                                <Password   isLengthMessageShow={false}  iconName='lock' onEyeClick={this.onEyeClick.bind(this)} secureTextEntry={this.state.secureTextEntry} placeholder="password" label="Password"
                                       onChangeText={this.onChangePassword.bind(this)} value={this.props.password}
                                       isSubmitted={this.state.isSubmitted}/>
                            </CardItem>
                            <CardItem style={{backgroundColor:'transparent',elevation:0}}>
                                {this.renderAction()}
                            </CardItem>
                        </View>
                        </Card>
                    </Form>
                     </Content>
                </ImageBackground>
            );
        }
    }
    /*
    @Method : renderFooter
    @Params :
    @Returns : *
    */
    renderFooter()
    {
        if (this.state.showFooter && this.state.isLoaded != null) {
            return (
                <AuthFooter onPress={() => {
                    Actions.signUp();
                }}  buttonText="New user? Sign Up" />
            )
        }
    }
    /*
 @Method : render
 @Params :
 @Returns : *
 */
    render() {
        if (this.state.isLoaded == null) {
            return (
                <Spinner size="large"/>
            );
        }
        else
        {
            return (
                <Container style={styles.containerBackgroundColor}>
                        {this.renderContent()}
                   
                </Container>
            );
        }
    };
}

const styles = {
    containerBackgroundColor:{
        backgroundColor: 'transparent'
    },
    headerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'transparent'
    },
    forgotPasswordButtonCardItemStyle:{
        color:'#949dac',
        backgroundColor:'transparent',
        paddingTop:10,
        height:30
    },
    textStyle:{
        fontSize: 27,
        color:'#ffffff',
        alignSelf: 'center',
        paddingTop:50,
        paddingBottom:20, fontWeight:'500'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    headerStyleWithHeight:{
        textAlign:'center',
        resizeMode: 'stretch'
    },
     butonStyle:{
      flex:1,
      alignSelf:'stretch',
      backgroundColor:'#003d7d',
      borderWidth:1,
      borderColor:'#003d7d',
      marginLeft:5,
      marginRight:5,
      borderRadius:6,
      justifyContent:'center',
      alignSelf:'center'
    }
}

const mapStateToProps = ({auth}) => {
    const {email,phone,password, error, loading} = auth;
    return {email, phone,password, error, loading};

};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    facebookLogin,
    phoneChanged,
    resetForm
})(LoginForm);
