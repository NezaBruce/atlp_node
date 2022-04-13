//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Blog = require('../models/book');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
//Наш основной блок
describe('Blogs', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        Blog.deleteMany({}, (err) => { 
           done();         
        });     
    });
/*
  * Тест для /GET 
  */
  describe('/GET blog', () => {
      it('it should GET all the blogs', (done) => {
        chai.request(server)
            .get('/blog')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST blog', () => {
    it('it should not POST a blog without pages field', (done) => {
      let book = {
          title: "The Lord of the Rings",
          author: "J.R.R. Tolkien",
          year: 1954
      }
      chai.request(server)
          .post('/blogs')
          .send(book)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('pages');
              res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });
    
});
it('it should POST a blog ', (done) => {
    let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 1170
    }
    chai.request(server)
        .post('/blogs')
        .send(book)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Blog successfully added!');
            res.body.book.should.have.property('title');
            res.body.book.should.have.property('author');
            res.body.book.should.have.property('pages');
            res.body.book.should.have.property('year');
          done();
        });
  })
  describe('/GET/:id blog', () => {
    it('it should GET a blog by given id', (done) => {
      let book = new Blog({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
      book.save((err, book) => {
          chai.request(server)
          .get('/blog/' + book.id)
          .send(book)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('title');
              res.body.should.have.property('author');
              res.body.should.have.property('pages');
              res.body.should.have.property('year');
              res.body.should.have.property('_id').eql(book.id);
            done();
          });
      });
    });
});
describe('/PUT/:id blog', () => {
    it('it should UPDATE a blog by given id', (done) => {
      let book = new Blog({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
      book.save((err, book) => {
              chai.request(server)
              .put('/blog/' + book.id)
              .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Blog updated!');
                done();
              });
        });
    });
});
describe('/DELETE/:id blog', () => {
    it('it should DELETE a blog by given id', (done) => {
      let book = new Blog({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
      book.save((err, book) => {
              chai.request(server)
              .delete('/blog/' + book._id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Blog successfully deleted!');
                done();
              });
        });
    });
});
});