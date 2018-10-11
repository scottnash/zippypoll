import React from "react";
import axios from 'axios';
import ZippyPollForm from '../../components/zippypoll-form';
import JoinPoll from '../../components/joinpoll';
import * as cookies from '../../helpers/cookies.js';

export default class Poll extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      poll: null,
      nickname: null
    }

    this.getPoll();
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
  }

  render() {
    const { poll, nickname } = this.state;

    if( !poll ) {
      return null;
    }

    return (
      <div className="zippypoll__maxwidth-content-holder">
        <ZippyPollForm
          datecreated = { new Date(poll.datecreated) }
          creatornickname = { poll.nickname }
          question = { poll.pollquestion }
          nickname = { nickname }
        />
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

  getNickname = (urlHash) => {
    return cookies.getCookie(urlHash);
  }
}
