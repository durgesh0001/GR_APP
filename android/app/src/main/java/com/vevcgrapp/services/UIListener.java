package com.vevcgrapp.services;

/**
 * Created by ashish on 09-04-2018.
 */

public interface UIListener {
    void onODataRequestError(Exception e);
    void onODataRequestSuccess(String info);
}