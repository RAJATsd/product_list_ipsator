import { all, fork } from "redux-saga/effects";

import watchHome from "@/containers/home/saga";

const rootSaga = function* () {
  yield all([fork(watchHome)]);
};

export default rootSaga;
