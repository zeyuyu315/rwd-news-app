import React, { Component } from 'react';
import './Badge.css';

class Badge extends Component {

    render() {
        let section = this.props.section;
        let textColor = "white";
        let backgroundColor = "";
        if (section === "WORLD") {
            backgroundColor = "#7A4CFE";
        } else if (section === "POLITICS") {
            backgroundColor = "#419488";
        } else if (section === "BUSINESS") {
            backgroundColor = "#4695EC";
        } else if (section === "TECHNOLOGY") {
            textColor = "black";
            backgroundColor = "#CEDC39";
        } else if (section === "SPORT" || section === "SPORTS" ) {
            section = "SPORTS";
            textColor = "black";
            backgroundColor = "#F6C244";
        } else if (section === "GUARDIAN") {
            backgroundColor = "#14294A";
        } else if (section === "NYTIMES") {
            textColor = "black";
            backgroundColor = "#DDDDDD";
        } else {
            backgroundColor = "#6E757C";
        }
        return (
            <div className="card-section" style={{color: textColor, backgroundColor: backgroundColor}}>
                {section}
            </div>
        )
    }
}

export default Badge
