import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchAddress() {
    return fetch('/q', {address: 42}).then(response => {
        console.log(response);
        return response.json();
      }).then(data => {
        console.log(data);
        return data;
      });
//   return axios({
//     method: "get",
//     url: "localhost:4200/q",
//   });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchAddress);
    const addresses = response.addresses;

    // dispatch a success action to the store with the new addresses
    yield put({ type: "API_CALL_SUCCESS", addresses });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}