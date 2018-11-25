import React from "react";
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import ZippyPollForm from '../../components/zippypoll-form';
import JoinPoll from '../../components/joinpoll';
import AddPollOption from '../../components/add-edit-poll-option';
import EditQuestion from '../../components/edit-question';
import * as cookies from '../../helpers/cookies.js';
import io from 'socket.io-client';

if (process.env.BROWSER) {
  require('./poll.scss');
}


class Poll extends React.Component {
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
      pollOptions: [],
      optionValue: null,
      optionID: null,
      submitPollOption: this.submitAddPollOption,
      hideEditQuestion: true
    }

    this.getPoll();
  }

  componentWillMount = () => {
    if (process.env.BROWSER) {
      document.querySelector('body').setAttribute('data-page', 'poll');
    }
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
    this.socket.disconnect(true)
  }

  shouldComponentUpdate( prevProps ) {
    return true;
  }

  componentDidMount() {
    const THIS = this;
    this.socket = io();
    this.socket.on('options updated', function( response ){
      THIS.setState( { pollOptions: response } );
    });
    this.socket.on('poll updated', function( response ){
      THIS.setState( { poll: response } );
    });
  }

  render() {
    const { poll, nickname, hideJoinPoll, pollOptions, joinInError, joinErrorMessage, hideAddPollOption, optionValue } = this.state;

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
          handleStepCompletion = { this.state.submitPollOption }
          inError = { joinInError }
          errorMessage = { joinErrorMessage }
          value = { optionValue }
        />
        <EditQuestion
          hideEditQuestion = { this.state.hideEditQuestion }
          handleCloserClick = { this.handleCloserClick }
          handleStepCompletion = { this.submitEditedQuestion }
          inError = { joinInError }
          errorMessage = { joinErrorMessage }
          value = { poll.pollquestion }
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
           showEditQuestion = { this.showEditQuestion }
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
      if ( response.data.status === 'success' ) {
        this.setState( { poll: response.data.poll, nickname: this.getNickname(response.data.poll.urlhash) }, ()=> this.getPollOptions() );
      } else {
        cookies.deleteCookie( `zippypoll_${ this.props.match.params.id }` );
        this.props.setErrorMessage( response.data.message )
        this.props.history.push(`/`);
      }
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
          cookies.setCookie( `zippypoll_${ this.state.poll.urlhash }`, JSON.stringify( { nickname: fieldValue.substring(0,10), pollquestion: this.state.poll.pollquestion } ) );
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

  submitEditPollOption = ( fieldName, fieldValue ) => {
    axios.post('/api/editoption', { pollid: this.state.poll.pollid, option: fieldValue, optionid: this.state.optionID }, {
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

  submitEditedQuestion = ( fieldName, fieldValue ) => {
    axios.post('/api/editQuestion', { pollid: this.state.poll.pollid, pollquestion: fieldValue, urlhash: this.props.match.params.id }, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).then( (response) => {
      if(response.data.status === "success") {
        this.setState( { hideEditQuestion: true } );
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
    if( this.state.nickname ){
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
  }

  handleCloserClick = ( event, doItAnyway )=> {
    event.preventDefault();
     if(event.target === event.currentTarget || doItAnyway) {
       this.setState( { hideJoinPoll: true, hideAddPollOption: true, hideEditQuestion: true } );
     }
  }

  showJoinPoll = () => {
    this.setState( { hideJoinPoll: false } );
  }

  showAddPollOption = ( event, option ) => {
    let optionID = null, optionValue = '', submitPollOption = this.submitAddPollOption;
    if( option ) {
       optionID = option.id;
       optionValue = option.option;
       submitPollOption = this.submitEditPollOption;
    }
    this.setState( { submitPollOption, optionID, optionValue, hideAddPollOption: false } );
  }

  showEditQuestion = () => {
    this.setState( { hideEditQuestion: false } );
  }

  getNickname = (urlHash) => {
    const cookiedPoll = cookies.getCookie(`zippypoll_${ urlHash }` );
    if( cookiedPoll ) {
      return JSON.parse(cookies.getCookie(`zippypoll_${ urlHash }` )).nickname;
    }
    return null;
  }
}

export default withRouter( Poll );
