import React, { Component } from 'react';
import MainLayout from './components/MainLayout';
import AutoCompleteInput from './components/AutoCompleteInput';
import { Button } from 'antd';
import { connect } from "react-redux";

class App extends Component {
  render() {

    const { fetching, addresses, onRequestAddresses, error } = this.props;

    return (
      <div className="App">
        <MainLayout>
          <AutoCompleteInput {...this.props}/>
          <span style={{ paddingLeft: "8px" }}>
            {fetching
              ? <Button disabled type="primary" shape="circle" icon="search" />
              : <Button type="primary" shape="circle" icon="search" onClick={onRequestAddresses}/>
            }
          </span>
          {addresses
            // ? <img src={addresses} />
            ? addresses
            : null
          }
        </MainLayout>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    addresses: state.addresses,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestAddresses: () => dispatch({ type: "API_CALL_REQUEST" }),
    onHandleChange: (query)=> dispatch({ type: "SET_QUERY", query }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);