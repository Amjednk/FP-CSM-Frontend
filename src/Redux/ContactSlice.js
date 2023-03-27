/* user slice and controllers linking with pages and validating actions*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

//linking the create contact page
export const create = createAsyncThunk(
"/api/contact",
async (
    { contactDetails, navigate, toast },
    { rejectWithValue, getState }
) => {
    const userAuth = getState()?.userAuth;
    const { userLoggedIn } = userAuth;
    const config = {
    headers: { Authorization: `Bearer ${userLoggedIn?.token}` },
    };
    try {
    const { data } = await axios.post(
        // "http://localhost:5000/api/contact",
        "https://ak-csm.onrender.com/api/contact",
        contactDetails,
        config
    );
    toast.success("Created Successfully");
    navigate("/allcontacts");
    return data;
    } catch (error) {
    if (!error?.response) {
        throw error;
    }
    return rejectWithValue(error?.response?.data);
    }
}
);

export const getAllContacts = createAsyncThunk(
"/api/allcontacts",
async (payload, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.userAuth;
    const { userLoggedIn } = userAuth;
    const config = {
    headers: { Authorization: `Bearer ${userLoggedIn?.token}` },
    };

    try {
    const { data } = await axios.get(
        // "http://localhost:5000/api/allcontacts",
        "https://ak-csm.onrender.com/api/allcontacts",
        config
    );
    return data;
    } catch (error) {
    return rejectWithValue(error?.response?.message);
    }
}
);

export const getSingleContact = createAsyncThunk(
"/api/SingleContact",
async (id, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.userAuth;
    const { userLoggedIn } = userAuth;
    const config = {
    headers: { Authorization: `Bearer ${userLoggedIn?.token}` },
    };

    try {
    const { data } = await axios.get(
        // `http://localhost:5000/api/contact/${id}`,
        `https://ak-csm.onrender.com/api/contact/${id}`,
        config
    );

    return data;
    } catch (error) {
    return rejectWithValue(error?.response?.message);
    }
}
);

export const editContact = createAsyncThunk(
"/api/edit",
async ({ id, contactDetails, navigate }, { rejectWithValue, getState }) => {
    const userAuth = getState()?.userAuth;
    const { userLoggedIn } = userAuth;
    const config = {
    headers: { Authorization: `Bearer ${userLoggedIn?.token}` },
    };

    try {
    const { data } = await axios.put(
        // `http://localhost:5000/api/edit/${id}`,
        `https://ak-csm.onrender.com/api/edit/${id}`,
        contactDetails,
        config
    );
    navigate("/allcontacts");
    toast.success("Contact has been successfully updated");
    return data;
    } catch (error) {
    if (!error?.response) {
        throw error;
    }
    return rejectWithValue(error?.response?.data);
    }
}
);

export const deleteContact = createAsyncThunk(
"api/delete",
async (id, { rejectWithValue, getState }) => {
    const userAuth = getState()?.userAuth;
    const { userLoggedIn } = userAuth;
    const config = {
    headers: { Authorization: `Bearer ${userLoggedIn?.token}` },
    };
    if (window.confirm("are you sure you want to delete this contact ?")) {
    try {
        const { data } = await axios.delete(
        // `http://localhost:5000/api/delete/${id}`,
        `https://ak-csm.onrender.com/api/delete/${id}`,
        config
        );
        toast.success("Deleted Successfully");

        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.message);
    }
    }
}
);

export const deleteAllContacts = createAsyncThunk(
"api/delete",
async (id, { rejectWithValue, getState }) => {
    const userAuth = getState()?.userAuth;
    const { userLoggedIn } = userAuth;
    const config = {
    headers: { Authorization: `Bearer ${userLoggedIn?.token}` },
    };
    if (window.confirm("are you sure you want to delete all your contacts ?")) {
    try {
        const { data } = await axios.delete(
        // `http://localhost:5000/api/delete_all`,
        `https://ak-csm.onrender.com/api/delete_all`,
        config
        );
        toast.success("Deleted Successfully");

        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.message);
    }
    }
}
);

//Checking data on local storage of the navigator
const userStored = localStorage.getItem("userInfos")
? JSON.parse(localStorage.getItem("userInfos"))
: null;

// Steps and actions for creating, displaying, updating and deleting contacts
const contactSlice = createSlice({
name: "Contacts",
initialState: { userLoggedIn: userStored },
extraReducers: {
    [create.pending]: (state, action) => {
    state.loading = true;
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [create.fulfilled]: (state, action) => {
    state.contactCreated = action?.payload;
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [create.rejected]: (state, action) => {
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
    },
    /**********************************************************************************/
    [getAllContacts.pending]: (state, action) => {
    state.loading = true;
    },
    [getAllContacts.fulfilled]: (state, action) => {
    state.loading = false;
    state.allContacts = action?.payload;
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [getAllContacts.rejected]: (state, action) => {
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
    },
    /**********************************************************************************/
    [deleteContact.pending]: (state, action) => {
    state.loading = true;
    },
    [deleteContact.fulfilled]: (state, action) => {
    state.contactDeleted = action?.payload;
    window.location.reload();
    state.loading = false;
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [deleteContact.rejected]: (state, action) => {
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
    },
    /*******************************************************************************/
    [editContact.pending]: (state, action) => {
    state.loading = true;
    },
    [editContact.fulfilled]: (state, action) => {
    state.editedContact = action?.payload;
    state.loading = false;
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [editContact.rejected]: (state, action) => {
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
    },
    /*******************************************************************************/
    [getSingleContact.pending]: (state, action) => {
    state.loading = true;
    },
    [getSingleContact.fulfilled]: (state, action) => {
    state.singleContact = action?.payload;
    state.loading = false;
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [getSingleContact.rejected]: (state, action) => {
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
    },
},
});
export default contactSlice.reducer;