import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import {FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon} from "react-share";

class ShareContainer extends Component {
    render() {
        return (
            <Row>
                <Col style={{textAlign: "center"}}>
                    <FacebookShareButton url={this.props.url} subject="#CSCI_571_NewsApp"><FacebookIcon round/></FacebookShareButton>
                </Col>
                <Col style={{textAlign: "center"}}>
                    <TwitterShareButton url={this.props.url} subject="#CSCI_571_NewsApp"><TwitterIcon round/></TwitterShareButton>
                </Col>
                <Col style={{textAlign: "center"}}>
                    <EmailShareButton url={this.props.url} subject="#CSCI_571_NewsApp"><EmailIcon round/></EmailShareButton>
                </Col>
            </Row>
        )
    }
}

export default ShareContainer;
