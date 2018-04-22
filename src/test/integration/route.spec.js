import { expect } from 'chai';
import request from 'supertest';
import models from '../../../models'
import server from '../../../lib/index'
import { generateTask, generateUser, destroyFixtureData } from '../util/dbFixtures'

describe('Health check route', () => {
  it('returns ok', () => {
    request(server).get('/__health').end((err, res) => {
      expect(res.statusCode).to.eql(200);
      expect(res.body).to.eql('OK');
    });
  });
});

describe('User routes', () => {

  it('returns a create error if invalid user params sent', () => {
    request(server)
    .post('/api/users')
    .send({something: 'incorrect'})
    .type('form')
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
    });
  })

  it('creates a user', () => {
    request(server)
    .post('/api/users')
    .send({username: 'testUser', first_name: 'first_name', last_name: 'last_name'})
    .type('form')
    .end((err, res) => {
      expect(res.body.username).to.eql('testUser');
    });
  })

  it('updates a user', (done) => {
    generateUser()
    .then((userId) => {
      request(server)
        .put(`/api/users/${userId}`)
        .type('form')
        .send({username: 'testUserUpdate', first_name: 'first'})
        .then((res) => {
          // 1 if successful (number of rows updated)
          expect(res.body).to.eql(1);
          done();
        })
        .catch(err => {
          expect(err).to.eql(null); // indicative of failure
          done();
        })
    })
    .catch(err => {
      console.log(err);
      expect(0).to.eql(1); // indicative of failure
      done();
    })
  });

  it('gets user info', (done) => {
    //ensure at least one user will be returned
    generateUser()
    .then((userId) => {
      request(server)
        .get(`/api/users/${userId}`)
        .then(res => {
          
          expect(res.body.first_name).to.eql('first_name');
          done();
        })
        .catch(err => {
          console.log(err);
          expect(err).to.eql(null); // indicative of failure
          done();
        })
    })
    .catch(err => {
      expect(0).to.eql(1); // indicative of failure
      done();
    })
  })
  
  it('deletes a user', (done) => {
    generateUser()
    .then((userId) => {
      request(server)
        .delete(`/api/users/${userId}`)
        .then((res) => {
          // 1 if successful (number of rows deleted)
          expect(res.body).to.eql(1);
          done();
        })
        .catch(err => {
          expect(err).to.eql(null); // indicative of failure
          done();
        })
    })
    .catch(err => {
      console.log(err);
      expect(0).to.eql(1); // indicative of failure
      done();
    })
  });
  
  after(() => {
    models.User.destroy({
      where: {
        username: 'testUser'
      }
    });
    models.User.destroy({
      where: {
        username: 'testUserUpdate'
      }
    });
  });
});

describe('Task routes', () => {

  it('returns a create error if invalid user params sent', () => {
    request(server)
    .post('/api/users')
    .send({something: 'incorrect'})
    .type('form')
    .end((err, res) => {
      expect(res.statusCode).to.equal(400);
    });
  })

  it('creates a task', (done) => {
    generateUser()
    .then((userId) => {
      request(server)
        .post(`/api/users/${userId}/tasks`)
        .send({
          "name":"My task",
          "description" : "Description of task", 
          "date_time" : "2016-05-25 14:25:00"
        })
        .type('form')
        .then(res => {
          expect(res.body.description).to.eql('Description of task');
          done();
        })
        .catch(err => {
          console.log(err);
          expect(err).to.eql(null); // indicative of failure
          done();
        });
    })
    .catch(err => {
      expect(err).to.eql(null); // indicative of failure
      done();
    })
  })
  
  it('updates a task', (done) => {
    generateUser()
      .then(generateTask)  
      .then((taskResponse) => {
        request(server)
          .put(`/api/users/${taskResponse.userId}/tasks/${taskResponse.taskId}`)
          .type('form')
          .send({name:"My updated task"})
          .then((res) => {
            // 1 if successful (number of rows updated)
            expect(res.body).to.eql(1);
            done();
          })
          .catch(err => {
            expect(err).to.eql(null); // indicative of failure
            done();
          })
      })
      .catch(err => {
        console.log(err);
        expect(0).to.eql(1); // indicative of failure
        done();
      })
  });

  it('deletes a task', (done) => {
    generateUser()
      .then(generateTask)  
      .then((taskResponse) => {
        request(server)
          .delete(`/api/users/${taskResponse.userId}/tasks/${taskResponse.taskId}`)
          .then((res) => {
            // 1 if successful (number of rows deleted)
            expect(res.body).to.eql(1);
            done();
          })
          .catch(err => {
            console.log(err);
            expect(err).to.eql(null); // indicative of failure
            done();
          })
        })
      
      .catch(err => {
        console.log(err);
        expect(0).to.eql(1); // indicative of failure
        done();
      })
  });

  it('gets task details', (done) => {
    generateUser()
      .then(generateTask)  
      .then((taskResponse) => {
          request(server)
            .get(`/api/users/${taskResponse.userId}/tasks/${taskResponse.taskId}`)
            .then((res) => {
              // 1 if successful (number of rows updated)
              expect(res.body.description).to.eql("Description of task");
              done();
            })
            .catch(err => {
              console.log(err);
              expect(err).to.eql(null); // indicative of failure
              done();
            })
        })
      .catch(err => {
        console.log(err);
        expect(0).to.eql(1); // indicative of failure
        done();
      });
  });

  it('gets all task details for user', (done) => {
    generateUser()
      .then(generateTask)  
      .then((taskResponse) => {
        // messy nested prmomise, but we need a second task created
        generateTask(taskResponse.userId)
          .then(taskResponse2 => {
            request(server)
              .get(`/api/users/${taskResponse2.userId}/tasks`)
              .then((res) => {
                // 1 if successful (number of rows updated)
                expect(res.body.length).to.eql(2);
                done();
              })
              .catch(err => {
                console.log(err);
                expect(err).to.eql(null); // indicative of failure
                done();
              })
          })
          .catch(err => {
            console.log(err);
            expect(err).to.eql(null); // indicative of failure
            done();
          })
        .catch(err => {
          console.log(err);
          expect(err).to.eql(null); // indicative of failure
          done();
        }) 
    })
    .catch(err => {
      console.log(err);
      expect(0).to.eql(1); // indicative of failure
      done();
    })
  });

  after(() => {
    destroyFixtureData();
  })
});