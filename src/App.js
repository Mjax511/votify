import React from "react";
//import logo from './logo.svg';
import "./App.css";
import { LoginButton } from "./LoginButton";
import { Homepage } from "./Homepage";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import 'semantic-ui-css/semantic.min.css'


function HandleAuth(props) {
  const endpoint = "https://accounts.spotify.com/api/token";

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q="
  );
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Cookie",
    "__Host-device_id=AQAM2Cs4CAqkO60Mhy0ZjxJkalvjJGJ43zV2Z9tqxYKbJ-Mz2V6LkE3lBe1wcks2KIwCN1ZElxxWq74EmV0Eya99KiVCol8dEWk"
  );

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", props.authCode);
  urlencoded.append("redirect_uri", "http://localhost:3000");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const [loading, data, error] = useHandleFetchAndLoad(
    endpoint,
    requestOptions
  );

  if (loading) {
    return <div>Loading from {endpoint}</div>;
  }
  if (!data?.access_token || error) {
    return <div>{`error: ${error}!!!`}</div>;
  }
  sessionStorage.setItem("accessToken", data.access_token);
  window.location = "http://localhost:3000";

  return <Homepage></Homepage>;

  // fetch("https://accounts.spotify.com/api/token", requestOptions)
  //   .then(response => {
  //     if (response.status !== 200) {
  //       throw new Error(`Error: ${response.status} while requesting token`)
  //     }
  //     return response.json()
  //   })
  //   .then(data => {
  //     sessionStorage.setItem("accessToken", data.access_token)
  //     setLoading(false);
  //     window.location = "http://localhost:3000"
  //   })
  //   .catch(error => console.log('error', error));
  // const tokenData = await response.json();
  // sessionStorage.setItem("token", tokenData.access_token);
}
function App() {
  const authCode = window.location.href.split("?")[1]
    ? window.location.href.split("?")[1].split("=")[1]
    : null;
  if (sessionStorage.accessToken && sessionStorage.accessToken !== 'null') {
    return <Homepage></Homepage>;
  }
  if (authCode) {
    return <HandleAuth authCode={authCode}></HandleAuth>;
  }
  return <LoginButton></LoginButton>;

  //   const redirect_uri = 'http://localhost:3000'
  //   const my_client_id = 'd61d9c2cce0241c1bee240e797303b23'
  //   const scopes = ''
  //   const authHeader = 'Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q='
  //   const authCode = window.location.href.split('?')[1] ? window.location.href.split('?')[1].split("=")[1] : "none";
  //   //console.log(authCode)
  //   const votifyAuthURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${my_client_id}${scopes ? '&scope=' + encodeURIComponent(scopes) : ''}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  //   const onClick = () => {
  //     window.location = votifyAuthURL
  //   }
  //   var myHeaders = new Headers();
  // myHeaders.append("Authorization", "Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q=");
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  // myHeaders.append("Cookie", "__Host-device_id=AQAM2Cs4CAqkO60Mhy0ZjxJkalvjJGJ43zV2Z9tqxYKbJ-Mz2V6LkE3lBe1wcks2KIwCN1ZElxxWq74EmV0Eya99KiVCol8dEWk");

  // var urlencoded = new URLSearchParams();
  // urlencoded.append("grant_type", "authorization_code");
  // urlencoded.append("code", authCode);
  // urlencoded.append("redirect_uri", "http://localhost:3000");

  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: urlencoded,
  //   redirect: 'follow'
  // };

  // //var resultTemp
  // fetch("https://accounts.spotify.com/api/token", requestOptions)
  //   .then(response => response.json())
  //   //.then(result => console.log(result))
  //   .then(data => {
  //     sessionStorage.setItem("token",data.access_token)
  //     //console.log(resultTemp.access_token)

  //   })
  //   .catch(error => console.log('error', error));

  // console.log(sessionStorage.token)

  //   myHeaders = new Headers();
  //   myHeaders.append("Authorization", `Bearer ${sessionStorage.token}`);

  //   requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };

  //   //var test
  //   fetch("https://api.spotify.com/v1/me", requestOptions)
  //     .then(response => response.json())
  //     .then(res => {
  //       //test = res.display_name
  //       sessionStorage.setItem("name", res.display_name)
  //     })
  //     .catch(error => console.log('error', error));

  //   return (
  //     <div className="App">
  //       <button onClick={onClick}>ClickME</button>
  //       <h1>{sessionStorage.name}</h1>
  //     </div>
  //   );
}

export default App;
