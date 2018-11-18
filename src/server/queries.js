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
      const userID = req.body.creatorid;
      db.any(  'insert into polls(creatorid, pollquestion) values( ${ creatorid }, ${ pollquestion } ) returning *', req.body).then( (response)=> {
        const urlhash = response[0].urlhash;
        req.body.pollid = response[0].id;
        db.any(  'insert into polls_pollsters(pollsterid, pollid) values( ${ creatorid }, ${ pollid } ) returning *', req.body).then( (response)=> {
          res.status(200)
            .json({
              urlhash: urlhash,
              userID: userID,
              status: 'success',
              message: 'poll created'
            });
          });
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

const joinPoll = ( req, res, next ) => {
    db.any( "select * from pollsters LEFT OUTER JOIN polls_pollsters ON pollsters.id = polls_pollsters.pollsterid where polls_pollsters.pollid = ${ pollid } AND pollsters.nickname = ${ nickname }", req.body).then( (response)=> {
      if( response.length === 0 ) {
        db.any(  'insert into pollsters(nickname) values( ${nickname} ) returning *', req.body).then( (response)=> {
            req.body.creatorid = response[0].id;
            db.any(  'insert into polls_pollsters(pollsterid, pollid) values( ${ creatorid }, ${ pollid } ) returning *', req.body).then( (response)=> {
              res.status(200)
                .json({
                  id: req.body.creatorid,
                  status: 'success',
                  message: 'poll joined'
                });
              });
        })
      } else {
        res.status(200)
          .json({
            status: 'error',
            message: 'That nickname is already in use.'
          });
      }
    })
    .catch(function (err) {
      return next(err);
    });
}

const addOption = ( req, res, next ) => {
    db.any( "select * from polloptions WHERE pollid = ${ pollid } AND option = ${ option }", req.body).then( (response)=> {
      if( response.length === 0 ) {
        db.any( "select * from pollsters left outer join polls_pollsters on pollsters.id = polls_pollsters.pollsterid WHERE polls_pollsters.pollid = ${ pollid } AND pollsters.nickname = ${ nickname }", req.body).then( (response)=> {
          req.body.creatorid = response[0].pollsterid;
          db.any(  'insert into polloptions(creatorid, pollid, option ) values( ${ creatorid }, ${ pollid }, ${ option } ) returning *', req.body).then( (response)=> {
            req.body.optionid = response[0].id;
            db.any(  'insert into polloptionvotes(optionid, pollsterid, plusvotes ) values( ${ optionid }, ${creatorid }, 1 ) returning *', req.body).then( (response)=> {
                res.status(200)
                  .json({
                    id: response[0].optionid,
                    status: 'success',
                    message: 'optionAdded'
                  });
            });
          })
        });

      } else {
        res.status(200)
          .json({
            status: 'error',
            message: 'That option is already in the poll.'
          });
      }
    })
    .catch(function (err) {
      return next(err);
    });
}


const getPoll = (req, res, next) => {
  db.any( "select polls.id as pollid, * from polls LEFT OUTER JOIN pollsters ON creatorid = pollsters.id where urlhash = ${ urlhash }", req.body).then( (response)=> {
        res.status(200)
          .json({
            poll: response[0],
            status: 'success',
            message: 'poll fetched'
          });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  createPoll: createPoll,
  getPoll: getPoll,
  joinPoll: joinPoll,
  addOption: addOption
};
