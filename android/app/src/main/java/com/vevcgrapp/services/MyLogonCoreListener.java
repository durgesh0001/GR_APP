package com.vevcgrapp.services;

/**
 * Created by ashish on 09-04-2018.
 */

import android.util.Log;

import com.vevcgrapp.services.UIListener;
import com.sap.maf.tools.logon.core.LogonCore;
import com.sap.maf.tools.logon.core.LogonCoreException;
import com.sap.maf.tools.logon.core.LogonCoreListener;
import com.sybase.persistence.DataVault;

public class MyLogonCoreListener extends ODataBaseListener implements LogonCoreListener {
    public static final String TAG = MyLogonCoreListener.class.getSimpleName();

    public MyLogonCoreListener(int operation, UIListener uiListener) {
        super(operation, uiListener);
    }

    @Override
    public void registrationFinished(boolean b, String s, int i, DataVault.DVPasswordPolicy dvPasswordPolicy) {
        Log.d(TAG, "registrationFinished: "+b);
        if (b){
            try {
                LogonCore lgCore = LogonCore.getInstance();
                //For testing purposes we are not using password to create the secure store
                //Consider enabling the password if the application handles sensitive
                // information
                lgCore.createStore(null, true);
                //Persists the registration information into the secure store
                // then clears the sensitive information (e.g. password arrays) from the
                //memory
                lgCore.persistRegistration();
                notifySuccessToListener("successful: " + s);
            } catch (LogonCoreException e) {
                notifyErrorToListener(e);
            }
        } else {
            notifyErrorToListener(new Exception("registration failed: "+ s));
        }

    }

    @Override
    public void deregistrationFinished(boolean b) {

    }

    @Override
    public void backendPasswordChanged(boolean b) {

    }

    @Override
    public void applicationSettingsUpdated() {

    }

    @Override
    public void traceUploaded() {

    }
}