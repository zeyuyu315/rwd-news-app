import React, { Component } from 'react'
import Switch from 'react-switch';
import './ToggleSwitch.css'

class ToggleSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked : true
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked : checked}, ()=>this.props.parentCallback(this.state.checked));
    }

    render() {
        return (
            <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor="#2693e6"
                className="react-switch"
                id="material-switch"
                height={25}
                width={50}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            />
        )
    }
}

export default ToggleSwitch;
