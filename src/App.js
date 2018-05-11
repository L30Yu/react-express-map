import React, { Component } from 'react';
import MainLayout from './components/MainLayout';
import SearchInput from './components/SearchInput';
import { Button } from 'antd';

class App extends Component {

  state = { 
    fetching: false, 
    addresses: null,  
    error: null 
  }

  render() {   
    let {fetching, addresses, error} = this.state;
    return (
      <div className="App">
        <MainLayout>
          <SearchInput />
          <span style={{ paddingLeft: "8px" }}>
            {fetching
              ? <Button disabled type="primary" shape="circle" icon="search" />
              : <Button type="primary" shape="circle" icon="search" />
            }
          </span>
          {addresses
            ? addresses
            : null
          }
        </MainLayout>
      </div>
    );
  }
}

export default App;