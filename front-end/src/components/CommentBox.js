import React, { Component } from 'react';
import commentBox from 'commentbox.io';
import './CommentBox.css';

class CommentBox extends Component {

    componentDidMount() {
        this.removeCommentBox = commentBox('5660601388892160-proj');
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        return (
            <div className="commentbox"/>
        );
    }
}

export default CommentBox
