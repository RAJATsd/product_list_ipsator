import { put, takeLatest } from "redux-saga/effects";

import apiUrl from "@/utils/apiUrl";
import {
  fetchProductListError,
  fetchProductListStart,
  fetchProductListSuccess,
  fetchMoreProductsSuccess,
  fetchMoreProductsError,
  fetchMoreProductsStart,
  searchProductStart,
  searchProductSuccess,
  searchProductError,
  searchMoreProductsStart,
  searchMoreProductsError,
  searchMoreProductsSuccess,
} from "./reducer";
import formQuery from "@/utils/formQuery";

interface Action<T = any> {
  type: string;
  payload?: T;
}

function* fetchProducts(action: Action) {
  try {
    const { category } = action.payload || {};
    const url = apiUrl(category ? `/category/${category}` : "");
    const finalUrl = new URL(url);
    finalUrl.search = formQuery([
      { key: "limit", value: "10" },
      { key: "skip", value: "0" },
    ]);

    const response = yield fetch(finalUrl);
    const data = yield response.json();

    yield put(fetchProductListSuccess(data));
  } catch (err) {
    yield put(fetchProductListError(err));
  }
}

function* fetchMoreProducts(action: Action) {
  try {
    const { page, category } = action.payload;
    const url = apiUrl(category ? `/category/${category}` : "");
    const finalUrl = new URL(url);
    finalUrl.search = formQuery([
      { key: "limit", value: "10" },
      { key: "skip", value: `${page * 10}` },
    ]);

    const response = yield fetch(finalUrl);
    const data = yield response.json();

    yield put(fetchMoreProductsSuccess(data));
  } catch (err) {
    yield put(fetchMoreProductsError(err));
  }
}

function* searchProduct(action: Action) {
  try {
    const url = apiUrl(`/search?q=${action.payload}`);
    const finalUrl = new URL(url);
    finalUrl.search = formQuery([
      { key: "limit", value: "10" },
      { key: "skip", value: "10" },
    ]);

    const response = yield fetch(url);
    const data = yield response.json();

    yield put(searchProductSuccess(data));
  } catch (err) {
    yield put(searchProductError(err));
  }
}

function* searchMoteProducts(action: Action) {
  try {
    const { page, query } = action.payload;
    const url = apiUrl(`/search?q=${query}`);
    const finalUrl = new URL(url);
    finalUrl.search = formQuery([
      { key: "limit", value: "10" },
      { key: "skip", value: `${page * 10}` },
    ]);

    const response = yield fetch(finalUrl);
    const data = yield response.json();

    yield put(searchMoreProductsSuccess(data));
  } catch (err) {
    yield put(searchMoreProductsError(err));
  }
}

export default function* watchHome() {
  yield takeLatest(fetchProductListStart.type, fetchProducts);
  yield takeLatest(fetchMoreProductsStart.type, fetchMoreProducts);
  yield takeLatest(searchProductStart.type, searchProduct);
  yield takeLatest(searchMoreProductsStart.type, searchMoteProducts);
}
