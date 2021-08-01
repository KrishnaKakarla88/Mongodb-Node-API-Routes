# Mongodb-Node-API-Routes

This application builds an API for a social network using Express.js for routing, a MongoDB database, and the Mongoose ODM. In addition to using the [Express](https://www.npmjs.com/package/express) and [Mongoose](https://www.npmjs.com/package/mongoose) packages, you’ll need to use the [Moment package](https://www.npmjs.com/package/moment) to format time.


## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```


## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia Core for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia Core
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```


## Mock-Up

The following animations show examples of the application's API routes being tested in Insomnia Core.

The first animation shows GET routes to return all users and all thoughts being tested in Insomnia Core:

![Homework Demo 01](./Images/demo-01.gif)

The second animation shows GET routes to return a single user and a single thought being tested in Insomnia Core:

![Homework Demo 02](./Images/demo-02.gif)

The third animation shows the POST, PUT, and DELETE routes for users being tested in Insomnia Core:

![Homework Demo 03](./Images/demo-03.gif)

The final animation shows the POST and DELETE routes for a user’s friend list being tested in Insomnia Core:

![Homework Demo 04](./Images/demo-04.gif)


## Getting Started

Use the following guidelines to set up your models and API routes:

### Models

**User**

* `username`
    * String
    * Unique
    * Required
    * Trimmed

* `email`
    * String
    * Required
    * Unique
    * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
    * Array of `_id` values referencing the `Thought` model

* `friends`
    * Array of `_id` values referencing the `User` model (self-reference)

**Schema Settings**

Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query

---

**Thought**

* `thoughtText`
    * String
    * Required
    * Must be between 1 and 280 characters

* `createdAt`
    * Date
    * Set default value to the current timestamp
    * Use `moment` in a getter method to format the timestamp on query

* `username` - Which user created this thought
    * String
    * Required

* `reactions` (like replies)
    * Array of nested documents created with the `reactionSchema`

**Schema Settings**

Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query

---

**Reaction** (SCHEMA ONLY)

* `reactionId`
    * Use Mongoose's ObjectId data type
    * Default value is set to a new ObjectId

* `reactionBody`
    * String
    * Required
    * 280 character maximum

* `username`
    * String
    * Required

* `createdAt`
    * Date
    * Set default value to the current timestamp
    * Use `moment` in a getter method to format the timestamp on query

**Schema Settings**

This will not be a model, but rather used as the `reaction` field's subdocument schema in the `Thought` model.


### API Routes

**`/api/users`**

* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a new user:

```json
// example data
{
  "username": "krishna",
  "email": "krishna@gmail.com"
}
```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`

**BONUS**: Remove a user's associated thoughts when deleted

---

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list

* `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

* `GET` to get all thoughts

* `GET` to get a single thought by its `_id`

* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "krishna",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

* `PUT` to update a thought by its `_id`

* `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## Review

* The URL of the functional, deployed application.

* URL of the GitHub repository (https://github.com/KrishnaKakarla88/Mongodb-Node-API-Routes)

### To clone this repository
* git clone https://github.com/KrishnaKakarla88/Mongodb-Node-API-Routes