import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMenuItems = createAsyncThunk(
    'menu/fetchMenuItems',
    async (shopId) => {
        const response = await axios.get('http://localhost:8000/api/shop/menu/:shopId');
        return response.data;
    }
);

export const updateMenuItem = createAsyncThunk(
    'menu/updateMenuItem',
    async (item) => {
        const response = await axios.put('http://localhost:8000/api/shop/menu/:shopId', item);
        return response.data;
    }
);

const initialState = [
    {
        name : 'Fluxe Jouice',
        price : 50,
        catagory : "Detux Jouice",
        image_url : 'https://cdn.pixabay.com/photo/2016/08/23/15/52/fresh-juice-1614822_1280.jpg',
        shopId : "679ce3487d6443c00c654e6b",
        avalibility : true,
    }
]

const menuSlice = createSlice({
    name : 'menuItems',
    initialState,
    reducers : {
        toggleAvalibility : (state, action) => {
            const item = state.items.find(item => item.id === action.payload._id);
            // api call
            if(item) {
                item.avalibility = !item.avalibility;
            }
        },
        deleteMenuItem : (state, action) => {
            //  call the delete api
            state.items = state.items.filter(item => item._id != action.payload._id);
        },
        addMenuItem : (state, action) => {
            // call the add api
            state.items.push(action.payload);
        },
    },

    extraReducers : (builder) => {
        builder
        .addCase(fetchMenuItems.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchMenuItems.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchMenuItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

export default menuSlice.reducer;
export const { toggleAvalibility, deleteMenuItem, addMenuItem} = menuSlice.actions;