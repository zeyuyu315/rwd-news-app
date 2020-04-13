import React, {Component} from 'react';
import Select from 'react-select';
import './SearchBox.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class SearchBox extends Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {

    return (
      <Select
        className="search-box"
        placeholder="Enter keyword .."
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default SearchBox;