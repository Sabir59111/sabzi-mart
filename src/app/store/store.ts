
import {configureStore} from "@reduxjs/toolkit"

import cartSlicereducer from "../feature/cartSlice"

const store = configureStore({
    reducer: {
        cart: cartSlicereducer
    },
})

export default store;