function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("theagentnaviagatemove");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("theagentnaviagatemove", user, 365);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
    // Select the login button
    const signUpButton = document.querySelector("signup-button");
    const logInButton = document.querySelector("login-button");

    // Add click event listener to the login button
    signUpButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the form from submitting

        // Get the values of email and password fields
        const fullName = document.querySelector("input[id='Full-Name-Signup']").value;
        const email = document.querySelector("input[id='Email-Signup']").value;
        const password = document.querySelector("input[id='Password-Signup']").value;

        // Log the values to the console (you can replace this with your login logic)
        console.log("Email:", email);
        console.log("Password:", password);

        // Simulate login action
        if (email && password) {
          
          //action(email,password);
          signInUser(email,password);
          
        } else {
            alert("Please fill in both fields.");
        }
    });


    // Add click event listener to the login button
  logInButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from submitting

  // Get the values of email and password fields
  const email = document.querySelector("input[id='emailLogin']").value;
  const password = document.querySelector("input[id='passwordLogin']").value;

  // Log the values to the console (you can replace this with your login logic)
  console.log("Email:", email);
  console.log("Password:", password);

  // Simulate login action
  if (email && password) {
    
    //action(email,password);
    signInUser(email,password);
    
  } else {
      alert("Please fill in both fields.");
  }
});
});





 // Convert makeRequest to async function
async function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`HTTP Error: ${xhr.statusText}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    xhr.send(JSON.stringify(data));
  });
}

// Usage with async/await
async function useMakeRequest(email,password) {
  try {
    const response = await makeRequest("http://127.0.0.1:8000/signup", "POST", {
      "email": email,
      "password": password,
      "name": "john Doe",
      "accessToken": "emptyYes",
      "isOnline": true,
      "dateOfBirth": "12-12-12"
    });
    //console.log(response); // Process the response as needed
    return response; // Return the response if needed for further handling
  } catch (error) {
    //console.error("Error:", error); // Handle the error
    throw error; // Rethrow the error if you want to propagate it
  }
}

/* Call the async function
useMakeRequest()
  .then((response) => {
    // Handle the response if needed after calling useMakeRequest()
    console.log("Final Response:", response);
  })
  .catch((error) => {
    console.error("Final Error Handling:", error);
  });
*/
      


async function action(email,password){
  
  result=await useMakeRequest(email, password);
  jsonResult=JSON.parse(result);
  console.log(jsonResult);
  if (jsonResult.status==="200 ok"){
    console.log("200 Ok")
      window.location.href = "https://multiagentbase-pro-93abd0.webflow.io/dashboard";
}
}

  // Wrap XMLHttpRequest in a Promise to use with async/await
  function sendRequest(data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1:8000/signupanonymous", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.withCredentials = true;
  
      // When request is complete
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText); // resolve on success
          } else {
            reject(`Error: ${xhr.status} - ${xhr.statusText}`); // reject on error
          }
        }
      };
  
      // Send the data
      xhr.send(data);
    });
  }


async function CreateUserAnonymous(email){
  const data = JSON.stringify({
    "email": "anonymous34@gmail.com",
    "password": "12345",
    "name": "anonymous",
    "accessToken": "emptyYes",
    "isOnline": true,
    "dateOfBirth": "12-12-12"
  });
  try {
    myDATA = await sendRequest(data);
    DataJson=JSON.parse(myDATA);
    console.log(DataJson.fields);
    setCookie("agentmultiagentwebtky",DataJson.fields.refreshToken.stringValue,3)
    setCookie("agentmultiagentwebide",DataJson.fields.uuid.stringValue,3) // Await the response from sendRequest
    return(myDATA); // Output the response
  } catch (error) {
    return("Request failed:", error); // Handle errors
  }
}

// Prepare the data for the request

// Function to send the request
function sendRequest(data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/signin", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;

    // Handle state changes
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText); // Resolve on success
        } else {
          reject(`Error: ${xhr.status} - ${xhr.statusText}`); // Reject on error
        }
      }
    };

    // Send the request with the data
    xhr.send(data);
  });
}

// Function to use async/await
async function signInUser(email,password) {
  const data = JSON.stringify({
    "email": email,
    "password": password
  });
  try {
    const response = await sendRequest(data);// Await the promise from sendRequest
    let JsonResponse=JSON.parse(response)
    let accessToken=JsonResponse.idToken
    console.log(accessToken)
    if(accessToken!=null&&accessToken!=undefined)
    {
      singleUser("users","email",email,accessToken)
    }
    //setCookie("agentmultiagentwebide",JsonResponse.fields.uuid.stringValue,3)
    console.log(JsonResponse); // Log the response on success
  } catch (error) {
    console.error("Request failed:", error); // Log errors
  }
}


async function getUser(table,query,value,token) {
  var data = JSON.stringify({
    "tablename": table,
    "queryfield": query,
    "queryvalue": value,
    "refreshToken": token
  });

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.responseText);
        } else {
          reject(new Error(`Request failed with status ${this.status}: ${this.statusText}`));
        }
      }
    });

    xhr.open("POST", "http://127.0.0.1:8000/getsingleuserdata");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  });
}

async function singleUser(table,query,value,token){
  try {
    const response = await getUser(table,query,value,token);
    let JsonResponse=JSON.parse(response)
    console.log("test",JsonResponse);
    let theToken=JsonResponse.data[0].document.fields.refreshToken.stringValue
    let uniqueId=JsonResponse.data[0].document.fields.uuid.stringValue
    setCookie("agentmultiagentwebtky",theToken,3)
    setCookie("agentmultiagentwebide",uniqueId,3)
    console.log("200 Ok")
    window.location.href = "https://multiagentbase-pro-93abd0.webflow.io/dashboard";
    
  } catch (error) {
    console.error(error);
  }
}

console.log("page is loaded")
