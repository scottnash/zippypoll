const getCookie = (cookieName) => {
  const match = document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
  if (match) return match[1];
}

const setCookie = (cookieName, cookieValue, expires) => {
  let expiresString = '';
  if(expires) {
    var date = new Date();
        date.setTime(date.getTime()+(expires*60*60*1000));
        expiresString = " expires=" + date.toUTCString();
  }
  document.cookie = `${ cookieName } = ${ cookieValue };  path=/; ${ expiresString }`;
}

const deleteCookie = ( cookieName) => {
  document.cookie = cookieName + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const getAllPollCookies = ()=> {
  if (process.env.BROWSER) {
    let cookies = document.cookie.split(';');
    let polls = [];
    cookies.map( ( cookie ) => {
      if( cookie.indexOf("zippypoll_") >= 0 ) {
        let cookieparts = cookie.split('=');
        try {
          let pollInfo = JSON.parse( cookieparts[1] );
          polls.push( {
            hash: cookieparts[0].split('_')[1],
            nickname: pollInfo.nickname,
            question: pollInfo.pollquestion
          });
        }
        catch(error){

        }
      }
    });
    return polls;
  }
  return [];
}

export { getCookie, setCookie, getAllPollCookies, deleteCookie };
