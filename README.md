<div align="center">

<img src="public/logobar.png" alt="CrossCult Logo" width="95%">

<br/>

# CrossCult – Auth Service

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

CrossCult is a cultural exploration web app that lets users learn about food, history, festivals, and traditions of different countries. It also supports AI voice-based translation with Azure services.

</div>

# About the Service

This service handles user login, signup, and authentication using JWT. Roles are supported for users and admins.

## Features

- User registration and login
- JWT-based secure login
- MongoDB storage for user data
- Middleware for protected routes

## Technology Stack

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **AI Integration**: Azure Cognitive Services (Speech + Translator)  
- **Hosting**: Firebase, Azure Web App  
- **DevOps**: Docker, Azure Container Registry, GitHub Actions

## Backend Repositories

<a href="https://github.com/abhixsh/crosscult-frontend" target="_blank">
  <img width="95%" alt="Frontend Repo" src="https://i.ibb.co/7xRJpGDF/Group-2.png"/>
</a>
<div align="center">
  <strong>Click here to go to the frontend repository</strong>
</div>

### All Backend Repositories

- [crosscult-country-service](https://github.com/abhixsh/crosscult-country-service)
- [crosscult-ai-service](https://github.com/abhixsh/crosscult-ai-service)
- [crosscult-auth-service](https://github.com/abhixsh/crosscult-auth-service)
- [crosscult-events-service](https://github.com/abhixsh/crosscult-events-service)
- [crosscult-storytelling-service](https://github.com/abhixsh/crosscult-storytelling-service)
- [crosscult-chabot-service](https://github.com/abhixsh/crosscult-chabot-service)

## Local Development

### Prerequisites
- Node.js and npm installed
- Mongodb running locally or a cloud URI
- Azure API keys (for translation)

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/abhixsh/crosscult-auth-service
cd crosscult-auth-service
npm install
```

To run the application using nodemon, use the following command:

```bash
npm install -g nodemon
nodemon index.js
```

To run the application using Docker, follow these steps:

1. Build the Docker image:

    ```bash
    docker build -t auth-service .
    ```

2. Run the Docker container:

    ```bash
    docker run -p 6000:6000 auth-service
    ```
    
## Contributing

A win-win cooperation! We invite you to participate in this project. Let's work together to create the most useful tool for developers on the web today.

### How to Contribute

- Issues: ask questions and submit your features
- Pull requests: send your improvements to the current codebase

Together, we can make this project **better** every day!

## License

This project is licensed under the MIT License.
