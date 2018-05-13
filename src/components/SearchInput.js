
import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import axios from 'axios';

const Option = Select.Option;

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    data: [],
    value: [],
    fetching: false,
  }
  fetchUser = (value) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    axios.post('/q', {query: value})
      .then(response => response.data)
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        if(!body.addresses){
          return;
        }
        const data = body.addresses.map(v => ({
          text: v,
          value: v,
        }));
        this.setState({ data, fetching: false });
      });
  }
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  handleSelect = (value) => {
    this.props.handleSearch(value);
  }
  render() {
    const { fetching, data, value } = this.state;
    return (
      <Select
        mode="combobox"
        labelInValue
        value={value}
        placeholder="Enter Address..."
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
        onSelect={this.handleSelect}
      >
        {data.map(d => <Option key={d.value}>{d.text}</Option>)}
      </Select>
    );
  }
}

export default SearchInput;
          