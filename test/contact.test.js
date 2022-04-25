import Contact from '../models/contact.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
let should = chai.should();
chai.use(chaiHttp);
describe('Contacts', () => {
    beforeEach((done) => { 
        Contact.deleteMany({}, (err) => { 
           done();         
        });     
    });
  // describe('/GET contact', () => {
  //     it('it should GET all the contacts', (done) => {
  //       chai.request(server)
  //           .get('/cont/contact')
  //           .end((err, res) => {
  //             should.exist(res.body);
  //               res.should.have.status(200);
  //               res.body.should.be.a('array');
  //               res.body.length.should.be.eql(0);
  //             done();
  //           });
  //     });
  // });
  describe('/POST contact', () => {
    // it('it should not POST a contact without name field', (done) => {
    //   let contact = {
    //       email:"bruce@gmail.com",
    //       message:"The Lord of the Rings"
    //   }
    //   chai.request(server)
    //       .post('/cont/contact')
    //       .send(contact)
    //       .end((err, res) => {
    //         // should.exist(res.body);
    //           res.should.have.status(200);
    //           res.body.should.be.a('object');
    //           res.body.should.have.property('errors');
    //           res.body.errors.should.have.property('name');
    //           res.body.errors.name.should.have.property('kind').eql('required');
    //         done();
    //       });
    // });
    // it('it should not POST a contact without email field', (done) => {
    //   let contact = {
    //       email:"bruce@gmail.com",
    //       message:"The Lord of the Rings"
    //   }
    //   chai.request(server)
    //       .post('/cont/contact')
    //       .send(contact)
    //       .end((err, res) => {
    //         // should.exist(res.body);
    //           res.should.have.status(200);
    //           res.body.should.be.a('object');
    //           res.body.should.have.property('errors');
    //           res.body.errors.should.have.property('name');
    //           res.body.errors.name.should.have.property('kind').eql('required');
    //         done();
    //       });
    // });
    // it('it should not POST a contact without message field', (done) => {
    //   let contact = {
    //       email:"bruce@gmail.com",
    //       message:"The Lord of the Rings"
    //   }
    //   chai.request(server)
    //       .post('/cont/contact')
    //       .send(contact)
    //       .end((err, res) => {
    //         // should.exist(res.body);
    //           res.should.have.status(200);
    //           res.body.should.be.a('object');
    //           res.body.should.have.property('errors');
    //           res.body.errors.should.have.property('name');
    //           res.body.errors.name.should.have.property('kind').eql('required');
    //         done();
    //       });
    // });
    it('it should POST a contact ', (done) => {
      let contact = {
        name: "bruce",
        email:"bruce@gmail.com",
        message:"The Lord of the Rings"
    }
        chai.request(server)
            .post('/cont/contact')
            .send(contact)
            .end((err, res) => {
              should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Contact successfully added!');
                res.body.contact.should.have.property('name');
                res.body.contact.should.have.property('email');
                res.body.contact.should.have.property('message');
              done();
            });
      })
});
});
