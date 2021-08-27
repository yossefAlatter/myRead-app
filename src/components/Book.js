//== import needed modules ==//
//== start ==//

import React from 'react'

//== end ==//


//== Book Component Structure ==//
//== start ==//

const Book = ({bookId, bookImage, bookTitle, bookAuthors,bookShelf , controlBookMoving}) => 
  (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookImage})` }}></div>
        <div className="book-shelf-changer">
          <select onChange={(e)=>{controlBookMoving(bookId, e.target.value)}} value={bookShelf || "none"}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookTitle}</div>
      <div className="book-authors">{bookAuthors}</div>
    </div>
  );

//== end ==//


//== export Book Component ==//
export default Book ;