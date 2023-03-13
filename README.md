
# Developer Tests in NodeJs

To match with relevant placements, developers are required to complete technical tasks. These tasks should take around 3 hours. Please upload the deliverables to your GitHub profile and also record your screen and yourself when completing the tasks (using Loom or any other similar tool). This code will always be on your GitHub profile to help demonstrate your abilities in the future.

Once this is completing we can start placing you relevant clients. This is mandatory to ensure we are matching the developers with the best skill set. 


## Developer
Ogunleye Olawale
- [@wealsegun](https://github.com/wealsegun)


## Acknowledgements

 - [TechT Company Coding challenge](https://www.techt.io)


## Project Description


You are tasked with building a simple API that allows users to view, create, update, and delete notes. The notes should be stored in a JSON file on the server, and the API should be able to handle multiple users.

​

Requirements
Create a Node.js server that listens on port 3000.

Implement the following endpoints:

GET /notes: Returns an array of all notes.

GET /notes/:id: Returns the note with the specified ID.

POST /notes: Creates a new note with the provided title and content.

PUT /notes/:id: Updates the note with the specified ID with the provided title and content.

DELETE /notes/:id: Deletes the note with the specified ID.

Store the notes in a JSON file on the server. Each note should have an id, title, content, and user_id field. The id field should be a unique identifier for each note, and the user_id field should be used to associate notes with users.

Implement user authentication using JSON Web Tokens (JWT). Users should be able to sign up, sign in, and sign out. Only authenticated users should be able to access the API.

Implement error handling for all endpoints. If an error occurs, the API should return an appropriate HTTP status code and a descriptive error message.

Write unit tests for the API using the Jest testing framework.

​

Evaluation
To evaluate the candidate's proficiency in Node.js, you should assess the following:

Whether the candidate's implementation follows best practices for Node.js development, such as asynchronous programming and error handling.

The candidate's ability to implement user authentication using JWT.

The candidate's ability to write unit tests for the API.

The quality and completeness of the code.

The candidate's ability to complete the project within the given time frame.

​



## Tech Stack

**Server:** Node, Express


## Installation

Install my-project with npm
https://github.com/wealsegun/note-coding-challenge

```bash
  npm install note-coding-challenge
  cd note-coding-challenge
```

Run the code with npm

```bash
  npm run start

  The code will run using nodemon on port 3000.
```


    
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/wealsegun/note-coding-challenge
```

Go to the project directory

```bash
  cd note-coding-challenge
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```



