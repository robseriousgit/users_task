// import { expect } from 'chai';

// import { locationSearchQuery } from '../../../lib/util/queries'

// describe('locationSearchQuery', () => { 

//   it('throws an error if integer lat/lng are not provided', () => {
//     expect(() => {
//       locationSearchQuery('123', "Robert'); DROP TABLE items;--");
//     }).to.throw(/Integer lat\/lng values must be provided/); 
//   });

//   it('should format a query with two params', () => {
//     const query = locationSearchQuery('-1.23', '234')
//     const expectation = "SELECT *, 3956 * 2 * ASIN(SQRT( POWER(SIN((-1.23 - abs(dest.lat)) * pi()/180 / 2),2) + COS(-1.23 * pi()/180 ) * COS(abs(dest.lat) *  pi()/180) *  POWER(SIN( ( (234 - dest.lng ))  *  pi()/180 / 2), 2) )) as distance FROM items dest ORDER BY distance"
//     expect(query).to.equal(expectation)
//   });

// })