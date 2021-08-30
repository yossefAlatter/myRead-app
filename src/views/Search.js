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
    searchBooks: [],
    allData: []
  }


  //== method to control input value ==//
  handleInputChange = async (e) =>{

    this.setState({
      searchQuery: e.target.value
    });

    await this.fetchData() ;

  }

  componentDidMount= async () =>{
    const res = await BooksAPI.getAll() ;

    this.setState({
      allData: [...res]
    })
  }

  //== method to controll books moving ==//
  controlBookMoving = async(id, val) =>{

    try{
      await BooksAPI.update(id, val);
    }catch(err){
      console.log(err)
    }
    
  }

  //== function to make sure of books selves ==//
  searchInSelves = (id) => {

    const searched = this.state.allData.find((el)=> el.id === id) ;
    if(searched){
      return searched.shelf;
    }else{
      return undefined;
    }

  }

  //== method to search ==//
  fetchData = async () => {

    document.getElementById("container-items").style.display = "none" ;
    document.querySelector(".loading").style.display = "block";
    try{
      const res = await BooksAPI.search(this.state.searchQuery);
      if(res){
        this.setState({
          searchBooks: (res ? res.map((el)=>({ id: el.id , bookShelf: this.searchInSelves(el.id), bookImage: el.imageLinks.thumbnail, bookTitle: el.title, bookAuthors: [...el.authors]})) : [])
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
    document.querySelector(".loading").style.display = "none";
    document.getElementById("container-items").style.display = "flex" ;

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
                <input type="text" placeholder="Search by title or author"  value={this.state.searchQuery} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="search-books-results">
              <div className="loading" style={{display: "none"}}>Loading...</div>
              <ol className="books-grid" id="container-items">
              {(this.state.searchBooks.length) ? this.state.searchBooks.map(el => (<li key={el.id}><Book bookId={el.id} bookImage={el.bookImage} bookTitle={el.bookTitle} bookAuthors={el.bookAuthors} bookShelf={el.bookShelf} controlBookMoving={this.controlBookMoving} /></li>) ) : <li className="no-items" >There are no items</li> }

              </ol>
            </div>
          </div>
        );
  }
}

//== end ==//


//== export Search component ==//
export default Search;