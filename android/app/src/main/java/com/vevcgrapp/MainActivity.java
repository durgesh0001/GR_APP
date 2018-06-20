package com.vevcgrapp;

import com.facebook.react.ReactActivity;

import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here
import android.content.Intent;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
       @Override
       public void onNewIntent (Intent intent) {
         super.onNewIntent(intent);
           setIntent(intent);
       }

    @Override
    protected String getMainComponentName() {
        return "vevcGrApp";
    }
}
