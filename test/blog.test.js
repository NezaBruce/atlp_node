import Blog from '../models/blog.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './index.js';
// More than ever, it is vital for Africa to prepare her youth for the digital economy and the future of work. The World Development Report 2019 notes that the labour market of the future will require new skills including digital fluency, creative thinking, problem-solving, collaboration, empathy and adaptability. With these new demands in place, it would be remiss of Africa not to strengthen her biggest asset: the youth who make up around 60% of the continent’s population.

// Appropriate action will help the continent to harness this promising demographic dividend. Furthermore, a proactive stance is likely to reduce the risk of massive labour substitution and endemic unemployment, while enabling the continent to leverage the new entrepreneurial and economic opportunities associated with the digital economy.

// Although countries like Rwanda and Kenya are already making considerable progress in preparing their youth for the digital economy and the future of work, more African countries are yet to take meaningful action to address the yawning skills-gap and digital infrastructure inadequacies bedevilling the continent. Here are four strategies African nations should use to prepare their youth for the digital economy and the future of work:
// 1. Creating responsive education systems

// This entails reviewing and updating the education curricula at primary, secondary and tertiary levels. Equipping youth with technical skills like digital fluency will empower them to assume responsibilities like coding and virtual designing, which will be in demand in the digital economy.

// 2. Formulating policies for the digital economy

// Given the uncertainties of the technological revolution and the consequent susceptibility of the digital economy to cyber-crime and monopolies, African nations must formulate regulatory policies that keep stakeholders in check. Such policies will help to create an environment in which young people’s digital enterprises can grow, and in which appropriate education and employment opportunities will be accessible to all young people.

// 3. Expanding digital infrastructure

// Developing nationwide digital infrastructure, especially fibre optic networks, and improving access to electricity and digital devices may help to improve connectivity within African nations. This will enable more young people, including those in rural areas, to access high-speed internet as they acquire and utilise new skills - thereby alleviating inequalities and optimising shared prosperity in a digital economy. The Icyerekezo broadband satellite launched by Rwanda in February 2019 is a good example of expanding digital infrastructure - and which can be emulated by other African nations.

// 4. Optimising public-private cooperation

// Collaboration between governments, multinational development banks and the private sector will create room for innovative financial models which promote upskilling among Africa’s youth. This will also reduce inequalities caused by duplication of efforts, especially when establishing digital infrastructure in African nations. Public-private cooperation will therefore enable more young Africans to access training programmes and digital infrastructure.

// If African nations do adopt the above-outlined strategies, they will enhance the chances of Africa’s youth to prosper in the digital economy and the future of work. With a well-prepared young population, it will be possible for Africa to leapfrog into prosperity and make progress towards achieving the African Union’s Agenda 2063 programme, which aims to transform Africa into a global powerhouse. Implementing the proposed strategies will, however, require genuine political will and unwavering commitment on the part of African governments and their citizens.
let should = chai.should();
// import should from 'should';
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