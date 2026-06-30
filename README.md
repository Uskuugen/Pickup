
# HoopRun

HoopRun is a full-stack web application for creating and joining local pickup basketball games.

The goal was to build a simple platform where players can host runs, join existing games, and manage their own events while learning how to build a complete CRUD application with a database.

## Built With

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- GSAP

## Features

- Create pickup games
- Join and leave runs
- Edit hosted games
- Delete hosted games
- Track joined players
- Host-only permissions
- Local username storage

## What I Learned

This was my first larger full-stack project using MongoDB and Express.

Some things I learned while building it:

- Building REST APIs
- Connecting a frontend to a MongoDB database
- CRUD operations
- Working with Mongoose models
- Handling client/server communication
- Basic authorization logic
- Debugging full-stack applications

## Future Improvements

There are still a lot of ideas I'd like to add:

- User accounts
- Search and filters
- Court directory
- Maps
- Ratings for runs
- Better mobile UI
- Notifications

## Running Locally

```bash
npm install
npm start
```

Create a `.env` file with your MongoDB connection string:

```env
MONGODB_URI=your_connection_string
```

Then open:

```
http://localhost:3000

Status: MVP Complete ✅

Originally started as a way to practice full-stack web development, HoopRun became a CRUD application for hosting and joining community pickup basketball games.

Current version includes:

- CRUD operations
- MongoDB database
- Express backend
- Join/Leave system
- Host permissions
- Responsive UI

Next milestone:

- Authentication
- Search
- Court database
- Interactive map
```

---

This project was built by **Usukhchuluun Batchuluun** as part of my software engineering portfolio while studying Games, Interactive Media & Mobile (GIMM) at Boise State University.