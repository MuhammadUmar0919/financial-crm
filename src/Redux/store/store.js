// // store.js
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import itemsReducer, { loadItems, rootReducer } from "./apps";

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
//   reducer: rootReducer,
//   preloadedState: loadFromLocalStorage(),
//   middleware: [...getDefaultMiddleware(), saveToLocalStorage],
// });

// // Custom method to load items
// export const loadItemsFromAPI = () => {
//   // Dispatch the async thunk to load items from an API
//   store.dispatch(loadItems());
// };

// // Custom method to update items
// export const updateItems = (newItems) => {
//   // Dispatch your custom action to update items
//   store.dispatch(addItem(newItems));
// };

// export default store;
