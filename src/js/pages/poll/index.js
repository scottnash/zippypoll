import React from "react";
import axios from 'axios';
import ZippyPollForm from '../../components/zippypoll-form';
import JoinPoll from '../../components/joinpoll';
import AddPollOption from '../../components/add-poll-option';
import * as cookies from '../../helpers/cookies.js';
import io from 'socket.io-client';

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
      joinErrorMessage: '',
      hideAddPollOption: true,
      addPollOptionInError: false,
      addPollOptionErrorMessage: '',
      pollOptions: []
    }

    this.getPoll();
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
  }

  componentDidMount() {
    const THIS = this;
    this.socket = io();
    this.socket.on('options updated', function( response ){
      THIS.setState( { pollOptions: response } );
    });
  }

  render() {
    const { poll, nickname, hideJoinPoll, pollOptions, joinInError, joinErrorMessage, hideAddPollOption } = this.state;

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
          inError = { joinInError }
          errorMessage = { joinErrorMessage }
        />
        <AddPollOption
          hideAddPollOption = { hideAddPollOption }
          handleCloserClick = { this.handleCloserClick }
          handleStepCompletion = { this.submitAddPollOption }
          inError = { joinInError }
          errorMessage = { joinErrorMessage }
        />
        <div className="zippypoll__form-holder">
          <ZippyPollForm
            datecreated = { new Date(poll.datecreated) }
            creatornickname = { poll.nickname }
            question = { poll.pollquestion }
            nickname = { nickname }
            addPollOption = { this.addPollOption }
            showAddPollOption = { this.showAddPollOption }
            pollOptions = { pollOptions }
            showJoinPoll = { this.showJoinPoll }
            optionClicked = { this.optionClicked }
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
      this.setState( { poll: response.data.poll, nickname: this.getNickname(response.data.poll.urlhash) }, ()=> this.getPollOptions() );

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
          cookies.setCookie( `zippypoll_${ this.state.poll.urlhash }`, `${ fieldValue },${ this.state.poll.pollquestion }` );
        })
      } else if( response.data.status === "error" ) {
        this.setState( { joinInError: true, joinErrorMessage: response.data.message })
      }
    });
  }

  submitAddPollOption = ( fieldName, fieldValue ) => {
    axios.post('/api/addoption', { nickname: this.state.nickname, pollid: this.state.poll.pollid, option: fieldValue }, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).then( (response) => {
      if(response.data.status === "success") {
        this.setState( { hideAddPollOption: true } );
      } else if( response.data.status === "error" ) {
        this.setState( { joinInError: true, joinErrorMessage: response.data.message })
      }
    });
  }

  getPollOptions = () => {
    axios.post('/api/getOptions', { pollid: this.state.poll.pollid }, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).then( (response) => {
      if(response.data.status === "success") {
        this.setState( { pollOptions: response.data.options } );
      } else if( response.data.status === "error" ) {
        this.setState( { joinInError: true, joinErrorMessage: response.data.message })
      }
    });
  }

  optionClicked = ( optionid, addOrSubtract ) => {
    const params = {
      pollid: this.state.poll.pollid,
      optionid: optionid,
      nickname: this.state.nickname
    }
    axios.post('/api/adjustOptionVote', params, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).then( (response) => {
      if(response.data.status === "success") {

      } else if( response.data.status === "error" ) {
        this.setState( { joinInError: true, joinErrorMessage: response.data.message })
      }
    });
  }

  handleCloserClick = ( event, doItAnyway )=> {
    event.preventDefault();
     if(event.target === event.currentTarget || doItAnyway) {
       this.setState( { hideJoinPoll: true, hideAddPollOption: true } );
     }
  }

  showJoinPoll = () => {
    this.setState( { hideJoinPoll: false } );
  }

  showAddPollOption = () => {
    this.setState( { hideAddPollOption: false } );
  }

  getNickname = (urlHash) => {
    return cookies.getCookie(`zippypoll_${ urlHash }` );
  }
}
