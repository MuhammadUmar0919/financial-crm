import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "./Reducers";

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem("store", serializedStore);
    } catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem("store");
        if (serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;


// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { reducers } from "./Reducers";

// // Custom middleware for saving to localStorage
// const saveToLocalStorage = (store) => (next) => (action) => {
//   const result = next(action);
//   try {
//     const serializedStore = JSON.stringify(store.getState());
//     window.localStorage.setItem("store", serializedStore);
//   } catch (e) {
//     console.error("Error saving to localStorage:", e);
//   }
//   return result;
// };

// // Custom middleware for loading from localStorage
// const loadFromLocalStorage = () => {
//   try {
//     const serializedStore = window.localStorage.getItem("store");
//     if (serializedStore === null) return undefined;
//     return JSON.parse(serializedStore);
//   } catch (e) {
//     console.error("Error loading from localStorage:", e);
//     return undefined;
//   }
// };

// // Create the Redux store with localStorage persistence
// const store = configureStore({
//   reducer: reducers,
//   preloadedState: loadFromLocalStorage(),
//   middleware: [...getDefaultMiddleware(), saveToLocalStorage],
// });

// export default store;

