import {GET_INVOICE_DRAFT,SELECTED_ID_CHANGED,GET_INVOICE,LOADING_START,LOADING_END,GET_INVOICE_INFO,GET_INVOICE_INFO_SEARCH} from '../../actions/types';
const INITIAL_STATE = {selected:"",invoiceData:[],invoiceDataTemp:[],invoiceDataInfoTemp:[],invoiceDataInfo:[],invoiceDataDraftInfo:[],invoiceDataDraftInfoTemp:[],loading:false};
export default (state=INITIAL_STATE,action) =>
{
    switch(action.type)
    {
        case GET_INVOICE:
            return {...state,invoiceData:action.payload,invoiceDataTemp:action.payload,loading:false};
        case SELECTED_ID_CHANGED:
            return {...state, selected:action.payload};
        case GET_INVOICE_INFO:
            return {...state,invoiceDataInfo:action.payload,invoiceDataInfoTemp:action.payload,loading:false};
        case GET_INVOICE_DRAFT:
            return {...state,invoiceDataDraftInfo:action.payload,invoiceDataDraftInfoTemp:action.payload,loading:false};
        case GET_INVOICE_INFO_SEARCH:
            return {...state,invoiceDataInfo:action.payload,loading:false};
        case LOADING_START:
            return {...state,loading:true};
        case LOADING_END:
            return {...state,loading:false};
        default:
            return state;
    }
}
