// import User from '../models/user.js';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../index.js';
// let should = chai.should();
// chai.use(chaiHttp);
// const tempUser={
// "first_name":"bruce",
// "last_name":"lee",
// "email":"lee@gmail.com",
// "password":"lee@gmail.com"
// }
// describe('Auths', () => {
//     beforeEach((done) => { 
//       User.deleteMany({}, (err) => { 
//            done();         
//         });     
//     });
//   describe("Register users", () => {
//     it("should register new user with valid credentials", (done) => {
//       chai.request(server)
//         .post("/users/signup")
//         .send(tempUser)
//         .expect(200)
//         .then((res) => {
//           expect(res.body.username).to.be.eql("process.env.USER_TEST");
//           done();
//         })
//         .catch((err) => done(err));
//     });
  
//     it("shouldn't accept the username that already exists in the database", (done) => {
//       chai.request(server)
//         .post("/auth/register")
//         .send(tempUser)
//         .expect(400)
//         .then((res) => {
//           expect(res.body.message).to.be.eql("Username is already in use");
//           done();
//         })
//         .catch((err) => done(err));
//     })
// });
//   describe("login users", () => {
//     it("should login with valid credentials", (done) => {
//            chai.request(server)
//                     .post('/auth/login')
//                     .send({
//                         "email": "mail@petersen.com",
//                         "password": "123456"
//                     })
//                .end((err, res) => {
//                         // Asserts                        
//                         expect(res.status).to.be.equal(200);
//                 expect(res.body.error).to.be.equal(null);                        
//                 let token = res.body.data.token;
//     });
//     });
  
// });
//   describe("GET All  /", () => {
//     it("should return all users",  (done) => {
//       const users = [
//         { name: "george", email: "geo@gmail.com"},
//         { name: "maria", email: "maria@gmail.com" }
//       ];
//     User.insertMany(users);
//       const res =request.get("/blog/blog");
//       expect(200);
//       done();
//     });
//   });
//    describe("PUT /:id", () => {
//     it("should update the existing user and return 200", async() => {
//         const user = new User({
//             name: "lola",
//             email: "lola@gmail.com",
//             country: "spain"
//         });
//         await user.save();

//         const res = await request(app)
//             .put("/api/users/" + user._id)
//             .send({
//                 name: "juan",
//                 email: "juan@gmail.com",
//                 country: "spain"
//             });

//       expect(res.status).to.equal(200);
//       expect(res.body).to.have.property("name", "juan");
//       expect(res.body).to.have.property("email", "juan@gmail.com");
//       expect(res.body).to.have.property("country", "spain");
//     });
//   });

//   describe("DELETE /:id", () => {
//     it("should delete requested id and return response 200", async () => {
//       const user = new User({
//         name: "george",
//         email: "geo@gmail.com",
//         country: "spain"
//       });
//       await user.save();
//       userId = user._id;
//       const res = await request(app).delete("/api/users/" + userId);
//       expect(res.status).to.be.equal(200);
//     });

//     it("should return 404 when deleted user is requested", async () => {
//       let res = await request(app).get("/api/users/" + userId);
//       expect(res.status).to.be.equal(404);
//     });
//   });
// });