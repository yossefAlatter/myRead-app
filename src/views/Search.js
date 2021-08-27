//== import needed modules ==//
//== start ==//

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './../BooksAPI';
import Book from '../components/Book';

//== end ==//


//== Search Component structure ==//
//== start ==//

class Search extends Component {

  //== needed state ==//
  state = { 
    searchQuery: "" ,
    searchBooks: []
  }


  //== method to control input value ==//
  handleInputChange = (e) =>{

    this.setState({
      searchQuery: e.target.value
    })

  }


  //== method to controll books moving ==//
  controlBookMoving = async(id, val) =>{

    try{
      const res = await BooksAPI.update(id, val);
      console.log(res)
    }catch(err){
      console.log(err)
    }
    
  }


  //== method to search ==//
  fetchData = async () => {
    try{
      const res = await BooksAPI.search(this.state.searchQuery);
      if(res){
        this.setState({
          searchBooks: (res ? res.map(el=>({ id: el.id , bookShelf: el.shelf, bookImage: el.imageLinks.thumbnail, bookTitle: el.title, bookAuthors: [...el.authors]})) : [])
        })
      }else{
        this.setState({
          searchBooks: []
        })
      }
    }catch(err){
      this.setState({
        searchBooks: []
      })
    }
  }

  componentDidMount= async () =>{
    
  }

  //== render Ui ==//
  render() { 
    return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"  value={this.state.searchQuery} onChange={this.handleInputChange}  onKeyUp={this.fetchData}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">

              {(this.state.searchBooks.length) ? this.state.searchBooks.map(el => (<li key={el.id}><Book bookId={el.id} bookImage={el.bookImage} bookTitle={el.bookTitle} bookAuthors={el.bookAuthors} bookShelf={el.bookShelf} controlBookMoving={this.controlBookMoving} /></li>) ) : "" }

              </ol>
            </div>
          </div>
        );
  }
}

//== end ==//


//== export Search component ==//
export default Search;