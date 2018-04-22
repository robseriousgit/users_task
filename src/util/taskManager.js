import moment from 'moment';
import Sequelize from 'sequelize';

import models from '../../models';

const Op = Sequelize.Op

const pendingTasks = { where: 
  {
    [Op.and] : [
      { next_execute_date_time: 
        {
          [Op.lt]: moment().format('YYYY-MM-DD HH:mm:ss')
        } 
      },
      {
        status: 'pending'
      }
    ]
  }
};

export const updateScheduledTasks = () => {
  return new Promise((resolve, reject) => {
    models.Task.findAll(pendingTasks)
    .then(tasks => {
      console.log(`Tasks to update: ${tasks.length}`)
      tasks.forEach(task => {
        console.log(JSON.stringify(task))
      })

      models.Task.update(
        { status: 'done' },
        pendingTasks
      )
      .then(status => {
        resolve(status);
      })
      .catch(err => {
        reject( err );
      })
    })
    .catch(err => {
      reject( err );
    })    
  })
}