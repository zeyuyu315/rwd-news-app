import React, { Component } from 'react';
import { Context } from './Context';
import Spinner from './Spinner';
import SearchCard from './SearchCard';
import { Row } from 'react-bootstrap';

class SearchPage extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        }
    }

    componentDidMount() {
        let query = this.props.searchItem;
        let newspaper = "";
        if (this.props.checked) {
            newspaper = "guardian";
        } else {
            newspaper = "nytimes";
        };
        fetch(`http://localhost:8000/${newspaper}/search/${query}`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }



    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <Spinner></Spinner>;
        } else {
          const cards = items.map(card => {
              return (
                <SearchCard 
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    image={card.image}
                    section={card.section}
                    date={card.date}
                    url={card.url}
                >
                </SearchCard>)
          });
  
          return (
              <div className="search_card_list" style={{marginLeft: "1rem", marginRight: "1rem"}}>
                  <Row>
                      <h3 style={{marginLeft: "1rem"}}>Results</h3>
                  </Row>
                  <Row>{cards}</Row>
              </div>
          );
        }
    }
}

export default SearchPage
