import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './NewsCard.css';
import ShareIcon from './ShareIcon';
import Badge from './Badge';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import Modal from 'react-bootstrap/Modal';
import ShareContainer from './ShareContainer';
import { withRouter} from 'react-router-dom';


class NewsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            setShow: false,
            switchShow: true
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

    handleClick = () => {
        let url = "/id/" + this.props.id;
        this.setState({ switchShow : false}, ()=>{
            this.props.parentSwitchCallback(this.state.switchShow);
            this.props.history.push(url);
        });
    }

    render() {
        const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

        return (
            
            <div 
                className="cards-container"
                onClick={this.handleClick}
            >
                <Container key={this.props.id} className="card-item" fluid>
                    <Row>
                        <Col className="card-col" sm={12} lg={4}>
                            <div className="card-img-container">
                                <img className="card-img" src={this.props.image} alt="img" ></img>
                            </div>
                        </Col>
                        <Col className="card-col" sm={12} lg={8}>
                            <div className="card-txt">
                                <p className="card-title">{this.props.title}</p>
                                <div className="card-share-icon">
                                    <div onClick={this.handleShow}>
                                        <ShareIcon></ShareIcon>
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
                                                        <ShareContainer url={this.props.url}></ShareContainer>
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
        )
    }
}

export default withRouter(NewsCard);
