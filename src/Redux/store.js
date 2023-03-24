import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import ContactReducer from "./ContactSlice";

const store = configureStore({
    reducer: { userAuth: UserReducer, contactsData: ContactReducer },
    
});

export default store;