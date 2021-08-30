// == import modules needed ==//
//== start ==//

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from '../components/Shelf';
import * as BooksAPI from './../BooksAPI';

//== end ==//


//== Home Component structure ==//
//== start ==//

class Home extends Component {

  //== needed state ==//
  state = { 
    allData: null,
    currentlyReading: null, // => for current Read Shelf
    wantToRead: null, // => for Want to read shelf
    read: null // => for read shelf
  }


  //== handle functions occurs we Component DOM mounted ==//
  componentDidMount = async () => {

    // get all data
    let comingAllData = await BooksAPI.getAll() ;

    // store coming data
    this.setState({
      allData: [...comingAllData]
    });

    //== filter and store data ==//
    this.filterAndStore();

  }

  //== method to filter and store alldata state ==//
  filterAndStore= () =>{

        // filter coming data 
        const comingCurrentlyReading = this.state.allData.filter((el)=> el.shelf === "currentlyReading" ).map(el=>({ id: el.id , bookShelf: el.shelf, bookImage: el.imageLinks.thumbnail, bookTitle: el.title, bookAuthors: [...el.authors]}));
        const comingWanToReading = this.state.allData.filter((el)=> el.shelf === "wantToRead" ).map(el=>({ id: el.id , bookShelf: el.shelf, bookImage: el.imageLinks.thumbnail, bookTitle: el.title, bookAuthors: [...el.authors] }));
        const comingRead = this.state.allData.filter((el)=> el.shelf === "read" ).map(el=>({ id: el.id , bookShelf: el.shelf, bookImage: el.imageLinks.thumbnail, bookTitle: el.title, bookAuthors: [...el.authors] }));
    
        // store filter data
        this.setState({
          currentlyReading: [...comingCurrentlyReading],
          wantToRead: [...comingWanToReading],
          read: [...comingRead]
        });
    
  }


  //== method to control moving between shelfs ==//
  controlBookMoving = async (book, val) =>{

    // create new data with current movements
    const changedData = this.state.allData.map(el =>{
      if(book.id === el.id){
        el.shelf = val;
        return el ;
      }else{
        return el ;
      }
    });

    // store current movements data
    this.setState({
      allData: [...changedData]
    });

    // filter and store data
    this.filterAndStore();

    try{
      await BooksAPI.update(book, val);
    }catch(err){
      console.log(err)
    }

  }


  //== render Component UI ==//
  render() { 
    const myShelf = [
      {
        title: "Currently Reading",
        items: this.state.currentlyReading
      },
      {
        title: "Want To Read",
        items: this.state.wantToRead
      },
      {
        title: "Read",
        items: this.state.read
      },
    ];
    return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                {myShelf.map(el=>(<Shelf shelfTitle={el.title} shelfItems={el.items} controlBookMoving={this.controlBookMoving} key={el.title} />))}

              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        );
  }
}

//== end ==//


//== export Home Component ==//
export default Home;