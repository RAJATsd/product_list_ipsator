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
  makeSelectProductsList,
  makeSelectSearchedProducts,
  makeSelectSearchQuery,
} from "./selectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(makeSelectProductsList());
  const { data: searchedProductData } = useSelector(
    makeSelectSearchedProducts()
  );
  const searchQuery = useSelector(makeSelectSearchQuery());
  const [sortValue, setSortValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const { total, products } = data || {};
  const { products: searchedProductsResults, total: totalSearchPages } =
    searchedProductData || {};
  const doSearchedProductResultsExist = searchedProductsResults?.length > 0;
  const filtersObject = {
    category: categoryValue,
  };

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProductListStart(undefined));
    }
  }, [products]);

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

  const onSortValueChange = (val) => {
    setSortValue(val);
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
      <div>
        <div
          className={
            "px-3 py-5 grid grid-cols-2 gap-x-5 gap-y-5 max-w-1680 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          }
        >
          {(doSearchedProductResultsExist ? searchedProductsResults : products)
            ?.toSorted((prev, next) =>
              sortValue === ""
                ? 0
                : sortValue === "price_asc"
                ? prev.price - next.price
                : next.price - prev.price
            )
            .filter(
              (_ele, idx) =>
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
              doSearchedProductResultsExist ? totalSearchPages || 0 : total || 0
            }
            page={currentPage}
            onPageChange={(_evt, page) => handlePageChange(page)}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
