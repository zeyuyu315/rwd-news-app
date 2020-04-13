import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import FavCard from './FavCard';
import _ from "lodash";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FavoritesPage extends Component {
    constructor(props){
        var news = [],
        keys = Object.keys(localStorage),
        i = keys.length;
        while ( i-- ) {
            var data = JSON.parse(localStorage.getItem(keys[i]));
            if (keys[i] === "checked") {
                continue;
            }
            data['id'] = keys[i];
            data['key'] = keys.length - i - 1;
            news.push(data);
        }
        super(props)
        this.state = {
          isLoaded: false,
          newsList: news
        }
    }

    callbackFunction= (childData, title) => {
        toast(`Removing ${title}`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false
        });
        var prevList = this.state.newsList;
        _.pullAt(prevList, [childData]);
        this.setState({newsList : prevList});
    }

    render() {
        const cards = this.state.newsList.map(card => {
            return (
                <React.Fragment 
                    key={card.id}>
                    <FavCard 
                        parentCallback = {this.callbackFunction}
                        index={card.key}
                        id={card.id}
                        title={card.title}
                        image={card.image}
                        section={card.section}
                        date={card.date}
                        newspaper={card.newspaper}
                        url={card.url}
                    >
                    </FavCard>    
                </React.Fragment>)
        });

        return (
            <React.Fragment>
                {this.state.newsList.length === 0 ? 
                    <React.Fragment>
                     <div style={{textAlign: "center", marginTop: "1rem"}}>
                             You have no saved articles
                     </div>
                 </React.Fragment> 
                : 
                <div className="search_card_list" style={{marginLeft: "1rem", marginRight: "1rem"}}>
                     <Row>
                         <h3 style={{marginLeft: "1rem"}}>Favorites</h3>
                     </Row>
                     <Row>{cards}</Row>
                 </div>
                }
                <ToastContainer transition={Zoom}/>
            </React.Fragment>
        )
    }
}

export default FavoritesPage
