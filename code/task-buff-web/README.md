# How to use the API requests

List of API request:

- create_task: Allows users to make a new task
- get_tasks: Gets all the tasks associated to a specific user
- get_user_info: Gets all the user info for the signed in user
- login: Allows user to login
- sign_up: Allows user to sign up
- update_user_info: Allows user to update their information

Once you have determined which API request you want make a Request Options variable:

```javascript
const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          ...
      }),
    };
```

Put the required parameters for the API request in the body object. If you don't know what a given api request requires look at the top of the associated file for an example. The formatting is pretty particular so look at the examples or ask Luke for questions.

Now to call the api request is simple.

```javascript
fetch("api/(Name of API REQUEST GOES HERE)", requestOptions)
  .then("Handle the response HERE")
  .catch(console.log);
```

Simply use the fetch command with the name of the api request you want to call. Handle the response in the .then() and use the .catch() to figure out errors.

