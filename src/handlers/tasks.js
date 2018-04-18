const models  = require('../../models');

export const validTask = params => (
  (typeof params.name === 'undefined' 
    || typeof params.description === 'undefined'
    || typeof params.date_time === 'undefined') ? false : true
)

export const createTask = (req, res, next) => {
  // note: error handle to check if user exists
  if (!validTask(req.params)) {
    res.send(400, 'Invalid task creation request');
    next();
  } else {
    models.Task.create(
      { 
        name: req.params.name,
        description: req.params.description,
        date_time: req.params.date_time,
        UserId: req.params.userId
      }
    ).then(task => {
      console.log('created a task')
      res.send(200, task)
    })
    .catch(err =>
      res.send(500,'error creating task', err)
    )
  }
}

export const updateTask = (req, res, next) => {
  models.Task.update(
    req.params,
    { where: { id: req.params.taskId } }
  )
  .then(status => {
    res.send(200, JSON.parse(status))
  })
  .catch(err => {
    res.send(500,'error updating user')
  })
}

export const deleteTask = (req, res, next) => {
  models.Task.destroy(
    { 
      where: { id: req.params.taskId } 
    }
  )
  .then(status => {
    res.send(200, JSON.parse(status))
  })
  .catch(err => {
    res.send(500,'error deleting task')
  })
}

export const getTask = (req, res, next) => {
  models.Task.findById(req.params.taskId)
  .then(task => {
    res.send(200, task)
  })
  .catch(err => {
    res.send(500,'error retrieving task')
  })
}

export const getUserTasks = (req, res, next) => {
  models.Task.findAll(
    { 
      where: { UserId: req.params.userId } 
    }
  )
  .then(tasks => {
    res.send(200, tasks)
  })
  .catch(err => {
    res.send(500,'error retrieving user tasks')
  })
}