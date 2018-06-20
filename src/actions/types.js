import {Alert} from 'react-native';
import {Toast} from 'native-base';
import {Base64} from '../components/common'
//common
export const LOADER_START = 'loader_start';
export const LOADER_END = 'loader_end';

//Auth
export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const PHONE_CHANGED = 'phone_changed';
export const FIRST_NAME_CHANGED = 'first_name_changed';
export const LAST_NAME_CHANGED = 'last_name_changed';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const ON_ADDRESS_CHANGE = 'on_address_change';
export const LOGIN_USER = 'login_user';
export const FORGOT_PASSWORD_REQUEST = 'forgot_password_request';
export const FORGOT_PASSWORD_SUCCESS = 'forgot_password_success';
export const FETCH_AUTH_DETAIL_SUCCESS = 'fetch_auth_detail_success';
export const CONFIRM_PASSWORD_CHANGED = "confirm_password_changed";
export const ON_CHANGE_IMAGE_SUCCESS = "on_change_image_success";
export const RESET_USER = "reset_user";
export const NAME_CHANGED = "name_changed";


//IN-OUt Bounds

export const GET_INVOICE= "get_invoice";
export const GET_INVOICE_INFO= "get_invoice_info";
export const GET_INVOICE_INFO_SEARCH= "get_invoice_info_search";
export const GET_INVOICE_DRAFT = "get_invoice_draft";
export const LOADING_START = "loading_start";
export const LOADING_END = "loading_end";
export const SELECTED_ID_CHANGED = "selected_id_changed";







export const BASE_URL = "http://183.182.84.77:1337/v1/webservices/";
export const BASE_URL_INVOICE = "https://sapfioridev.vecv.net/sap/opu/odata/sap/ZODATA_PO_INV_SRV/ET_INVOICESet";
export const BASE_URL_QR = "https://sapfioridev.vecv.net/sap/opu/odata/sap/ZSD_QR_CONNECT_DET_SRV/et_connect";
export const BASE_URL_INVOICE_OUTWORD_DETAILS = "https://sapfioridev.vecv.net/sap/opu/odata/sap/ZODATA_PO_INV_SRV/ET_INVOICESet";
export const BASE_URL_SAVEFORDRAFTORSUBMIT = "https://sapfioridev.vecv.net/sap/opu/odata/sap/ZODATA_PO_INV_SRV/ET_INVOICESet";
export const AUTHENTICATION = "vendortest:data123";


/*
@Method : b64EncodeUnicode
@Params :
@Returns : *
*/
export const b64EncodeUnicode = (str)=> {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return Base64.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}


export const showToast=(type="success",message)=>
{
    if(type =='success')
    {
    Toast.show({
        text: message,
        position: 'bottom',
        type:type,
        duration:4000
    });
    }
    else
    {
        Toast.show({
            text: message,
            position: 'bottom',
            duration:4000
        });

    }

}

export  const getSaveAsDraftAndSubmitForSubmitXmlRequest =(invoiceNumber)=>{
    let data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<entry xml:base=\"http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/\" xmlns=\"http://www.w3.org/2005/Atom\" xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\" xmlns:d=\"http://schemas.microsoft.com/ado/2007/08/dataservices\">\n" +
        " <id>http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/ET_INVOICESet("+invoiceNumber+")</id>\n" +
        " <title type=\"text\">ET_INVOICESet("+invoiceNumber+")</title>\n" +
        " <updated>2018-05-10T09:35:24Z</updated>\n" +
        " <category term=\"ZODATA_PO_INV_SRV.ET_INVOICE\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\"/>\n" +
        " <link href=\"ET_INVOICESet("+invoiceNumber+")\" rel=\"self\" title=\"ET_INVOICE\"/>\n" +
        " <link href=\"ET_INVOICESet("+invoiceNumber+")/NP_INVOICE_OUTWARD\" rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/NP_INVOICE_OUTWARD\" type=\"application/atom+xml;type=feed\" title=\"NP_INVOICE_OUTWARD\">\n" +
        "  <m:inline>\n" +
        "   <feed xml:base=\"http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/\">\n" +
        "    <id>http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/ET_INVOICESet("+invoiceNumber+")/NP_INVOICE_OUTWARD</id>\n" +
        "    <title type=\"text\">ET_OUTWARDSet</title>\n" +
        "    <updated>2018-05-10T09:35:24Z</updated>\n" +
        "    <author>\n" +
        "     <name/>\n" +
        "    </author>\n" +
        "    <link href=\"ET_INVOICESet("+invoiceNumber+")/NP_INVOICE_OUTWARD\" rel=\"self\" title=\"ET_OUTWARDSet\"/>\n" +
        "    <entry>\n" +
        "     <id>http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/ET_OUTWARDSet(Ebelp='00000',Inv='9000001')</id>\n" +
        "     <title type=\"text\">ET_OUTWARDSet(Ebelp='00000',Inv='9000001')</title>\n" +
        "     <updated>2018-05-10T09:35:24Z</updated>\n" +
        "     <category term=\"ZODATA_PO_INV_SRV.ET_OUTWARD\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\"/>\n" +
        "     <link href=\"ET_OUTWARDSet(Ebelp='00000',Inv='9000001')\" rel=\"self\" title=\"ET_OUTWARD\"/>\n" +
        "     <content type=\"application/xml\">\n" +
        "      <m:properties>\n" +
        "       <d:ConnectCode>CC33</d:ConnectCode>\n" +
        "       <d:Draft/>\n" +
        "       <d:Ebelp>00000</d:Ebelp>\n" +
        "       <d:Po>7050000289</d:Po>\n" +
        "       <d:PartCd>ID204951</d:PartCd>\n" +
        "       <d:Quan>4.000</d:Quan>\n" +
        "       <d:InDev>180000213</d:InDev>\n" +
        "       <d:Inv>9000001</d:Inv>\n" +
        "       <d:Scode/>\n" +
        "      </m:properties>\n" +
        "     </content>\n" +
        "    </entry>\n" +
        "   </feed>\n" +
        "  </m:inline>\n" +
        " </link>\n" +
        " <content type=\"application/xml\">\n" +
        "  <m:properties>\n" +
        "   <d:Inv>0009000001</d:Inv>\n" +
        "   <d:Message/>\n" +
        "   <d:Draft>test</d:Draft>\n" +
        "  </m:properties>\n" +
        " </content>\n" +
        "</entry>";

    return data;
}


