import React, {Component} from 'react';
import './SearchBox.css';
import AsyncSelect from 'react-select/async';
import _ from "lodash";
import { withRouter} from 'react-router-dom';
import { Context, Consumer} from './Context';

const loadAutoSuggest = async (inputValue) => {
  console.log(inputValue);
  try {
    const response = await fetch(
      `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${inputValue}`,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "df49b0cf1d55421891688ea81f84f0b3"
        }
      }
    );
    const data = await response.json();
    const resultsRaw = data.suggestionGroups[0].searchSuggestions;
    const options = resultsRaw.map(result => ({ value: result.displayText, label: result.displayText }));
    console.log(options);
    return options;
  } catch (error) {
    console.error(`Error fetching search ${inputValue}`);
  }
};

const loadOptions = (inputValue, callback) => {
  loadAutoSuggest(inputValue).then(callback);
};

class SearchBox extends Component {
  static contextType = Context;

  handleOnChange = (selectedOption) => {
    const { closeSwitchShow, changeSearch } = this.context;
    let query = encodeURIComponent(selectedOption.value);
    changeSearch(query);
    closeSwitchShow();
    let url = `/search/${query}`;
    this.props.history.push(url);
  };

  render() {
    return (
      <Consumer>
        {(context) => (
          <AsyncSelect
            key={context.state.searchString.toString()}
            className="search-box"
            placeholder="Enter keyword .."
            loadOptions={_.debounce(loadOptions, 1000)}
            onChange={this.handleOnChange}
            noOptionsMessage={() => "No Match"}
          />
        )}
      </Consumer>
        
    );
  }
}

export default withRouter(SearchBox);