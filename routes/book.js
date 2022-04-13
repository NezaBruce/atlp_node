let mongoose = require('mongoose');
let Book = require('../models/book');
/*
 * GET /book маршрут для получения списка всех книг.
 */
function getBooks(req, res) {
let query = Book.find({});
    query.exec((err, books) => {
        if(err) res.send(err);
        //если нет ошибок, отправить клиенту
        res.json(books);
    });
}
/*
 * POST /book для создания новой книги.
 */
function postBook(req, res) {
//   var newBook = new Book(req.body);
  var newBook = new Book({
      title:req.body.title,
      author:req.body.author,
      year:req.body.year,
      pages:req.body.pages,
      
});
    //Сохранить в базу.
    // newBook.save();
    
    // res.json({ message: 'Book created!', newBook });
    newBook.save((err,book) => {
        if(err) {
            res.send(err);
        }
        else { //Если нет ошибок, отправить ответ клиенту
            res.json({message: "Blog successfully added!", book });
        }
    });
}
/*
 * GET /book/:id маршрут для получения книги по ID.
 */
function getBook(req, res) {
    Book.findById(req.params.id, (err, book) => {
        if(err) res.send(err);
        //Если нет ошибок, отправить ответ клиенту
        res.json(book);
    });     
}
/*
 * DELETE /book/:id маршрут для удаления книги по ID.
 */
function deleteBook(req, res) {
    Book.deleteOne({_id : req.params.id}, (err, result) => {
        res.json({ message: "Blog successfully deleted!", result });
    });

}
/*
 * PUT /book/:id маршрут для редактирования книги по ID
 */
function updateBook(req, res) {
    Book.findById({_id: req.params.id}, (err, book) => {
        if(err) res.send(err);
        Object.assign(book, req.body).save((err, book) => {
            if(err) res.send(err);
            res.json({ message: 'Blog updated!', book });
        });
    });
}
module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };