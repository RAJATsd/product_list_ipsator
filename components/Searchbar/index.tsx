import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  makeSelectSearchedProducts,
  makeSelectSearchQuery,
} from "@/containers/home/selectors";
import {
  searchProductStart,
  searchProductSuccess,
  updateSearchQuery,
} from "@/containers/home/reducer";

const SearchBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector(makeSelectSearchedProducts());
  const searchQuery = useSelector(makeSelectSearchQuery());

  const path = router.pathname;
  const isDetailsPage = path === "/Product/[id]";
  const doSearchedProductsExist = data?.products?.length > 0;

  const handleSearch = () => {
    dispatch(searchProductStart(searchQuery));
  };

  const handleClearSearch = () => {
    handleUpdateSearchQuery("");
    dispatch(searchProductSuccess(null));
  };

  const handleUpdateSearchQuery = (query) => {
    dispatch(updateSearchQuery(query));
  };

  return (
    <div className={"flex justify-between items-center p-2 shadow-md"}>
      {isDetailsPage ? (
        <span className={"text-xl align-middle py-9"}>Product Details</span>
      ) : (
        <div className={"flex items-center gap-x-5"}>
          <div className="bg-gray-300 p-2 rounded-lg flex justify-between items-center">
            <SearchIcon />
            <input
              className="bg-transparent border-none ml-4 text-xl font-semibold focus:outline-none focus:border-none"
              placeholder="Search"
              onChange={(evt) => handleUpdateSearchQuery(evt.target.value)}
              value={searchQuery}
            />
          </div>
          <div>
            <button
              className="px-5 py-2 bg-green-400 border-none rounded-md h-11 mx-4 cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </button>
            {doSearchedProductsExist && (
              <button
                className="px-5 py-2 bg-green-400 border-none rounded-md h-11 mx-4 cursor-pointer"
                onClick={handleClearSearch}
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      )}

      <HomeIcon />
    </div>
  );
};

export default SearchBar;
