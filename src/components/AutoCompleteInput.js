import React from 'react';
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

class AutoCompleteInput extends React.Component {
  state = {
    dataSource: [],
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 300 }}
        onSelect={onSelect}
        onSearch={this.handleSearch}
        placeholder="input here"
        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    );
  }
}

export default AutoCompleteInput;