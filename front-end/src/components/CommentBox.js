import React, { Component } from 'react';
import commentBox from 'commentbox.io';
import './CommentBox.css';

class CommentBox extends Component {

    componentDidMount() {
        this.removeCommentBox = commentBox('5708152314003456-proj');
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
