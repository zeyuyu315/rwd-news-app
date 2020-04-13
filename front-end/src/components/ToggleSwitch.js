import React, { Component } from 'react'
import Switch from 'react-switch';
import './ToggleSwitch.css';
import { Consumer } from './Context';

class ToggleSwitch extends Component {
    render() {
        return (
                <Consumer>
                    {(context) => (
                        <React.Fragment>
                            <Switch
                                checked={this.props.checked}
                                onChange={() => this.props.parentCallback(!this.props.checked)}
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
                        </React.Fragment>
                    )}
                </Consumer>
        )
    }
}

export default ToggleSwitch;
