import { takeLatest, call, put, select } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchAddress(addresses) {
    return axios.post('/q', {
        addresses
    }).then(response => {
        return response.data;
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
    try {
        const query = yield select(({ query }) => query);  
        const response = yield call(fetchAddress, query);
        
        if(response.addresses){            
            // dispatch a success action to the store with the new addresses
            yield put({ type: "API_CALL_SUCCESS", addresses: response.addresses });
        }
        else{
            yield put({ type: "API_CALL_FAILURE" });
        }

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "API_CALL_FAILURE", error });
    }
}