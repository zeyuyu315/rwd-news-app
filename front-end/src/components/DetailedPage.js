import React, { Component } from 'react'
import { Context, Consumer } from './Context';
import { Container, Row, Col} from 'react-bootstrap';
import './DetailedPage.css'
import Spinner from './Spinner';
import ShareContainer from './ShareContainer';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Clamp from './Clamp';
import CommentBox from './CommentBox';
import ReactTooltip from 'react-tooltip';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = "https://my-first-gcp-project-271002.appspot.com/";

class DetailedPage extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: null,
            storageVal: null
        }
    }

    componentDidMount() {
        let id = this.context.state.article;
        let newspaper = "";
        if (this.props.checked) {
            newspaper = "guardian";
        } else {
            newspaper = "nytimes";
        };
        fetch(`${URL}${newspaper}/article/${id}`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                item: result
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
    
    
    handleFavClick = (info) => {
        let data = JSON.parse(info);
        toast(`Saving ${data.title}`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false
        });
        localStorage.setItem(this.context.state.article, info);
        this.setState({storageVal : this.context.state.article});
    }

    handleUnFavClick = (title) => {
        toast(`Removing ${title}`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false
        });
        localStorage.removeItem(this.context.state.article);
        this.setState({storageVal : null});
    }


    render() {
        const {error, isLoaded, item} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <Spinner></Spinner>;
          } else {
            let info = {};
            info['title'] = item.title;
            info['url'] = item.url;
            info['image'] = item.image;
            info['date'] = item.date;
            info['section'] = item.section;
            info['newspaper'] = this.props.checked ? "GUARDIAN" : "NYTIMES";
            info = JSON.stringify(info);
            return ( 
                <Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div className="detail-page">
                                <div style={{padding: "1rem"}}>
                                    <Container className="detailed-card-item" fluid>
                                        <Row>
                                            <p className="detailed-title">{item.title}</p>
                                        </Row>
                                        <Row>
                                            <Col lg={10} xs={7}>
                                                <p className="detailed-date">{item.date}</p>
                                            </Col>
                                            <div className="share-container">
                                                <ShareContainer size={23} url={item.url} tooltip={true}></ShareContainer>
                                            </div>
                                            <Col lg={1} xs={2}>
                                                {!localStorage.getItem(this.context.state.article) ? 
                                                <div className="bookmark" data-tip="Bookmark" onClick={() => this.handleFavClick(info)}>
                                                    <FaRegBookmark></FaRegBookmark>
                                                </div> 
                                                : 
                                                <div className="bookmark" data-tip="Bookmark" onClick={() => this.handleUnFavClick(item.title)}>
                                                    <FaBookmark></FaBookmark>
                                                </div>}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <img src={item.image} alt="newsImage"></img>
                                        </Row>
                                        <Row>
                                            <Clamp description={item.description}></Clamp>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                            <CommentBox></CommentBox>
                            <ReactTooltip></ReactTooltip>
                            <ToastContainer transition={Zoom}/>
                        </React.Fragment>
                    )}
                </Consumer>
                    
                
            )
        }
    }
}

export default DetailedPage
