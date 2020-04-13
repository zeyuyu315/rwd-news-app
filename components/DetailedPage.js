import React, { Component } from 'react'

class DetailedPage extends Component {
    render() {
        return (
            <div>
                {this.props.match.params.id}
            </div>
        )
    }
}

export default DetailedPage
