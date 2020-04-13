import React, { Component } from 'react';
import './Spinner.css';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

class Spinner extends Component {
    render() {
        return (
            <div className="load-box">
                <BounceLoader css={override} color={"#4060B2"} size={40}></BounceLoader>
                <h3>Loading</h3>
            </div>
        )
    }
}

export default Spinner;

