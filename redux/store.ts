import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "@/containers/home/reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { products: homeReducer },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
