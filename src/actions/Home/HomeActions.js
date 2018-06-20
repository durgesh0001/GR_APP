import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {BASE_URL_SAVEFORDRAFTORSUBMIT,BASE_URL_QR,GET_INVOICE_DRAFT,SELECTED_ID_CHANGED,GET_INVOICE_INFO_SEARCH,GET_INVOICE,BASE_URL_INVOICE_OUTWORD_DETAILS,LOADING_START,GET_INVOICE_INFO,LOADING_END,showToast,BASE_URL_INVOICE,AUTHENTICATION,b64EncodeUnicode,getSaveAsDraftAndSubmitXmlRequest,getSaveAsDraftAndSubmitForSubmitXmlRequest} from '../types'
import _ from 'lodash';
import axios from 'axios';


/*
@Method : config
@Params :
@Returns : *
*/
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Basic ' + b64EncodeUnicode(AUTHENTICATION),
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': "Fetch",
        'Content-Type' : 'application/x-www-form-urlencoded'
    }
};

/*
@Method : config
@Params :
@Returns : *
*/
const config1 = {
    headers: {
        'Authorization': 'Basic ' + b64EncodeUnicode(AUTHENTICATION),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type' : 'application/atom+xml;type=entry;charset=utf-8',
        'X-CSRF-Token': "cTeMGTcXUQXGLS3Kv7p7UQ=="
    }
};


/*
   @Method : getAllHistoryData
   @Params :
   @Returns : *
   */
export const getAllHistoryData=(callback)=>{
    return (dispatch) => {
        dispatch({type: LOADING_START});
        let ref = firebase.database().ref(`/history/${b64EncodeUnicode(AUTHENTICATION)}`);
        ref.once("value", snapshot => {
            let historyData = [];
            _.map(snapshot.val(),(val,index)=>{
                historyData.push(val.invoiceId);
            });
            callback(historyData);
        });
    }
}

/*
   @Method : deleteAllHistoryData
   @Params :
   @Returns : *
   */
export const deleteAllHistoryData=()=>{
    return (dispatch) => {
        dispatch({type: LOADING_START});
        let ref = firebase.database().ref(`/history/${b64EncodeUnicode(AUTHENTICATION)}`);
        ref.once("value", snapshot => {
            _.map(snapshot.val(),(value,key)=>{
                firebase.database().ref(`/history/${b64EncodeUnicode(AUTHENTICATION)}/${key}`)
                    .remove()
                    .then(() => {
                        requestSuccess(dispatch);

                    })
                    .catch(() => {
                        showToast("danger","Sorry some error occurred, please try again later!");
                    })
            });
        });
    }
}


/*
   @Method : deleteHistoryByDeviceId
   @Params :
   @Returns : *
   */
export const  deleteHistoryByDeviceId=(uid)=>{
    firebase.database().ref(`/history/${b64EncodeUnicode(AUTHENTICATION)}/${uid}`)
        .remove()
        .then(() => {
            requestSuccess(dispatch);
        })
        .catch(function (error) {
            showToast("danger","Sorry some error occurred, please try again later!");
            requestFail(dispatch);

        });
}


/*
   @Method : getQrDetails
   @Params :
   @Returns : *
   */
export const  getQrDetails=(connectCodeRequestValue,callback)=> {

    return (dispatch) => {
        let connectCodeTemp = connectCodeRequestValue.toString();
        let connectCode = connectCodeTemp.replace("C", "");
        dispatch({type: LOADING_START});
        let url = `${BASE_URL_QR}(ConnectCode='${connectCode}',Cnt='')`;
        axios.get(url, config)
            .then(function (response) {
                requestSuccess(dispatch);
                callback(response.data.d);
            })
            .catch(function (error) {
                // showToast("danger", "Sorry some error occurred, please try again later!");
                requestFail(dispatch);
            });
    };
}





/*
   @Method : saveHistory
   @Params :
   @Returns : *
   */
export const saveHistory = ({invoiceId}) => {
    return (dispatch) => {

        let ref = firebase.database().ref(`/history/${b64EncodeUnicode(AUTHENTICATION)}`);
        ref.orderByChild("invoiceId").equalTo(invoiceId).once('value')
            .then(function(dataSnapshot) {
                if(dataSnapshot.val() == null)
                {
                    let history = firebase.database().ref(`/history/${b64EncodeUnicode(AUTHENTICATION)}`)
                        .push({invoiceId:invoiceId})
                        .then((snapshot) => {
                            requestSuccess(dispatch);

                        })
                        .catch(() => {
                            requestFail(dispatch);
                            showToast("danger","Sorry some error occurred, please try again later!");
                        })
                }
            })
            .catch(() => {
                requestFail(dispatch);
                showToast("danger","Sorry some error occurred, please try again later!");

            });
    };
}



/*
   @Method : onSelectedIdChanged
   @Params :
   @Returns : *
   */
export function onSelectedIdChanged (text){
    return (dispatch)=> {
        dispatch({type: SELECTED_ID_CHANGED, payload:text});

    }
}




/*
   @Method : getInvoice
   @Params :
   @Returns : *
   */

export const getInvoice = () => {
    return (dispatch) => {
        dispatch({type: LOADING_START});
        axios.get(BASE_URL_INVOICE,config)
        .then(function (response) {
            let invoiceDateTemp = [];

            _.map(response.data.d.results,(val,index)=>{
                invoiceDateTemp.push(val);
            });

            dispatch({type: GET_INVOICE, payload:invoiceDateTemp});
        })
         .catch(function (error) {
                showToast("danger","Sorry some error occurred, please try again later!");
                requestFail(dispatch);
       });
    };
}

