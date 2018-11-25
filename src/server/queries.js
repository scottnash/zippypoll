const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://zippypolladmin:33Km4V81!@postgres/zippypoll';
const db = pgp(connectionString);

const createPoll = (req, res, next) => {
  req.body.nickname = req.body.nickname.substring(0,10);
  db.any(  'insert into pollsters(nickname) values( ${ nickname } ) returning *', req.body).then( (response)=> {
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
    req.body.nickname = req.body.nickname.trim().substring(0,10);
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

const addOption = ( req, res, next, io ) => {
    db.any( "select * from polloptions WHERE pollid = ${ pollid } AND option = ${ option }", req.body).then( (response)=> {
      if( response.length === 0 ) {
        db.any( "select * from pollsters left outer join polls_pollsters on pollsters.id = polls_pollsters.pollsterid WHERE polls_pollsters.pollid = ${ pollid } AND pollsters.nickname = ${ nickname }", req.body).then( (response)=> {
          req.body.creatorid = response[0].pollsterid;
          db.any(  'insert into polloptions(creatorid, pollid, option ) values( ${ creatorid }, ${ pollid }, ${ option } ) returning *', req.body).then( (response)=> {
            emitOptions( req, res, next, io );
            res.status(200)
              .json({
                id: response[0].id,
                status: 'success',
                message: 'optionAdded'
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

const editOption = ( req, res, next, io ) => {
    db.any( "select * from polloptions WHERE pollid = ${ pollid } AND option = ${ option }", req.body).then( (response)=> {
      if( response.length === 0 ) {
        db.any(  'UPDATE polloptions SET option = ${ option } WHERE id = ${ optionid } returning *', req.body).then( (response)=> {
          emitOptions( req, res, next, io );
          res.status(200)
            .json({
              id: response[0].id,
              status: 'success',
              message: 'optionEdited'
            });
        })
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

const editQuestion = ( req, res, next, io ) => {
  db.any(  'UPDATE polls SET pollquestion = ${ pollquestion } WHERE id = ${ pollid } returning *', req.body).then( (response)=> {
    getPoll( req, res, next, io, true );
    res.status(200)
      .json({
        id: response[0].id,
        status: 'success',
        message: 'optionEdited'
      });
  })
}

const adjustOptionVote = ( req, res, next, io ) => {
  db.any( "select polls_pollsters.pollsterid from polls_pollsters JOIN pollsters ON pollsters.id = polls_pollsters.pollsterid WHERE polls_pollsters.pollid = ${ pollid } and pollsters.nickname = ${ nickname }", req.body).then( (response)=> {
    req.body.creatorid = response[0].pollsterid;
    db.any( "select * from polloptionvotes WHERE optionid = ${ optionid } and pollsterid = ${ creatorid }", req.body).then( (response)=> {
      if( response.length === 0 ) {
        db.any( 'insert into polloptionvotes(optionid, pollsterid ) values( ${ optionid }, ${creatorid } ) returning *', req.body).then( (response)=> {
            emitOptions( req, res, next, io );
            res.status(200)
              .json({
                id: response[0].optionid,
                status: 'success',
                message: 'optionAdded'
              });
        });
      } else {
        db.any( 'DELETE FROM polloptionvotes WHERE optionid =  ${ optionid } AND pollsterid = ${creatorid } returning *', req.body).then( (response)=> {
            emitOptions( req, res, next, io );
            res.status(200)
              .json({
                id: response[0].optionid,
                status: 'success',
                message: 'optionAdded'
              });
        });
      }
    });
  });
}

const getOptions = ( req, res, next ) => {
  db.any( "SELECT polloptions.id, polloptions.option, string_agg( pollsters.nickname, ', ') as nicknames, COUNT(pollsters.nickname), ( SELECT nickname from pollsters where id = polloptions.creatorid ) as optionCreator FROM polloptions LEFT OUTER JOIN polloptionvotes on polloptions.id = polloptionvotes.optionid LEFT OUTER JOIN  pollsters on pollsters.id = polloptionvotes.pollsterid WHERE polloptions.pollid = ${ pollid } GROUP BY 1, 2 ORDER BY COUNT(pollsters.nickname) desc, polloptions.id", req.body).then( (response)=> {
    res.status(200)
      .json({
        options: response,
        status: 'success',
        message: 'optionAdded'
      });
  });
}

const emitOptions = ( req, res, next, io ) => {
  db.any( "SELECT polloptions.id, polloptions.option, string_agg( pollsters.nickname, ', ') as nicknames, COUNT(pollsters.nickname), ( SELECT nickname from pollsters where id = polloptions.creatorid ) as optionCreator FROM polloptions LEFT OUTER JOIN polloptionvotes on polloptions.id = polloptionvotes.optionid LEFT OUTER JOIN  pollsters on pollsters.id = polloptionvotes.pollsterid WHERE polloptions.pollid = ${ pollid } GROUP BY 1, 2 ORDER BY COUNT(pollsters.nickname) desc, polloptions.id", req.body).then( (response)=> {
    io.emit('options updated', response );
  });
}


const getPoll = (req, res, next, io, emit) => {
  db.any( "select polls.id as pollid, * from polls LEFT OUTER JOIN pollsters ON creatorid = pollsters.id where urlhash = ${ urlhash }", req.body).then( (response)=> {
      if( response.length === 0 ) {
        res.status(200)
          .json({
            poll: null,
            status: 'failed',
            message: "Sorry, but we couldn't find your poll.  Please doublecheck your url."
          });
      } else {
        if( emit ) {
          io.emit('poll updated', response[0] );
        } else {
          res.status(200)
            .json({
              poll: response[0],
              status: 'success',
              message: 'poll fetched'
            });
        }
      }
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = ( io ) => {
  return {
    createPoll,
    getPoll: ( req, res, next ) => getPoll( req, res, next, io, false ),
    joinPoll,
    addOption: ( req, res, next ) => addOption( req, res, next, io ),
    editOption: ( req, res, next ) => editOption( req, res, next, io ),
    editQuestion: ( req, res, next ) => editQuestion( req, res, next, io ),
    getOptions,
    adjustOptionVote: ( req, res, next ) => adjustOptionVote( req, res, next, io )
  }
};
