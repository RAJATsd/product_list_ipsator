import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "@mui/material/TablePagination";

import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import {
  fetchMoreProductsStart,
  fetchProductListStart,
  searchMoreProductsStart,
} from "./reducer";
import {
  makeSelectMoreProducts,
  makeSelectProductsList,
  makeSelectSearchedProducts,
  makeSelectSearchQuery,
} from "./selectors";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(makeSelectProductsList());
  const {
    data: searchedProductData,
    error: searchProductError,
    loading: isSearchProductLoading,
  } = useSelector(makeSelectSearchedProducts());
  const { loading: areMoreProductsLoading } = useSelector(
    makeSelectMoreProducts()
  );
  const searchQuery = useSelector(makeSelectSearchQuery());
  const [sortValue, setSortValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const doErrorExist = error || searchProductError;
  const { total, products } = data || {};
  const { products: searchedProductsResults, total: totalSearchPages } =
    searchedProductData || {};
  const doSearchedProductResultsExist = searchedProductsResults?.length > 0;
  const filtersObject = {
    category: categoryValue,
  };
  const areProductsLoading =
    loading || isSearchProductLoading || areMoreProductsLoading;

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProductListStart(undefined));
    }
  }, [products]);

  useEffect(() => {
    if (doErrorExist) {
      setShowErrorToast(true);
    }
  }, [doErrorExist]);

  useEffect(() => {
    if (!searchQuery.length) {
      dispatch(fetchProductListStart(filtersObject));
    }
  }, [categoryValue, searchQuery]);

  const handlePageChange = (page: number) => {
    if (doSearchedProductResultsExist) {
      searchMoreProductsStart({ query: searchQuery, page });
    } else {
      if (products.length < page * 10 + 1) {
        dispatch(fetchMoreProductsStart({ page, ...filtersObject }));
      }
    }

    setCurrentPage(page);
  };

  const onSortValueChange = (val: string) => {
    setSortValue(val);
  };

  const handleClose = () => {
    setShowErrorToast(false);
  };

  return (
    <>
      {!doSearchedProductResultsExist && (
        <Filters
          sortValue={sortValue}
          onSortValueChange={onSortValueChange}
          categoryValue={categoryValue}
          oncategoryChange={setCategoryValue}
        />
      )}
      {areProductsLoading ? (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div
            className={
              "px-3 py-5 grid grid-cols-2 gap-x-5 gap-y-5 max-w-1680 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            }
          >
            {(doSearchedProductResultsExist
              ? searchedProductsResults
              : products
            )
              ?.toSorted((prev, next) =>
                sortValue === ""
                  ? 0
                  : sortValue === "price_asc"
                  ? prev.price - next.price
                  : next.price - prev.price
              )
              .filter(
                (_ele: Object, idx: number) =>
                  idx >= currentPage * 10 && idx < (currentPage + 1) * 10
              )
              .map(({ id, description, price, title, thumbnail }) => (
                <ProductCard
                  key={id}
                  title={title}
                  price={price}
                  description={description}
                  poster={thumbnail}
                />
              ))}
          </div>
          <div className="flex w-full justify-center p-4">
            <TablePagination
              component="div"
              count={
                doSearchedProductResultsExist
                  ? totalSearchPages || 0
                  : total || 0
              }
              page={currentPage}
              onPageChange={(_evt, page) => handlePageChange(page)}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showErrorToast}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          Error occured while fetching or searching products! Try again
        </Alert>
      </Snackbar>
    </>
  );
};

export default HomePage;
