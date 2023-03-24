/* user slice and controllers linking with pages and validating actions*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//linking register page
export const register = createAsyncThunk(
"/api/register",
async ({ credentials, navigate, toast }, { rejectWithValue }) => {
    try {
    const { data } = await axios.post(
        "https://ak-csm.onrender.com/api/register",
        credentials
    );
    toast.success("Registered Successfully");
    navigate("/login");
    return data;
    } catch (error) {
    return rejectWithValue(error.response.data);
    }
});

//linking login page
export const login = createAsyncThunk(
"api/login",
async ({ credentials, navigate, toast }, { rejectWithValue }) => {
    try {
    const { data } = await axios.post(
        "https://ak-csm.onrender.com/api/login",
        credentials
    );
    localStorage.setItem("userInfos", JSON.stringify(data));
    toast.success("Logged Successfully");
    navigate("/");
    return data;
    } catch (error) {
    return rejectWithValue(error?.response?.data);
    }
});
//logging out
export const logout = createAsyncThunk(
    "user/logout",
    async (navigate, { rejectWithValue }) => {
    try {
        await localStorage.removeItem("userInfos");
        navigate("/login");
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
    }
);

export const getAllUsers = createAsyncThunk(
    "/api/users",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const userAuth = getState()?.userAuth;
        const { userLoggedIn } = userAuth;
        const config = {
        headers: { Authorization: `Bearer ${userLoggedIn?.token}` },
        };
    
        try {
        const { data } = await axios.get(
            "https://ak-csm.onrender.com/api/users",
            config
        );
        return data;
        } catch (error) {
        return rejectWithValue(error?.response?.message);
        }
    }
    );
//saving data on local storage of the navigator
const userStored = localStorage.getItem("userInfos")
? JSON.parse(localStorage.getItem("userInfos"))
: null;
// Steps and actions for creating, displaying, login and logout
const userSlice = createSlice({
name: "Users",
initialState: { userLoggedIn: userStored },
extraReducers: {
    [register.pending]: (state, action) => {
    state.loading = true;
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [register.fulfilled]: (state, action) => {
    state.userRegistered = action?.payload;
    window.location.reload();
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [register.rejected]: (state, action) => {
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
    },
    /************************************************************/
    [login.pending]: (state, action) => {
    state.loading = true;
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [login.fulfilled]: (state, action) => {
    state.loading = false;
    state.userLoggedIn = action?.payload;
    window.location.reload();
    state.appErr = undefined;
    state.serverErr = undefined;
    },
    [login.rejected]: (state, action) => {
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
    },
    /***************************************************************/
    [logout.pending]: (state, action) => {
        state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
        state.loading = false;
        state.userLoggedIn = null;
        window.location.reload();
        state.appErr = undefined;
        state.serverErr = undefined;
    },
    [logout.rejected]: (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    },
    /**********************************************************************************/
    [getAllUsers.pending]: (state, action) => {
        state.loading = true;
        },
        [getAllUsers.fulfilled]: (state, action) => {
        state.loading = false;
        state.allUsers = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
        },
        [getAllUsers.rejected]: (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        },
    /**********************************************************************************/
    
    },
});

export default userSlice.reducer;
