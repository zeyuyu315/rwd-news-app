import React, { Component } from 'react';
import {FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon} from "react-share";
import "./ShareContainer.css";
import ReactTooltip from 'react-tooltip';

class ShareContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: this.props.size,
            tooltip: this.props.tooltip
        }
    }

    render() {
        const {size, tooltip} = this.state;
        const hashtags = ["CSCI_571_NewsApp"];
        return (
            <React.Fragment>
                {tooltip && 
                <div className="Row">
                    <div className="Column" data-tip="Facebook"><FacebookShareButton url={this.props.url} hashtag="#CSCI_571_NewsApp"><FacebookIcon size={size} round/></FacebookShareButton></div>
                    <div className="Column" data-tip="Twitter"><TwitterShareButton url={this.props.url} hashtags={hashtags}><TwitterIcon size={size} round/></TwitterShareButton></div>
                    <div className="Column" data-tip="Email"><EmailShareButton url={this.props.url} subject="#CSCI_571_NewsApp"><EmailIcon size={size} round/></EmailShareButton></div>
                </div>
                }
                {!tooltip && 
                <div className="Row">
                    <div className="Column"><FacebookShareButton url={this.props.url} hashtag="#CSCI_571_NewsApp"><FacebookIcon size={size} round/></FacebookShareButton></div>
                    <div className="Column"><TwitterShareButton url={this.props.url} hashtags={hashtags}><TwitterIcon size={size} round/></TwitterShareButton></div>
                    <div className="Column"><EmailShareButton url={this.props.url} subject="#CSCI_571_NewsApp"><EmailIcon size={size} round/></EmailShareButton></div>
                </div>
                }
                <ReactTooltip></ReactTooltip>
            </React.Fragment>
        )
    }
}

export default ShareContainer;
