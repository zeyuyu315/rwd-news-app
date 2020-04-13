import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import SearchBox from './SearchBox'
import './Navbar.css'
import {FaRegBookmark, FaBookmark} from 'react-icons/fa'
import ToggleSwitch from './ToggleSwitch';
import { NavLink} from 'react-router-dom';

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checked : null,
            switchShow : this.props.switchShow
        }
    }

    callbackFunction = (childData) => {
        this.setState({checked: childData}, ()=>this.props.parentCallback(this.state.checked));
    }

    render () {
        alert(this.state.switchShow);
        return (
            <ReactBootStrap.Navbar className="nav" collapseOnSelect expand="sm" variant="dark">
                <SearchBox></SearchBox>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto">
                        <ReactBootStrap.Nav.Link as={NavLink} to="/home" href="/home">Home</ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link as={NavLink} to="/world" href="/world">World</ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link as={NavLink} to="/politics" href="/politics">Politics</ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link as={NavLink} to="/business" href="/business">Business</ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link as={NavLink} to="/technology" href="/technology">Technology</ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link as={NavLink} to="/sports" href="/sports">Sports</ReactBootStrap.Nav.Link>
                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                        <ReactBootStrap.Nav.Link as={NavLink} to="/favorites" href="/favorites"><FaRegBookmark></FaRegBookmark></ReactBootStrap.Nav.Link>
                        {this.state.switchShow && <React.Fragment>
                            <ReactBootStrap.Navbar.Brand>NYTimes</ReactBootStrap.Navbar.Brand>
                            <ToggleSwitch parentCallback = {this.callbackFunction}></ToggleSwitch>
                            <ReactBootStrap.Navbar.Brand>Guardian</ReactBootStrap.Navbar.Brand>
                        </React.Fragment>}
                    </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        )
    }
    
}

export default Navbar;
