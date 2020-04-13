import React, { Component } from 'react'

export const Context = React.createContext();

export class Provider extends Component {
    state = {
        switchShow: true,
        article: "",
        searchString: true,
        searchItem: "",
        bookmark: true,
    }

    render() {
        return (
            <Context.Provider value={{
                state: this.state,
                openSwitchShow: () => this.setState({switchShow: true, searchString: !this.state.searchString, searchItem: "", bookmark: true}),
                closeSwitchShow: () => this.setState({switchShow: false}),
                getDetailedArticle: (article) => this.setState({article: article}),
                changeSearch: (input) => this.setState({searchItem: input}),
                changeSearchString: () => this.setState({searchString: !this.state.searchString}),
                openFavorite: ()=> this.setState({bookmark: false}),
                closeFavorite: ()=> this.setState({bookmark: true})
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
