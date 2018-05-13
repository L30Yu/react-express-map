import React, { Component } from 'react';
import MainLayout from './components/MainLayout';
import SearchInput from './components/SearchInput';
import { Button } from 'antd';

class App extends Component {

  state = { 
    address: null    
  }

  handleSearch = (address) => {
    this.setState({address});
  }

  render() {   
    let {address} = this.state;
    return (
      <div className="App">
        <MainLayout>
          <SearchInput handleSearch={this.handleSearch}/>
          {address
            ? address
            : null
          }
        </MainLayout>
      </div>
    );
  }
}

export default App;