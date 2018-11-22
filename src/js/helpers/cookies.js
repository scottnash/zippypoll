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

const getAllPollCookies = ()=> {
  if (process.env.BROWSER) {
    let cookies = document.cookie.split(';');
    let polls = [];
    cookies.map( ( cookie ) => {
      if( cookie.indexOf("zippypoll_") >= 0 ) {
        let cookieparts = cookie.split('=');
        polls.push( {
          hash: cookieparts[0].split('_')[1],
          nickname: cookieparts[1].split(',')[0],
          question: cookieparts[1].split(',')[1]
        });
      }
    });
    return polls;
  }
  return [];
}

export { getCookie, setCookie, getAllPollCookies };
