import models from '../../models'

// note: no req'd fields provided so assuming all are req'd
const validUser = params => (
  (typeof params.username === 'undefined' 
    || typeof params.first_name === 'undefined'
    || typeof params.last_name === 'undefined') ? false : true
)

export const createUser = (req, res, next) => {
  if (!validUser(req.params)) {
    res.send(400, 'Invalid user creation request');
    next();
  } else {
    models.User.create(
      { 
        username: req.params.username,
        first_name: req.params.first_name,
        last_name: req.params.last_name,
      }
    ).then(user => {
      console.log('created a user')
      res.send(200, user)
    })
    .catch(err =>
      res.send(500,'error creating user')
    )
  }
}

export const updateUser = (req, res, next) => {
  models.User.update(
    req.params,
    { where: { id: req.params.userId } }
  )
  .then(status => {
    res.send(200, JSON.parse(status))
  })
  .catch(err => {
    res.send(500,'error updating user')
  })
}

export const getAllUsers = (req, res, next) => {
  models.User.findAll()
  .then(users => {
    res.send(200, users)
  })
  .catch(err => {
    res.send(500,'error retrieving users')
  })
}

export const getUser = (req, res, next) => {
  models.User.findById(req.params.userId)
  .then(user => {
    res.send(200, user)
  })
  .catch(err => {
    res.send(500,'error retrieving user')
  })
}

export const deleteUser = (req, res, next) => {
  models.User.destroy(
    { 
      where: { id: req.params.userId } 
    }
  )
  .then(status => {
    res.send(200, JSON.parse(status))
  })
  .catch(err => {
    res.send(500,'error deleting user')
  })
}