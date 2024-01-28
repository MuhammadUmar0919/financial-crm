// redux import
import {
    combineReducers
} from "redux";
// reducers import
import aclReducer from "./AclReducer";
import authReducer from "./AuthReducer";
import roleReducer from "./RoleReducer";
import adminReducer from "./AdminReducer";
import statusReducer from "./StatusReducer";
import viewReducer from "./ViewDataReducer";
import simpleReducer from "./SimpleReducer";
import imagesReducer from "./ClientsReducer";
import clientsReducer from "./ClientsReducer";
import invoiceReducer from "./InvoiceReducer";
import serviceReducer from "./ServiceReducer";
import permissionReducer from "./PermissionReducer";

export const reducers = combineReducers({
    aclReducer,
    authReducer,
    viewReducer,
    roleReducer,
    statusReducer,
    adminReducer,
    imagesReducer,
    simpleReducer,
    invoiceReducer,
    clientsReducer,
    serviceReducer,
    permissionReducer,
});
