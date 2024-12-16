import { configureStore } from "@reduxjs/toolkit";

import { apiVisitsSlice } from "./visitsSlice";
import { apiNewsSlice } from "./newsSlice";
import { heroApiSlice } from "./heroSlice";

import { partnersApiSlice } from "./partnersSlice";
import { designersApiSlice } from "./designersSlice";

const store = configureStore({
  reducer: {
  
    // partners: partnersReducer,
    // designers: designersReducer,
    [apiNewsSlice.reducerPath]: apiNewsSlice.reducer,
    [apiVisitsSlice.reducerPath]: apiVisitsSlice.reducer,
    [partnersApiSlice.reducerPath]: partnersApiSlice.reducer,
    [heroApiSlice.reducerPath]: heroApiSlice.reducer,
    [designersApiSlice.reducerPath]: designersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiNewsSlice.middleware,
      apiVisitsSlice.middleware,
      heroApiSlice.middleware,
      partnersApiSlice.middleware,
      designersApiSlice.middleware,

    ),
});

export default store;
