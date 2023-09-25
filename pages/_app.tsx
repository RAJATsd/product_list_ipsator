import { Provider } from "react-redux";

import "@/styles/globals.css";
import store from "@/redux/store";
import SearchBar from "@/components/Searchbar";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SearchBar />
      <Component {...pageProps} />
    </Provider>
  );
}
