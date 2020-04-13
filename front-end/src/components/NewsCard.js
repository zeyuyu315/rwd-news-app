import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './NewsCard.css';
import Badge from './Badge';
import { FaShareAlt } from 'react-icons/fa';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import Modal from 'react-bootstrap/Modal';
import ShareContainer from './ShareContainer';
import { withRouter} from 'react-router-dom';
import { Consumer, Context } from './Context';

class NewsCard extends Component {
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
        const { closeSwitchShow, getDetailedArticle, closeFavorite } = this.context;
        closeFavorite();
        closeSwitchShow();
        getDetailedArticle(this.props.id);
        let url = `/article/${this.props.id}` ;
        this.props.history.push(url);
    }

    render() {
        const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

        return (
            <Consumer>
                {(context) => (
                    <div 
                        className="cards-container"
                    >
                        <Container onClick={this.handleClick} key={this.props.id} className="card-item" fluid>
                            <Row>
                                <Col className="card-col" sm={12} lg={4}>
                                    <div className="card-img-container">
                                        <img className="card-img" src={this.props.image} alt="newsImage" ></img>
                                    </div>
                                </Col>
                                <Col className="card-col" sm={12} lg={8}>
                                    <div>
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
                                        <ResponsiveEllipsis 
                                            className="card-description"
                                            style={{whiteSpace: "pre-wrap"}}
                                            text={this.props.description}
                                            maxLine='3'
                                            ellipsis='...'
                                            trimRight
                                            basedOn='letters'
                                            />
                                        <div className="card-date">{this.props.date}</div>
                                        <Badge section={this.props.section.toUpperCase()}></Badge>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                )}
            </Consumer>
            
        )
    }
}

export default withRouter(NewsCard);
