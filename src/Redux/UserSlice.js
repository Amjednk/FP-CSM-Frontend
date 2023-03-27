/* user slice and controllers linking with pages and validating actions*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

//linking register page
export const register = createAsyncThunk(
"/api/register",
async ({ credentials, navigate, toast }, { rejectWithValue }) => {
    try {
    const { data } = await axios.post(
        // "http://localhost:5000/api/register",
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
        // "http://localhost:5000/api/login",
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
            // "http://localhost:5000/api/users",
            "https://ak-csm.onrender.com/api/users",
            config
        );
        return data;
        } catch (error) {
        return rejectWithValue(error?.response?.message);
        }
    }
);

export const lockUser = createAsyncThunk(
    "/api/user/lock",
    async (id, { rejectWithValue, getState }) => {
        if (window.confirm("do you confirm user block ?")) {
        try {
            const { data } = await axios.put(
            // `http://localhost:5000/api/user/lock/${id}`,
            `https://ak-csm.onrender.com/api/user/lock/${id}`,
            );
            setTimeout(() => {
                window.location.reload();
            }, 1490);
            toast.success("Account locked!");
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.message);
        }
        }
    }
);

export const unlockUser = createAsyncThunk(
    "/api/user/unlock",
    async (id, { rejectWithValue, getState }) => {
        if (window.confirm("do you confirm user unblock ?")) {
        try {
            const { data } = await axios.put(
            // `http://localhost:5000/api/user/unlock/${id}`,
            `https://ak-csm.onrender.com/api/user/unlock/${id}`,
            );
            setTimeout(() => {
                window.location.reload();
            }, 1490);
            toast.success("Account unlocked!");
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.message);
        }
        }
    }
);

export const deleteUser = createAsyncThunk(
    "/api/user/delete",
    async (id, { rejectWithValue, getState }) => {
        const userAuth = getState()?.userAuth;
        const { userLoggedIn } = userAuth;
        const config = {
        headers: { Authorization: `Bearer ${userLoggedIn?.token}` },
        };
        if (window.confirm("are you sure you want to delete this user ?")) {
        try {
            const { data } = await axios.delete(
            // `http://localhost:5000/api/user/delete/${id}`,
            `https://ak-csm.onrender.com/user/delete/${id}`,
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
    /**************************************************************************/
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
    /*******************************************************************************/
    [lockUser.pending]: (state, action) => {
        state.loading = true;
        },
        [lockUser.fulfilled]: (state, action) => {
            state.userLockState = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
            
        },
        [lockUser.rejected]: (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        },
    /**********************************************************************************/
    [unlockUser.pending]: (state, action) => {
        state.loading = true;
        },
        [unlockUser.fulfilled]: (state, action) => {
            state.userUnlockState = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
            
        },
        [unlockUser.rejected]: (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        },
    /**********************************************************************************/
    [deleteUser.pending]: (state, action) => {
        state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.userDeleted = action?.payload;
            window.location.reload();
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        },
        [deleteUser.rejected]: (state, action) => {
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
