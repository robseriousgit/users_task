// import { expect } from 'chai';
// import path from 'path'

// import db from '../../../lib/util/db'

// describe('database setup', () => { 
//   it('throws an error if no database file is provided', () => {
//     expect(db).to.throw(/file not provided/);
//   });

//   it('returns an error if file does not exist', () => {
//     expect(() => {
//       db('db_filenamekhjgkjhjfhfkgf');
//     }).to.throw(/unable to open database file/);    
//   });

//   it('returns a db connector if file is provided', () => {
//     const dbObject = db('src/test/fixtures/db_filename');
//     expect(dbObject).to.have.ownProperty('name');
//   });

// })