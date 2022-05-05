const Blog = require('../models/blog.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
let should = chai.should();
// import should from 'should';
chai.use(chaiHttp);
describe('Blogs', () => {
    beforeEach((done) => { 
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
              should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST blog', () => {
    it('it should not POST a blog without title field', (done) => {
      let blog = {
          title: "The Lord of the Rings",
          content:"Content ofThe Lord of the Rings"
      }
      chai.request(server)
          .post('/Testblog')
          .send(blog)
          .end((err, res) => {
            // should.exist(res.body);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('image');
              res.body.errors.image.should.have.property('kind').eql('required');
            done();
          });
    });
    it('it should not POST a blog without image field', (done) => {
      let blog = {
          title: "The Lord of the Rings",
          content:"Content ofThe Lord of the Rings"
      }
      chai.request(server)
          .post('/Testblog')
          .send(blog)
          .end((err, res) => {
            // should.exist(res.body);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('image');
              res.body.errors.image.should.have.property('kind').eql('required');
            done();
          });
    });
    it('it should not POST a blog without content field', (done) => {
      let blog = {
          title: "The Lord of the Rings",
          content:"Content ofThe Lord of the Rings"
      }
      chai.request(server)
          .post('/Testblog')
          .send(blog)
          .end((err, res) => {
            // should.exist(res.body);
                res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('image');
              res.body.errors.image.should.have.property('kind').eql('required');
            done();
          });
    });
    it('it should POST a blog ', (done) => {
        let blog = {
          title: "The Lord of the Rings",
          image:"https://image.png",
          content:"Content ofThe Lord of the Rings",
          cloudinary_id:"zhnzzvgf1kd6ajyfzvxx"
        }
        chai.request(server)
            .post('/Testblog')
            .send(blog)
            .end((err, res) => {
              should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Blog successfully added!');
                res.body.blog.should.have.property('title');
                res.body.blog.should.have.property('image');
                res.body.blog.should.have.property('content');
              done();
            });
      })
});
  describe('/GET/:id blog', () => {
    it('it should GET a blog by given id', (done) => {
      let blog = new Blog({ title: "The Lord of the Rings", image:"https://image.png",content:"Content ofThe Lord of the Rings",cloudinary_id:"zhnzzvgf1kd6ajyfzvxx" });
      blog.save((err, blog) => {
          chai.request(server)
          .get('/blog/' + blog.id)
          .send(blog)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('title');
              res.body.should.have.property('image');
              res.body.should.have.property('content');
              res.body.should.have.property('_id').eql(blog.id);
            done();
          });
      });
    });
});
describe('/PUT/:id blog', () => {
    it('it should UPDATE a blog by given id', (done) => {
      let blog = new Blog(
        {
          title: "The Lord of the Rings", 
          image:"https://image.png",
          content:"Content ofThe Lord of the Rings",
          cloudinary_id:"zhnzzvgf1kd6ajyfzvxx"
        }
      )
      blog.save((err, blog) => {
              chai.request(server)
              .put('/Testblog/' + blog.id)
              .send(
                {
                  title: "The Chronicles of Narnia", 
                  image:"https://updatesimage.png",
                  content:"Content ofThe Chronicles of Narnia",
                  cloudinary_id:"zhnzzvgf1kd6ajyfzvxx"
                }
              )
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
      let blog = new Blog({
        title: "The Chronicles of Narnia", 
        image:"https://updatesimage.png",
        content:"Content ofThe Chronicles of Narnia",
        cloudinary_id:"zhnzzvgf1kd6ajyfzvxx"
      })
     blog.save((err, blog) => {
              chai.request(server)
              .delete('/Testblog/' + blog._id)
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
