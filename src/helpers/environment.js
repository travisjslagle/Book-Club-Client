let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:3001";
    break;
  case "book-club-client-by-ts.herokuapp.com":
    APIURL = "https://book-club-client-by-ts.herokuapp.com";
}

export default APIURL;
