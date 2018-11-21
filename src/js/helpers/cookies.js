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
    console.log(document.cookie);
}

export { getCookie, setCookie, getAllPollCookies };
