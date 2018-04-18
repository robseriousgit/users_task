import { expect } from 'chai';
import request from 'supertest';
import server from '../../../lib/index'

describe('Health check route', () => {
  it('returns ok', () => {
    request(server).get('/__health').end((err, res) => {
      expect(res.statusCode).to.eql(200);
      expect(res.body).to.eql('OK');
    });
  });
});

describe('User routes', () => {
  let models;

  beforeEach(() => {
    models = require('../../../models');
  });

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
    models.User.create(
      { 
        username: 'testUser', 
        first_name: 'first_name', 
        last_name: 'last_nae'
      }
    ).then((user) => {
      request(server)
        .put(`/api/users/${user.id}`)
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
    models.User.create(
      { 
        username: 'testUser', 
        first_name: 'first_name_something_unique', 
        last_name: 'last_nae'
      }
    ).then((user) => {
      request(server)
        .get(`/api/users/${user.id}`)
        .then(res => {
          expect(res.body.first_name).to.eql('first_name_something_unique');
          done();
        })
        .catch(err => {
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
    models.User.create(
      { 
        username: 'testUser', 
        first_name: 'first_name', 
        last_name: 'last_nae'
      }
    ).then((user) => {
      request(server)
        .delete(`/api/users/${user.id}`)
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
  let models;

  beforeEach(() => {
    models = require('../../../models');
  });

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
    models.User.create(
      { 
        username: 'testUser', 
        first_name: 'first_name_something_unique', 
        last_name: 'last_nae'
      }
    ).then((user) => {
      request(server)
        .post(`/api/users/${user.id}/tasks`)
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
    models.User.create(
      { 
        username: 'testUser', 
        first_name: 'first_name', 
        last_name: 'last_nae'
      }
    ).then((user) => {
      models.Task.create(
        {
          "name":"My task",
          "description" : "Description of task", 
          "date_time" : "2016-05-25 14:25:00",
          "UserId": user.id
        })
        .then((task) => {
          request(server)
            .put(`/api/users/${user.id}/tasks/${task.id}`)
            .type('form')
            .send({name:"My updated task"})
            .then((res) => {
              // 1 if successful (number of rows updated)
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
    models.User.create(
      { 
        username: 'testUser', 
        first_name: 'first_name', 
        last_name: 'last_nae'
      }
    ).then((user) => {
      models.Task.create(
        {
          "name":"My task",
          "description" : "Description of task", 
          "date_time" : "2016-05-25 14:25:00",
          "UserId": user.id
        })
        .then((task) => {
          request(server)
            .delete(`/api/users/${user.id}/tasks/${task.id}`)
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
    models.User.create(
      { 
        username: 'testUser', 
        first_name: 'first_name', 
        last_name: 'last_nae'
      }
    ).then((user) => {
      models.Task.create(
        {
          "name":"My task",
          "description" : "Description of task", 
          "date_time" : "2016-05-25 14:25:00",
          "UserId": user.id
        })
        .then((task) => {
          request(server)
            .get(`/api/users/${user.id}/tasks/${task.id}`)
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

  it('gets all task details for user', (done) => {
    models.User.create(
      { 
        username: 'testUser', 
        first_name: 'first_name', 
        last_name: 'last_nae'
      }
    ).then((user) => {
      models.Task.create(
        {
          "name":"My task",
          "description" : "Description of task", 
          "date_time" : "2016-05-25 14:25:00",
          "UserId": user.id
        })
        .then(task => {
          models.Task.create(
            {
              "name":"My task2",
              "description" : "Description of task", 
              "date_time" : "2016-05-25 14:25:00",
              "UserId": user.id
            })
            .then(task => {
              request(server)
                .get(`/api/users/${user.id}/tasks`)
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
    models.Task.destroy({
      where: {
        description: 'Description of task'
      }
    });
    models.User.destroy({
      where: {
        username: 'testUser'
      }
    });
  });
});