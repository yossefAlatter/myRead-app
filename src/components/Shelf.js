import React from 'react';
import Book from './Book';

const Shelf = ({shelfTitle, shelfItems, controlBookMoving})=>(
  <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">

        {/* dynamic display for currently shelf */}
        {(shelfItems) ? shelfItems.map(el => (<li key={el.id}><Book bookId={el.id} bookImage={el.bookImage} bookTitle={el.bookTitle} bookAuthors={el.bookAuthors} bookShelf={el.bookShelf} controlBookMoving={controlBookMoving} /></li>)) : (<li className="loading">Loading</li>)}

      </ol>
    </div>
  </div>
);

export default Shelf ;