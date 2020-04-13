import React, { Component } from 'react'
import ClampLines from './ClampLines';
import { MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md';

class Clamp extends Component {
    render() {
        return (
            <ClampLines
                text={this.props.description}
                lines={6}
                ellipsis="..."
                moreText={<MdKeyboardArrowDown></MdKeyboardArrowDown>}
                lessText={<MdKeyboardArrowUp></MdKeyboardArrowUp>} />
        )
    }
}

export default Clamp
