import { useState } from "react";
import { toast, ToastContainer} from "react-toastify";
import iconSearch from '../../search.svg'
import PropTypes from 'prop-types';

function SearchBar ({onSubmit}){
  const [searchQuery, setSearchQuery]= useState('');

const handleNameChange = e => setSearchQuery( e.currentTarget.value.toLowerCase() )


const handleSubmit = e =>{
    e.preventDefault();

    if(searchQuery.trim() === ''){
        toast.error('Enter the request');
        return;
    }else{
      onSubmit(searchQuery)
      setSearchQuery('')
    }

}


 
     return(
        <header className="Searchbar">
            <form 
              onSubmit={handleSubmit} 
              className="SearchForm" 
            >
          <button type="submit" className="SearchForm-button">
           <img src={iconSearch} alt="" width= "32"/>
          </button>
      
          <input
            value= {searchQuery}
            onChange={handleNameChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
        <ToastContainer autoClose={3000} theme={'colored'}/>
      </header>
     )

}

SearchBar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;