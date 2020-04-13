import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Badge from './Badge';
import { FaShareAlt } from 'react-icons/fa';
import { withRouter} from 'react-router-dom';
import { Context } from './Context';
import Modal from 'react-bootstrap/Modal';
import ShareContainer from './ShareContainer';

class SearchCard extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            setShow: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose() {
        this.setState({show : false});
    }

    handleShow(e) {
        this.setState({show : true});
        e.stopPropagation();
    }


    handleClick= () => {
        const { closeSwitchShow, getDetailedArticle, changeSearchString, closeFavorite } = this.context;
        closeSwitchShow();
        changeSearchString();
        closeFavorite();
        getDetailedArticle(this.props.id);
        let url = `/article/${this.props.id}` ;
        this.props.history.push(url);
    }

    render() {
        return (
                    <Col sm={12} lg={3}>
                        <div onClick={this.handleClick} style={{padding: "1rem", marginBottom: "0.5rem"}} className="card-item">
                            <Container>
                                <Row style={{paddingBottom : "1rem"}}>
                                    <div className="card-txt">
                                        {this.props.title}
                                        <div onClick={this.handleShow} style={{display: "inline"}}>
                                            <FaShareAlt></FaShareAlt>
                                                <div onClick={(e) => e.stopPropagation()}>
                                                    <Modal show={this.state.show} onHide={this.handleClose}>
                                                        <Modal.Header closeButton>
                                                            <h5>{this.props.title}</h5>
                                                        </Modal.Header>
                                                        <Modal.Footer>
                                                            <Col>
                                                                <Row>
                                                                    <h5 style={{margin: "auto", marginBottom: "0.5rem"}}>Share via</h5>
                                                                </Row>
                                                                <ShareContainer size={64} url={this.props.url} tooltip={false}></ShareContainer>
                                                            </Col>
                                                            
                                                        </Modal.Footer>
                                                    </Modal>
                                                </div>
                                        </div>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="card-img-container">
                                        <img className="card-img" src={this.props.image} alt="newsImage" ></img>
                                    </div>
                                </Row>
                                <Row>
                                    <Col style={{paddingLeft : "0rem", paddingRight: "0rem", paddingTop:"1rem", paddingBottom: "1.5rem"}}>
                                        <div className="card-date">{this.props.date}</div>
                                        <Badge section={this.props.section.toUpperCase()}></Badge>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
        )
    }
}

export default withRouter(SearchCard)