export  const getSaveAsDraftAndSubmitXmlRequest =(invoiceNumber,data)=>{
    let dataRequest = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<entry xml:base=\"http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/\" xmlns=\"http://www.w3.org/2005/Atom\" xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\" xmlns:d=\"http://schemas.microsoft.com/ado/2007/08/dataservices\">\n" +
        " <id>http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/ET_INVOICESet("+invoiceNumber+")</id>\n" +
        " <title type=\"text\">ET_INVOICESet("+invoiceNumber+")</title>\n" +
        " <updated>2018-05-10T09:35:24Z</updated>\n" +
        " <category term=\"ZODATA_PO_INV_SRV.ET_INVOICE\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\"/>\n" +
        " <link href=\"ET_INVOICESet("+invoiceNumber+")\" rel=\"self\" title=\"ET_INVOICE\"/>\n" +
        " <link href=\"ET_INVOICESet("+invoiceNumber+")/NP_INVOICE_OUTWARD\" rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/NP_INVOICE_OUTWARD\" type=\"application/atom+xml;type=feed\" title=\"NP_INVOICE_OUTWARD\">\n" +
        "  <m:inline>\n" +
        "   <feed xml:base=\"http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/\">\n" +
        "    <id>http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/ET_INVOICESet("+invoiceNumber+")/NP_INVOICE_OUTWARD</id>\n" +
        "    <title type=\"text\">ET_OUTWARDSet</title>\n" +
        "    <updated>2018-05-10T09:35:24Z</updated>\n" +
        "    <author>\n" +
        "     <name/>\n" +
        "    </author>\n" +
        "    <link href=\"ET_INVOICESet("+invoiceNumber+")/NP_INVOICE_OUTWARD\" rel=\"self\" title=\"ET_OUTWARDSet\"/>\n" +
        "    <entry>\n" +
        "     <id>http://SRNOIGWD01.VECVNET.COM:8000/sap/opu/odata/sap/ZODATA_PO_INV_SRV/ET_OUTWARDSet(Ebelp="+data[0].Ebelp+",Inv="+data[0].Inv+")</id>\n" +
        "     <title type=\"text\">ET_OUTWARDSet(Ebelp="+data[0].Ebelp+",Inv="+data[0].Inv+")</title>\n" +
        "     <updated>2018-05-10T09:35:24Z</updated>\n" +
        "     <category term=\"ZODATA_PO_INV_SRV.ET_OUTWARD\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\"/>\n" +
        "     <link href=\"ET_OUTWARDSet(Ebelp="+data[0].Ebelp+",Inv="+data[0].Inv+")\" rel=\"self\" title=\"ET_OUTWARD\"/>\n" +
        "     <content type=\"application/xml\">\n" +
        "      <m:properties>\n" +
        "       <d:ConnectCode>"+data[0].ConnectCode+"</d:ConnectCode>\n" +
        "       <d:Draft/>\n" +
        "       <d:Ebelp>"+data[0].Ebelp+"</d:Ebelp>\n" +
        "       <d:Po>"+data[0].Po+"</d:Po>\n" +
        "       <d:PartCd>"+data[0].PartCd+"</d:PartCd>\n" +
        "       <d:Quan>"+data[0].Quan+"</d:Quan>\n" +
        "       <d:InDev>"+data[0].InDev+"</d:InDev>\n" +
        "       <d:Inv>"+data[0].Inv+"</d:Inv>\n" +
        "       <d:Scode/>\n" +
        "      </m:properties>\n" +
        "     </content>\n" +
        "    </entry>\n" +
        "   </feed>\n" +
        "  </m:inline>\n" +
        " </link>\n" +
        " <content type=\"application/xml\">\n" +
        "  <m:properties>\n" +
        "   <d:Inv>"+invoiceNumber+"</d:Inv>\n" +
        "   <d:Message/>\n" +
        "   <d:Draft>X</d:Draft>\n" +
        "  </m:properties>\n" +
        " </content>\n" +
        "</entry>";
    return dataRequest;
}

























