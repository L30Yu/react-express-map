import React from 'react';
import { AutoComplete } from 'antd';
import {connect} from 'react-redux';

class AutoCompleteInput extends React.Component {

    handleSearch = (value) => {
        // this.setState({
        //     dataSource: !value ? [] : [
        //         value,
        //         value + value,
        //         value + value + value,
        //     ],
        // });
    }

    handleOnChange = (value) => {
        this.props.onHandleChange(value);
    }

    handleOnSelect = (value) => {

    }

    render() {
        let addresses = this.props.addresses;
        let dataSource = addresses ? addresses.map(v => v.address) : [];
        return (
            <AutoComplete
                dataSource={dataSource}
                style={{ width: 300 }}
                onSelect={this.handleOnSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                onChange={this.handleOnChange}
            >
            </AutoComplete>
        );
    }
}

const mapStateToProps = state => {
    return {
        fetching: state.fetching,
        addresses: state.addresses,
        error: state.error,
        query: state.query,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestAddresses: () => dispatch({ type: "API_CALL_REQUEST" })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteInput);