import React from 'react';
import {BackAndroid,View} from 'react-native';
import {Scene,Router,Stack,Actions,ActionConst} from 'react-native-router-flux';
import LoginForm from './components/Auth/LoginForm';
import Home from './components/Home/Home';
import NewGr  from './components/InBountGr/NewGr';
import NewGrInvoiceInfo  from './components/InBountGr/NewGrInvoiceInfo';
import GrDraft  from './components/InBountGr/GrDraft';
import  SplashPage from './components/SplashScreen';

const RouterComponent =({toggle}) => {
    return (
            <Router   panHandlers={null} sceneStyle ={{backgroundColor: '#fbfbfe'}}>
                 <Scene  key="root">
                     <Scene key="Auth" hideNavBar ={true} type={ActionConst.RESET} initial   >
                         <Scene key="login"  component={LoginForm}    title="Login"  initial />
                     </Scene>
                     <Scene key="Splash" type={ActionConst.RESET}  hideNavBar ={true} >
                         <Scene key="SplashPage"  component={SplashPage}   title="SplashPage"   />
                     </Scene>
                     <Scene key="Home" type={ActionConst.RESET}  hideNavBar ={true}    >
                        <Scene key="HomeComponent"  component={Home}   title="Dashboard" initial   />
                     </Scene>
                    <Scene key="GrDraft" type={ActionConst.RESET}  hideNavBar ={true}     >
                      <Scene key="GrDraft"  component={GrDraft}   title="GrDraft"    />
                    </Scene>
                    <Scene key="NewGrComponent" type={ActionConst.RESET}  hideNavBar ={true}     >
                       <Scene key="NewGrComponent"  component={NewGr}   title="NewGr" initial    />
                       <Scene key="NewGrInvoiceInfo"  component={NewGrInvoiceInfo}   title="NewGrInvoiceInfo" />
                   </Scene>
                </Scene>
            </Router>
           );
};
export default RouterComponent;

