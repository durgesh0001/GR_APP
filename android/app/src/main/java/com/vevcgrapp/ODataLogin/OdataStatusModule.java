package com.vevcgrapp.ODataLogin;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.Handler;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sap.maf.tools.logon.core.LogonCore;
import com.sap.maf.tools.logon.core.store.SecureStoreManager;
import com.sap.maf.tools.logon.core.LogonCoreContext;
import com.sap.maf.tools.logon.core.LogonCoreException;
import com.sap.maf.tools.logon.logonui.api.LogonUIFacade;
import  com.vevcgrapp.R;
import com.sybase.persistence.DataVault;


public class OdataStatusModule extends ReactContextBaseJavaModule  {

    private LogonUIFacade logonUIFacade;
    private static final String VK_APPCID = "appcid";
    //  private static final String VK_APPCID = "com.vecv.set2";
    private Button logonBtn;
    ReactApplicationContext reactContex = new ReactApplicationContext(this.getReactApplicationContext());
    private EditText hostEdit, portEdit, usernameEdit, passwordEdit;
    //   private ProgressDialog progressDialog;
    private String appConnId;
    private LogonCore lgCore;
    public OdataStatusModule(ReactApplicationContext reactContext) {

        super(reactContext);
        initializeLogonCore();
    }

    /**
     * Initialize LogonCore component
     */
    private void initializeLogonCore(){
        //Get LogonCore instance
        lgCore = LogonCore.getInstance();
        //Create a LogonCoreListener for asynchronously registration
        //Set the listener
        //Initialize LogonCore with application configuraton name
        // lgCore.init(getReactApplicationContext(),"VECV_GR_App");
        lgCore.init(getReactApplicationContext(),"vevcGrApp");
        //Check if application connection exists
        try {
            if(!lgCore.isStoreAvailable()){
                lgCore.createStore(null,false);
            }
            //check if secure store is available
            if (lgCore!=null && lgCore.isStoreAvailable()) {
                //Unlock the store
                lgCore.unlockStore(null);
                //Get application connection id
                appConnId = lgCore.getObjectFromStore(VK_APPCID);
                Log.d("appConnId", "initializeLogonCore: "+appConnId);
            }

        } catch (LogonCoreException e) {
            e.printStackTrace();
            // Log.e(TAG, "error initializing logon core", e);
        }catch (Exception e) {
            e.printStackTrace();
            // Log.e(TAG, "error initializing logon core", e);
        }
    }

    @Override
    public String getName() {
        return "OData";
    }

    @ReactMethod
    public void oDataLogout(Callback successCallback) {
        int success = 1;
        int fail = 0;
        int exception = 3;


        // call deregister
        // call deregister
        lgCore.deregister();


        try {
            lgCore.removeStore();

        } catch (LogonCoreException e) {


        }

        // call deregister




        successCallback.invoke(success);

    }



    @ReactMethod
    public void getOdataLoginStatus(Callback successCallback) {
        int success = 1;
        int fail = 0;
        int exception = 3;

        try {

            appConnId = lgCore.getLogonContext().getConnId();
            if (appConnId != null) {
                // store it
                if (!lgCore.isStoreOpen()) lgCore.unlockStore(null);
                lgCore.addObjectToStore(VK_APPCID, appConnId);

            }
        } catch (LogonCoreException e) {
        }

        if (TextUtils.isEmpty(appConnId)) {
            successCallback.invoke(fail);
        }
        else{
            successCallback.invoke(success);
        }
    }


    @ReactMethod
    public void getOdataLogin(String Username,String Password) {
        int success = 1;
        int fail = 0;
        int exception = 3;
        try {

            appConnId = lgCore.getLogonContext().getConnId();
            if (appConnId != null) {
                // store it
                if (!lgCore.isStoreOpen()) lgCore.unlockStore(null);
                lgCore.addObjectToStore(VK_APPCID, appConnId);
            }
        } catch (LogonCoreException e) {

        }
        if (TextUtils.isEmpty(appConnId)) {
            //Get LogonCoreContext instance
            LogonCoreContext lgCtx = lgCore.getLogonContext();
            //Set host
            lgCtx.setHost("smpq.vecv.net");
            //Set port
            int port = 443;
            // System.setProperty("http.keepAlive","false");
            try {
                port = 443;
            } catch (NumberFormatException ex) {

            }
            lgCtx.setPort(port);
            lgCtx.setAppId("com.vecv.set2");

            //Set whether the registration uses secure connection or not
            lgCtx.setHttps(true);
            //set user creation policy
            LogonCore.UserCreationPolicy ucPolicy = LogonCore.UserCreationPolicy.automatic;
            lgCtx.setUserCreationPolicy(ucPolicy);
            //Set username and password
            try {
                lgCtx.setBackendUser(Username);
                lgCtx.setBackendPassword(Password);
            } catch (LogonCoreException ex) {
                ex.printStackTrace();
                //Notifies the execution finished
            }
            //Register user
            lgCore.register(lgCtx);
        }
        else{

        }
    }
}

