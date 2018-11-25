import React from "react";

export default class About extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount = () => {
    if (process.env.BROWSER) {
      document.querySelector('body').setAttribute('data-page', 'about');
    }
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
  }

  render() {
    return (
      <div className="zippypoll__maxwidth-content-holder">
        <article className="zippypoll__content">
        <h1>About ZippyPoll</h1>
        <p>Zippypoll is designed to be a quick and fun way to create an informal poll&mdash;on any subject&mdash;that can be shared with anyone.  No login is required, but your browser must allow cookies.  Since it is intended purely for fun, and because anyone with a link to your poll can see and participate in that poll, please do not use Zippypoll to store personal, or private information.</p>
        <ul>
        <li>To create a poll, you simply need to enter the question/topic of the poll and then provide a nickname, which can be initials or some other identifying name. You can then start adding options for the poll.</li>
        <li>Until options are added, you may edit the question/topic.</li>
        <li>Until someone has chosen an option, you may edit that option, if you are the one who added it.</li>
        <li>To vote for an option, click the + sign to the left of the option.</li>
        <li>If you change your mind, you can unvote for an option by clicking the - sign to the left of the option.</li>
        <li>To share the poll with others, simply, email/text/message, the url of your Zippypoll.</li>
        <li>Anyone who receives the shared url can then see the results of the Zippypoll, or join the Zippypoll by providing a nickname of their own.</li>
        </ul>
        </article>
      </div>
    );
  }

}
