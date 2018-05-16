// A Job takes some input rows and geocodes them in the background.
import axios from 'axios';
import delay from 'delay';
const googleAPIKey = 'AIzaSyCkPjZTYXG2JdmemwWugqlfFXxpJywMi0A';

class Job {
  // Takes an array of objects that each look like
  //
  //   {name: 'Some place', address: '123 Fake St'}
  //
  // and starts geocoding them. Use isFinished to check when geocoding is
  // finished and getResult to get the geocoded rows.
  constructor(inputRows) {
    this._finished = false;
    this._result = null;
    // Google places API can't be called more than 50 times per second so we
    // call this._processRow on every inputRow as fast as possible without
    // exceeding 50 calls per second.
    let promises = inputRows.map(async inputRow => {
      let startTime = Date.now();
      let promise = this._processRow(inputRow);
      let timeDiff = Date.now() - startTime;
      if (timeDiff < 1000 / 50) {
        await delay(1000 / 50 - timeDiff);
      }
      return promise;
    });
    // Set some variables when all the promises resolve
    Promise.all(promises).then(outputRows => {
      this._finished = true;
      this._result = outputRows;
    });
  }

  // Have all the input rows been geocoded?
  isFinished() {
    return this._finished;
  }

  getResult() {
    return this._result;
  }

  async _processRow(inputRow) {
    let res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address:${inputRow.address}&&key:${googleAPIKey}`);
    if (res.body.results.length === 0) {
      console.error(`Failed to process row ${inputRow.address}`);
      return {
        address: inputRow.address,
        lat: null,
        lng: null
      };
    } else {
      let {lat, lng} = res.body.results[0].geometry.location;
      return {
        address: inputRow.address,
        lat: lat,
        lng: lng
      };
    }
  }
}

export default Job;
