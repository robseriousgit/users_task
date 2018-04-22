import { expect } from 'chai';
import models from '../../../models'
import { generateTask, generateUser, destroyFixtureData } from '../util/dbFixtures'
import { updateScheduledTasks } from '../../../lib/util/taskManager'

describe('updateScheduledTasks', () => { 

  it('update pending tasks if next_execute_date_time has passed', (done) => {
    generateUser()
      .then(generateTask)  
      .then((taskResponse) => {
        updateScheduledTasks()
        .then(response => {
          expect(response.length).to.eql(1);
          done()
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
  });
})