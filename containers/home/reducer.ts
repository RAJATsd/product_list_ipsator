import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  ProductList: {
    data: null,
    error: null,
    loading: false,
  },
  nextProducts: {
    data: null,
    error: null,
    loading: false,
  },
  searchProduct: {
    data: null,
    error: null,
    loading: false,
  },
  searchProductsNext: {
    data: null,
    error: null,
    loading: false,
  },
};

const fetchProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    fetchProductListStart(state, _action) {
      state.ProductList.loading = true;
    },
    fetchProductListSuccess(state, action) {
      state.ProductList.data = action.payload;
      state.ProductList.error = null;
      state.ProductList.loading = false;
    },
    fetchProductListError(state, action) {
      state.ProductList.data = null;
      state.ProductList.error = action.payload;
      state.ProductList.loading = false;
    },
    fetchMoreProductsStart(state, _action) {
      state.nextProducts.loading = true;
    },
    fetchMoreProductsSuccess(state, action) {
      state.nextProducts.data = action.payload;
      state.nextProducts.error = null;
      state.nextProducts.loading = false;
      state.ProductList.data = {
        ...action.payload,
        products: [
          ...(state.ProductList.data!.products ?? []),
          ...action.payload.products,
        ],
      };
    },
    fetchMoreProductsError(state, action) {
      state.nextProducts.data = null;
      state.nextProducts.error = action.payload;
      state.nextProducts.loading = false;
    },
    searchProductStart(state) {
      state.searchProduct.loading = true;
    },
    searchProductSuccess(state, action) {
      state.searchProduct.data = action.payload;
      state.searchProduct.error = null;
      state.searchProduct.loading = false;
    },
    searchProductError(state, action) {
      state.searchProduct.data = null;
      state.searchProduct.error = action.payload;
      state.searchProduct.loading = false;
    },
    searchMoreProductsStart(state, _action) {
      state.searchProductsNext.loading = true;
    },
    searchMoreProductsSuccess(state, action) {
      state.searchProductsNext.data = action.payload;
      state.searchProductsNext.error = null;
      state.searchProductsNext.loading = false;
      state.searchProduct.data = {
        ...action.payload,
        results: [
          ...(state.searchProduct.data!.results ?? []),
          ...action.payload.results,
        ],
      };
    },
    searchMoreProductsError(state, action) {
      state.searchProductsNext.data = null;
      state.searchProductsNext.error = action.payload;
      state.searchProductsNext.loading = false;
    },
    updateSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  fetchProductListStart,
  fetchProductListError,
  fetchProductListSuccess,
  fetchMoreProductsError,
  fetchMoreProductsStart,
  fetchMoreProductsSuccess,
  searchMoreProductsError,
  searchMoreProductsStart,
  searchMoreProductsSuccess,
  searchProductError,
  searchProductStart,
  searchProductSuccess,
  updateSearchQuery,
} = fetchProductsSlice.actions;

export { initialState };

export default fetchProductsSlice.reducer;
