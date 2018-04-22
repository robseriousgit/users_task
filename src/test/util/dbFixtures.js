import models from '../../../models'

export const generateUser = () => {
  return new Promise((resolve, reject) => {
    models.User.create(
      { 
        username: 'testUser', 
        first_name: 'first_name', 
        last_name: 'last_nae'
      }
    ).then((user) => {
      resolve(user.id);
    })
  })
}

export const generateTask = (userId) => {
  return new Promise((resolve, reject) => {
    models.Task.create(
      {
        name:"My task",
        description : "Description of task", 
        date_time : "2016-05-25 14:25:00",
        UserId: userId,
        next_execute_date_time: "2016-05-25 14:25:00", // set to date past to test scheduler
      })
    .then((task) => {
      resolve({taskId: task.id, userId} );
    })
  })
}

export const destroyFixtureData = () => {
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
}