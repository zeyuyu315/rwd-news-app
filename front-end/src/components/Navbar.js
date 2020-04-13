import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import SearchBox from './SearchBox'
import './Navbar.css'
import {FaRegBookmark, FaBookmark} from 'react-icons/fa'
import ToggleSwitch from './ToggleSwitch';
import { NavLink} from 'react-router-dom';
import { Consumer, Context } from './Context';
import ReactTooltip from 'react-tooltip';

class Navbar extends Component{
    static contextType = Context;

    handleFavClick= () => {
        const {openFavorite, closeSwitchShow} = this.context;
        openFavorite();
        closeSwitchShow()
    }

    callbackFunction = (childData) => {
        this.props.parentCallback(childData);
    }

    render () {
        return (
                <Consumer>
                    {(context) => (
                        <ReactBootStrap.Navbar className="nav" collapseOnSelect expand="sm" variant="dark">
                            <SearchBox></SearchBox>
                            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                                <ReactBootStrap.Nav 
                                    className="mr-auto" 
                                    onClick={context.openSwitchShow}
                                    >
                                    <NavLink className="nav-link" exact={true} to="/home" >Home</NavLink>
                                    <NavLink className="nav-link" exact={true} to="/world" >World</NavLink>
                                    <NavLink className="nav-link" exact={true} to="/politics" >Politics</NavLink>
                                    <NavLink className="nav-link" exact={true} to="/business" >Business</NavLink>
                                    <NavLink className="nav-link" exact={true} to="/technology" >Technology</NavLink>
                                    <NavLink className="nav-link" exact={true} to="/sports" >Sports</NavLink>
                                </ReactBootStrap.Nav>
                                <ReactBootStrap.Nav>
                                    {context.state.bookmark ? <NavLink 
                                    onClick={this.handleFavClick} className="nav-link" exact={true} to="/favorites" data-tip="Bookmark" style={{color: "white"}}><FaRegBookmark></FaRegBookmark></NavLink> : <div className="nav-link" data-tip="Bookmark" style={{color: "white"}}><FaBookmark></FaBookmark></div>}
                                    {context.state.switchShow && <React.Fragment>
                                        <ReactBootStrap.Navbar.Brand>NYTimes</ReactBootStrap.Navbar.Brand>
                                        <ToggleSwitch checked={this.props.checked} parentCallback={this.callbackFunction}></ToggleSwitch>
                                        <ReactBootStrap.Navbar.Brand>Guardian</ReactBootStrap.Navbar.Brand>
                                    </React.Fragment>}
                                </ReactBootStrap.Nav>
                            </ReactBootStrap.Navbar.Collapse>

                        <ReactTooltip></ReactTooltip>
                        </ReactBootStrap.Navbar>
                    )}
                </Consumer>
        )
    }
    
}

export default Navbar;
