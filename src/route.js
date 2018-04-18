import { status } from './handlers/status';

import * as Users from './handlers/users';

import * as Tasks from './handlers/tasks';

export default (server) => {
  // Status check
  server.get('/__health', status);

  // Users CRUD
  server.post('/api/users', Users.createUser)
  server.put('/api/users/:userId', Users.updateUser)
  server.get('/api/users', Users.getAllUsers)
  server.get('/api/users/:userId', Users.getUser)
  server.del('/api/users/:userId', Users.deleteUser)

  // Tasks CRUD
  server.post('/api/users/:userId/tasks', Tasks.createTask)
  server.put('/api/users/:userId/tasks/:taskId', Tasks.updateTask)
  server.del('/api/users/:userId/tasks/:taskId', Tasks.deleteTask)
  server.get('/api/users/:userId/tasks/:taskId', Tasks.getTask)
  server.get('/api/users/:userId/tasks', Tasks.getUserTasks)
};
