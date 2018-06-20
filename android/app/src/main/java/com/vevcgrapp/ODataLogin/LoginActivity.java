//package com.vevcgrapp.ODataLogin;
//
//import android.app.Activity;
//import android.app.ProgressDialog;
//import android.content.Intent;
//import android.os.Bundle;
//import android.os.StrictMode;
//import android.text.TextUtils;
//import android.util.Log;
//import android.view.Menu;
//import android.view.MenuItem;
//import android.view.View;
//import android.widget.Button;
//import android.widget.EditText;
//import android.widget.Toast;
//import com.sap.maf.tools.logon.core.LogonCore;
//import com.sap.maf.tools.logon.core.LogonCoreContext;
//import com.sap.maf.tools.logon.core.LogonCoreException;
//import com.vecv.gr.services.MyLogonCoreListener;
//import com.vecv.gr.R;
//import com.vecv.gr.services.UIListener;
//
//public class LoginActivity extends Activity  implements View.OnClickListener, UIListener {
//    private final String TAG = LoginActivity.class.getSimpleName();
//    private static final String VK_APPCID = "appcid";
//    //  private static final String VK_APPCID = "com.vecv.set2";
//    private Button logonBtn;
//    private EditText hostEdit, portEdit, usernameEdit, passwordEdit;
//    //   private ProgressDialog progressDialog;
//    private String appConnId;
//    private LogonCore lgCore;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_login);
//        if (android.os.Build.VERSION.SDK_INT > 9) {
//            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder()
//                    .permitAll().build();
//            StrictMode.setThreadPolicy(policy);
//        }
//        //Initialize UI elements in the screen
//        this.initializeViews();
//        //Get application connection id
//        this.initializeLogonCore();
//        //If application connection id exists, then display main screen
//        if (!TextUtils.isEmpty(appConnId)){
//            Intent goToNextActivity = new Intent(this, MainActivity.class);
//            startActivity(goToNextActivity);
//        }
//    }
//
//    @Override
//    public void onClick(View v) {
//        registerDevice();
//    }
//
//    @Override
//    public void onODataRequestError(Exception e) {
//        //   progressDialog.dismiss();
//        logonBtn.setEnabled(true);
//        //notify the user the registration fails
//        Toast.makeText(this, R.string.msg_registration_fail, Toast.LENGTH_LONG).show();
//    }
//
//    @Override
//    public void onODataRequestSuccess(String info) {
//        // progressDialog.dismiss();
//        //Store application connection Id in the secure store
//        //This way next time the app runs, we know if the user has been
//        //registered before
//        try {
//            appConnId = lgCore.getLogonContext().getConnId();
//            if (appConnId != null) {
//                // store it
//                if (!lgCore.isStoreOpen()) lgCore.unlockStore(null);
//                lgCore.addObjectToStore(VK_APPCID, appConnId);
//            }
//            //notify the user the registration was complete successfully
//            Toast.makeText(this, R.string.msg_registration_success, Toast.LENGTH_LONG).show();
//            //Display the main screen
//            Intent goToNextActivity = new Intent(this,MainActivity.class);
//            startActivity(goToNextActivity);
//        } catch (LogonCoreException e) {
//            Log.e(TAG, "error getting application connection id", e);
//            //notify the user the registration fails
//            Toast.makeText(this, R.string.msg_registration_fail, Toast.LENGTH_LONG).show();
//            logonBtn.setEnabled(true);
//        }
//    }
//
//    /**
//     * Initialize UI elements
//     */
//    private void initializeViews() {
//        logonBtn = (Button) findViewById(R.id.logon_button);
//        logonBtn.setOnClickListener(this);
//        hostEdit = (EditText) findViewById(R.id.txt_host);
//        portEdit = (EditText) findViewById(R.id.txt_port);
//        usernameEdit = (EditText) findViewById(R.id.txt_username);
//        passwordEdit = (EditText) findViewById(R.id.txt_password);
//    }
//    /**
//     * Initialize LogonCore component
//     */
//    private void initializeLogonCore(){
//        //Get LogonCore instance
//        lgCore = LogonCore.getInstance();
//        //Create a LogonCoreListener for asynchronously registration
//        MyLogonCoreListener listener = new MyLogonCoreListener(0, this);
//        //Set the listener
//        lgCore.setLogonCoreListener(listener);
//        //Initialize LogonCore with application configuraton name
//        lgCore.init(this,"GRApp");
//        //Check if application connection exists
//        try {
//            //check if secure store is available
//            if (lgCore!=null && lgCore.isStoreAvailable()) {
//                //Unlock the store
//                lgCore.unlockStore(null);
//                //Get application connection id
//                appConnId = lgCore.getObjectFromStore(VK_APPCID);
//
//            }
//
//        } catch (LogonCoreException e) {
//            Log.e(TAG, "error initializing logon core", e);
//        }
//    }
//    /**
//     * Onboard device with Mobile services
//     */
//    private void registerDevice() {
//        logonBtn.setEnabled(false);
//        //  progressDialog =
//        //   ProgressDialog.show(this, "", getString(R.string.msg_registration_progress), true);
//        //Check if the Application Connection Id already exists
//        if (TextUtils.isEmpty(appConnId)){
//            //Get LogonCoreContext instance
//            LogonCoreContext lgCtx = lgCore.getLogonContext();
//            //Set host
//            lgCtx.setHost(hostEdit.getText().toString());
//            //Set port
//            int port = 443;
//            // System.setProperty("http.keepAlive","false");
//            try {
//                port = Integer.valueOf(portEdit.getText().toString());
//            } catch (NumberFormatException e) {
//                Log.e(TAG, "Invalid port value, default (8080) is taken!");
//            }
//            lgCtx.setPort(port);
//            lgCtx.setAppId("com.vecv.set2");
//
//            //Set whether the registration uses secure connection or not
//            lgCtx.setHttps(true);
//            //set user creation policy
//            LogonCore.UserCreationPolicy ucPolicy = LogonCore.UserCreationPolicy.automatic;
//            lgCtx.setUserCreationPolicy(ucPolicy);
//            //Set username and password
//            try {
//                lgCtx.setBackendUser(usernameEdit.getText().toString());
//                lgCtx.setBackendPassword(passwordEdit.getText().toString());
//            } catch (LogonCoreException e) {
//                //Notifies the execution finished
//                onODataRequestError(e);
//            }
//            //Register user
//            lgCore.register(lgCtx);
//        } else {
//            //This means the user is already registered
//            Log.d(TAG, getString(R.string.msg_already_registered));
//            //notify the user the device is already regitered
//            Toast.makeText(this, R.string.msg_already_registered,
//                    Toast.LENGTH_LONG).show();
//        }
//    }
//
//}
