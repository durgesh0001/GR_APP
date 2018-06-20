import  React,{Component} from 'react';
import  {Provider} from 'react-redux';
import  {createStore,applyMiddleware} from 'redux';
import  {NetInfo,Image,View,StatusBar,BackHandler,Dimensions,Alert} from 'react-native';
import  firebase from 'firebase';
import  ReduxThunk from 'redux-thunk';
import  reducers from './reducers';
import  Router from './Router';
import {Container,Content} from 'native-base';
let     store = createStore(reducers,{},applyMiddleware(ReduxThunk));
import {StyleProvider,Root } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import {NetWorkError} from './components/NetWorkError';
import {Actions} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import FCM, { NotificationActionType } from "react-native-fcm";





class  App extends Component {
    state={isLoggedIn:null,networkStatus:true,isflashShow:false}

    renderFlash()
    {
        return (
                    <Image source={require('./images/splash/splash.jpg')} style={{flex: 1,bottom:0,height: Dimensions.get('window').height, width:Dimensions.get('window').width,justifyContent: 'center'}}/>
        )
    }


    componentWillMount()
      {
        const config = {
            apiKey: "AIzaSyARba3lRwrugfM0Gp183IX0WBRr441PnRQ",
            authDomain: "vrvcgrapp.firebaseapp.com",
            databaseURL: "https://vrvcgrapp.firebaseio.com",
            projectId: "vrvcgrapp",
            storageBucket: "vrvcgrapp.appspot.com",
            messagingSenderId: "1005411460053"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

          NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);

          NetInfo.isConnected.fetch().done(
              (isConnected) => { this.setState({ networkStatus: isConnected }); }
          );


          BackHandler.addEventListener('hardwareBackPress', function() {
              // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
              // Typically you would use the navigator here to go to the last state.

              if (Actions.state.index === 0) {
                  Alert.alert(
                      'Exit',
                      'Are you sure, you want to exit App?',
                      [
                          {text: 'No', onPress: () => console.log('Cancel Pressed')},
                          {text: 'Yes', onPress: () => {

                              BackHandler.exitApp();

                          }},
                      ],
                      { cancelable: false }
                  )

                  return true;
              }
          });

          try {
              let result = FCM.requestPermissions({
                  badge: false,
                  sound: true,
                  alert: true
              });
          } catch (e) {
              console.error(e);
          }


          FCM.getInitialNotification().then(notif => {

          });

      }


    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
    }

    componentDidMount() {
        SplashScreen.hide();
        // FCM.requestPermissions().then(()=>{
        //
        // }).catch(()=>{
        //     alert('notification permission rejected');
        // });
    }



    handleConnectionChange = (isConnected) => {
        this.setState({ networkStatus: isConnected });
    }

    render()
    {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#E62F32" barStyle="light-content" />
                {this.renderContent()}
            </View>
        )
    }


    renderContent()
    {

        if(this.state.networkStatus)
                {
                return (
                    <Provider store={store}  >
                        <StyleProvider style={getTheme(material)}>
                            <Root>
                                <Router toggle={false} />
                            </Root>
                        </StyleProvider>
                    </Provider>
                )
            }
            else
            {
                return(
                    <NetWorkError/>
                )
            }
    }
}
export default App;

