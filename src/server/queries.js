const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://zippypolladmin:33Km4V81!@postgres/zippypoll';
const db = pgp(connectionString);

const createPoll = (req, res, next) => {

  db.any(  'insert into pollsters(nickname) values( ${nickname} ) returning *', req.body).then( (response)=> {
      req.body.creatorid = response[0].id;
      db.any(  'insert into polls(creatorid, pollquestion) values( ${ creatorid }, ${ pollquestion } ) returning *', req.body).then( (response)=> {
        res.status(200)
          .json({
            urlhash: response[0].urlhash,
            status: 'success',
            message: 'poll created'
          });
      });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  createPoll: createPoll
};
