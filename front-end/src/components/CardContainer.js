import React, { Component } from 'react';
import NewsCard from './NewsCard';
import Spinner from './Spinner';
import { Context } from './Context';

class CardContainerPage extends Component {
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
        const section = this.props.match.params.section;
        let newspaper = "";
        if (this.props.checked) {
            newspaper = "guardian";
        } else {
            newspaper = "nytimes";
        };
        fetch(`http://localhost:8000/${newspaper}/${section}`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
              //console.log(this.state.items);
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
                  <NewsCard 
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      image={card.image}
                      section={card.section}
                      date={card.date}
                      description={card.description}
                      url={card.url}
                  >
                  </NewsCard>)
            });
            return (
            <div className="card_list">
                {cards}
            </div>
            );
        }
    }
}

export default CardContainerPage ;
