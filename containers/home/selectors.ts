import { createSelector } from "@reduxjs/toolkit";

import { initialState } from "./reducer";

const selectProductState = (state) => state?.products || initialState;

const makeSelectProductsList = () =>
  createSelector(selectProductState, (subState) => subState.ProductList);

const makeSelectSearchedProducts = () =>
  createSelector(selectProductState, (subState) => subState.searchProduct);

const makeSelectSearchQuery = () =>
  createSelector(selectProductState, (subState) => subState.searchQuery);

const makeSelectMoreProducts = () =>
  createSelector(selectProductState, (subState) => subState.nextProducts);

export {
  makeSelectProductsList,
  makeSelectSearchedProducts,
  makeSelectSearchQuery,
  makeSelectMoreProducts,
};
