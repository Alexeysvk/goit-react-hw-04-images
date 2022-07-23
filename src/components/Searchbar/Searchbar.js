import React, { Component } from "react";
import { toast } from "react-toastify";
import iconSearch from '../../search.svg'
import PropTypes from 'prop-types';

class SearchBar extends Component{
state={
    searchQuery: '',
    page: 1,
    images: [],
}


handleNameChange = e =>{
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() })
}


handleSubmit = e =>{
    e.preventDefault();

    if(this.state.searchQuery.trim() === ''){
        toast.error('Enter the request');
        return;
    }

    this.props.onSubmit(this.state.searchQuery)
    this.setState({searchQuery: '', page: 1})
}


 render(){
     return(
        <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm" >
          <button type="submit" className="SearchForm-button">
           <img src={iconSearch} alt="" width= "32"/>
          </button>
      
          <input
            value= {this.state.searchQuery}
            onChange={this.handleNameChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
     )

 }
}

SearchBar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;