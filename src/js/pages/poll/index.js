import React from "react";
import axios from 'axios';
import ZippyPollForm from '../../components/zippypoll-form';
import JoinPoll from '../../components/joinpoll';
import * as cookies from '../../helpers/cookies.js';

if (process.env.BROWSER) {
  require('./poll.scss');
}


export default class Poll extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      poll: null,
      nickname: null,
      hideJoinPoll: false,
      joinInError: false,
      joinErrorMessage: ''
    }

    this.getPoll();
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
  }

  render() {
    const { poll, nickname, hideJoinPoll } = this.state;

    if( !poll ) {
      return null;
    }

    return (
      <div className="zippypoll__maxwidth-content-holder">
        <JoinPoll
          nickname = { nickname }
          hideJoinPoll = { hideJoinPoll }
          poll = { poll }
          handleCloserClick = { this.handleCloserClick }
          handleStepCompletion = { this.submitJoinPoll }
          inError = { this.state.joinInError }
          errorMessage = { this.state.joinErrorMessage }
        />
        <div className="zippypoll__form-holder">
          <ZippyPollForm
            datecreated = { new Date(poll.datecreated) }
            creatornickname = { poll.nickname }
            question = { poll.pollquestion }
            nickname = { nickname }
          />
        </div>
      </div>
    );
  }

  getPoll = ()=> {
    const pollID = this.props.match.params.id;
    axios.post('/api/getpoll', { urlhash: pollID }, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).then( (response) => {
      this.setState( { poll: response.data.poll, nickname: this.getNickname(response.data.poll.urlhash) }, ()=> { console.log( this.state.poll) } );
    });
  }

  submitJoinPoll = ( fieldName, fieldValue, index ) => {
    axios.post('/api/joinpoll', { nickname: fieldValue, pollid: this.state.poll.pollid }, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).then( (response) => {
      if(response.data.status === "success") {
        this.setState ( { nickname: fieldValue, hideJoinPoll: true }, ()=> {
          cookies.setCookie( this.state.poll.urlhash, fieldValue );
        })
      } else if( response.data.status === "error" ) {
        this.setState( { joinInError: true, joinErrorMessage: response.data.message })
      }
    });
  }

  handleCloserClick = ( event, doItAnyway )=> {
    event.preventDefault();
     if(event.target === event.currentTarget || doItAnyway) {
       this.setState( { hideJoinPoll: true } );
     }
  }

  showJoinPoll = () => {
    this.setState( { hideJoinPoll: false } );
  }

  getNickname = (urlHash) => {
    return cookies.getCookie(urlHash);
  }

}