/*
   @Method : getSearchDeviceList
   @Params :
   @Returns : *
   */
export const getSearchInvoiceDetails =(data)=>
{
    return (dispatch)=> {
        dispatch({type: GET_INVOICE_INFO_SEARCH, payload:data.search});
    }
}

/*
   @Method : setScanlistList
   @Params :
   @Returns : *
   */
export const setScanList =(data)=>
{
    return (dispatch)=> {
        dispatch({type: GET_INVOICE_INFO_SEARCH, payload:data});
        dispatch({type: GET_INVOICE_INFO, payload:data});

    }
}





/*
   @Method : getDraftDetails
   @Params :
   @Returns : *
   */

export const getDraftDetails = () => {
    return (dispatch) => {
        let invoiceId ="0000001111";
        dispatch({type: LOADING_START});
        axios.get(`${BASE_URL_INVOICE_OUTWORD_DETAILS}('${invoiceId}')/NP_INVOICE_OUTWARD`,config)
            .then(function (response) {
                if(response.data.d.results.length > 0){
                    let draftDetails =[];
                    let totalQuantity= 0;
                    _.map(response.data.d.results,(val,index)=>{

                        totalQuantity= parseFloat(val.Quan) + totalQuantity;

                    });
                    _.map(response.data.d.results,(val,index)=>{
                        val.totalInvoice =  totalQuantity;
                        draftDetails.push(val);
                    });

                    if(draftDetails.length > 0){
                        dispatch({type: GET_INVOICE_DRAFT, payload:draftDetails});
                    }
                }
                else{
                    showToast("danger","Sorry No Outward Details found.");
                    requestFail(dispatch);
                }
            })
            .catch(function (error) {
                showToast("danger","Sorry some error occurred, please try again later!");
                requestFail(dispatch);
            });
    };
}

/*
   @Method : saveForSubmit
   @Params :
   @Returns : *
   */
export const saveForSubmit = (callback) => {
    return (dispatch) => {
        dispatch({type: LOADING_START});
        axios.get(BASE_URL_INVOICE,config)
            .then(function (response) {
                const configDraft = {
                    headers: {
                        'Authorization': 'Basic ' + b64EncodeUnicode(AUTHENTICATION),
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type' : 'application/atom+xml;type=entry;charset=utf-8',
                        'X-CSRF-Token': response.headers['x-csrf-token']
                    }
                };
                let requestData = getSaveAsDraftAndSubmitForSubmitXmlRequest("0009000001");
                axios.post(`${BASE_URL_SAVEFORDRAFTORSUBMIT}`,requestData,configDraft)
                    .then(function (response) {
                        requestSuccess(dispatch);
                        callback("success");
                    })
                    .catch(function (error) {
                        showToast("danger","Sorry some error occurred, please try again later!");
                        requestFail(dispatch);
                    });
            });

    };
}


/*
   @Method : saveToDraft
   @Params :
   @Returns : *
   */
export const saveToDraft = (invoiceId,data,callback) => {
    return (dispatch) => {
        dispatch({type: LOADING_START});
        axios.get(BASE_URL_INVOICE,config)
            .then(function (response) {
                const configDraft = {
                    headers: {
                        'Authorization': 'Basic ' + b64EncodeUnicode(AUTHENTICATION),
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type' : 'application/atom+xml;type=entry;charset=utf-8',
                        'X-CSRF-Token': response.headers['x-csrf-token']
                    }
                };
                let requestData = getSaveAsDraftAndSubmitXmlRequest(invoiceId,data);
                axios.post(`${BASE_URL_SAVEFORDRAFTORSUBMIT}`,requestData,configDraft)
                    .then(function (response) {
                        alert(JSON.stringify(response))
                        requestSuccess(dispatch);
                        callback("success");
                    })
                    .catch(function (error) {
                        showToast("danger","Sorry some error occurred, please try again later!");
                        requestFail(dispatch);
                    });
            });

    };
}


/*
   @Method : getOutwardDetails
   @Params :
   @Returns : *
   */
export const getOutwardDetails = (invoiceId,callback) => {
    return (dispatch) => {
        dispatch({type: LOADING_START});
        axios.get(`${BASE_URL_INVOICE_OUTWORD_DETAILS}('${invoiceId}')/NP_INVOICE_OUTWARD`,config)
            .then(function (response) {
                if(response.data.d.results.length > 0){
                    let invoiceDetails =[];
                    let totalQuantity= 0;
                        _.map(response.data.d.results,(val,index)=>{
                            totalQuantity= parseFloat(val.Quan) + totalQuantity;
                        });
                    _.map(response.data.d.results,(val,index)=>{
                        val.totalInvoice =  totalQuantity;
                        val.PartCdScanCount = 0;
                        invoiceDetails.push(val);
                    });

                    if(invoiceDetails.length > 0){
                        dispatch({type: GET_INVOICE_INFO, payload:invoiceDetails});
                        Actions.NewGrInvoiceInfo({invoiceId:invoiceId,totalInvoiceRecordsQuantitiy:totalQuantity});
                    }
                }
                else{
                    showToast("danger","Sorry No Outward Details found.");
                    requestFail(dispatch);
                }
            })
            .catch(function (error) {
                showToast("danger","Sorry some error occurred, please try again later!");
                requestFail(dispatch);
            });
    };
}


/*
   @Method : requestSuccess
   @Params :
   @Returns : *
   */
const requestSuccess = (dispatch) => {
    dispatch({type: LOADING_END});

};
/*
   @Method : requestFail
   @Params :
   @Returns : *
   */
const requestFail = (dispatch) => {
    dispatch({type: LOADING_END});

};


