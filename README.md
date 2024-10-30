# IMDB Clone

Welcome to the IMDB Clone project! This web application mimics the functionality of IMDB, allowing users to view, create, read, update, and delete movies, actors, and producers. The application is built using Node.js and demonstrates a basic understanding of CRUD operations except delete and entity relationships.

## Live Demo

You can view the live application at [imdb Backend](https://imdb-backend-wbpn.onrender.com).

## Features

- User-friendly interface for managing movies, actors, and producers.
- Relationships between entities:
  - An actor can act in multiple movies.
  - A movie can feature multiple actors.
  - Each movie has a single producer.
  - A producer can produce multiple movies.
- Optional integration with the IMDB API for enhanced movie data.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB (or any preferred database)
- **Styling**: CSS / Styled Components / Bootstrap (or any preferred framework)
- **Deployment**: Netlify (for frontend) and Heroku or similar (for backend)

## Entity Relationships

- **Actor**: Represents the actors who can act in multiple movies.
- **Movie**: Represents the movies that can have multiple actors and one producer.
- **Producer**: Represents the producers who can produce multiple movies.

## API Usage

- The application can utilize the TMDB API to fetch movie-related data. This is an optional feature that enhances the user experience by providing accurate and up-to-date movie information.

