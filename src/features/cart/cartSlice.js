import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: false
}

export const getCartItems = createAsyncThunk('cart/getCartItems',
    async (name, thunkAPI) => {
        try {
            // console.log(thunkAPI);
            const resp = await axios(url);
            return resp.data;
        } catch (err) {
            return thunkAPI.rejectWithValue('something went wrong')
        }
    })

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, { payload }) => {
            state.cartItems = state.cartItems.filter(item => item.id !== payload)
            state.amount -= 1;
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find(item => item.id === payload);
            cartItem.amount += 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find(item => item.id === payload);
            if (cartItem.amount > 0) {
                cartItem.amount -= 1;
            }
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach(item => {
                amount += item.amount;
                total += (item.amount * item.price)
            })
            state.amount = amount;
            state.total = total.toFixed(2);

        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
            state.isLoading = false;
        },
        [getCartItems.rejected]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        },
    }
})

export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions;

export default cartSlice.reducer;