# Kuhlosul App

The official artist page for my best friend and upcoming DJ/producer [Kuhlosul](https://soundcloud.com/k_dubs). This MERNG PWA includes a standard "About" page, a "Tracks" page, and a "Contact" page. There is also an admin panel which allows admins to complete various tasks such as editing the content on the About page, and updating the database with Kuhlosul's latest tracks (pulled from SoundCloud).

![Image](./assets/kuhlosulAppDemo.gif)

## Table of Contents

<hr>

- [Core Technologies](#core-technologies)
- [Various Packages Used](#various-packages-used)
- [Custom ScScraper Library](#scscraper)
- [Mongoose Models](#models)
- [updateDb Function](#update-db)
- [GraphQL Mutations and Queries](#graphql)
- [JWT](#jwt)
<!-- - [Usage](#usage)
- [Credits](#credits)
- [License](#license) -->

<h2 id='core-technologies'>Core Technologies</h2>
<hr>

- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [GraphQL](https://graphql.org/)
- [Apollo](https://www.apollographql.com/)
- [JWT](https://jwt.io/)
- [Puppeteer](https://pptr.dev/)
- [Cheerio](https://cheerio.js.org/)

<h2 id='various-packages-used'>Various Packages Used</h2>
<hr>

(Not all listed here)

### NodeJS

- [apollo-server-express](https://www.npmjs.com/package/apollo-server-express)
- [axios](https://www.npmjs.com/package/axios)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [compression](https://www.npmjs.com/package/compression)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [express-slow-down](https://www.npmjs.com/package/express-slow-down)
- [helmet](https://www.npmjs.com/package/helmet)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [nodemailer](https://www.npmjs.com/package/nodemailer)

### React

- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [rebass](https://www.npmjs.com/package/rebass)
- [react-bootstrap](https://www.npmjs.com/package/react-bootstrap)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [uuidv4](https://www.npmjs.com/package/uuidv4)

<h2 id='scscraper'>ScScraper</h2>
<hr>

The ScScraper library is a small library specifically created for this application which can scrape data about a SoundCloud user, their tracks, and their tracks which have been posted to different accounts and added to their 'Playlists' page (this is the most popular method of making one's tracks posted elsewhere still show up on their main SoundCloud page).

The [soundcloud-scraper](https://www.npmjs.com/package/soundcloud-scraper) library is slightly utilized for some of the methods within the ScScraper library; however, the vast majority of the logic is 100% custom.

ScScraper's roots lie in two very specific helper functions:

1. loadProfileBody

This function takes in a SoundCloud username and a page on which to run the scrape. It utilized Puppeteer, and returns the HTML of the page based on the parameters specified.

2. autoScroll

Used within the 'loadProfileBody' function, this asynchronous call simply scrolls to the bottom of the page before allowing the loadProfileBody function to return its final value of raw HTML.

<hr>

These two functions are used notoriously within the actual ScScraper class methods. The return value of the loadProfileBody is then parsed and formatted into usable JSON content.

### In action:

```JavaScript
  getTracks = async function (username, query = 'tracks', headless) {
    try {
      const body = await loadProfileBody(username, query, headless);

      const $ = cheerio.load(body);

      const tracks = [];

      $('.sound__body').each((_i, elem) => {
        const sound = {
          title: $(elem).find('.soundTitle__title > span').text().trim(),
          url:
            'https://soundcloud.com' +
            $(elem).find('.soundTitle__title').attr('href'),
        };
        tracks.push(sound);
      });
      return tracks;
    } catch (err) {
      throw new Error('Failed to pull tracks.');
    }
  };
```

<h2 id='models'>Mongoose Models</h2>
<hr>

The small database of this app has three main models:

1. Admin
2. Track
3. AboutPage

They are quite self-explanatory based on name alone. Most of the initial server-side work was done with the 'tracks' MongoDB collection.

The overall goal is to serve the end-user a list of tracks on the webpage. The problem is that scraping SoundCloud every time the user makes a request is extremely slow and inefficient due to the need to autoScroll each page before scraping it. Because of this, I decided to store the scraped tracks in a MongoDB database.

Because the data coming from ScScraper was more than necessary to fulfill Kuhlosul's vision of this app, I created a simplistic model for a Track:

```JavaScript
const trackSchema = new Schema({
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  url: {
    type: String,
  },
  genre: {
    type: String,
  },
  publishedAt: {
    type: Date,
  },
});
```

<h2 id='update-db'>updateDb Function</h2>
<hr>

The updateDb function is a single asynchronous function which clears the tracks collection within the Db, scrapes SoundCloud for the freshest data, then creates a document within the 'tracks' collection for every single track.

With this function, we can utilize all of our app's server-side foundation logic in three lines of code:

```JavaScript
const runUpdate = async() => {
  const added = await updateDb();
  return added; // Returns a Tracks.find({})
};
```

Within the server.js file, this function is set on a setInterval. It automatically runs in the background every 12 hours to ensure the database is always up-to-date.

<h2 id='graphql'>GraphQL Mutations and Queries</h2>
<hr>

This application uses GraphQL entirely. I did create a 'routes' folder when initially creating the project, as I was considering having a hybrid of RESTful routes and GraphQL routes; however, I decided that would become messy and difficult to maintain.

There are 3 main queries, and 6 main mutations at the moment. This number will increase as updates roll out:

```JavaScript
  type Query {
    tracks: [Track]
    viewdashboard: AdminCheck
    getAbout: About
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    seed: [Track]
    changePassword(password: String!): Admin
    createAdmin(email: String!, password: String!): Admin
    updateAbout(header: String!, body: String!): About
    sendMessage(
      email: String!
      type: String!
      subject: String!
      body: String!
    ): Status
  }
```

The 'seed' mutation is the one which is used to manually run the [updateDb function](#update-db) from the admin dashboard:

![Image](./assets/adminFunctions.png)

<h2 id='jwt'>JWT</h2>
<hr>

### Server-Side

Two methods are used within the auth.js file of the server's utils folder in order to handle server-side authentication:

1. signToken

This method takes in an 'Admin' object from our database, creates and signs a new token, and returns an object including the '\_id', 'email', and the newly created web token. Because there is no ability for users to create accounts (except for admins creating new admin accounts), this method is only used in one place - the 'login' mutation resolver:

```JavaScript
    login: async (parent, { email, password }) => {
      email = email.toLowerCase()
      // grab the admin corresponding to the email sent in the request
      const admin = await Admin.findOne({ email });

      if (!admin) return new Error('No admin with this email found!');

      // verify if the password is correct using custom Mongoose hook utilizing bcrypt
      const correctPass = await admin.checkPassword(password);

      if (!correctPass) return new AuthenticationError('Incorrect passoword!');

      // create the 'Auth' object by passing our admin object into the signToken function
      const token = signToken(admin);

      // return the token object and the admin object
      return { token, admin };
    },
```

In order to accommodate for the return of this resolver, it was necessary to create an 'Auth' type within my GraphQL typeDefs:

```JavaScript
  type Auth {
    token: ID!
    admin: Admin
  }
```

The token is set up to expire after 24 hours.

2. authMiddleware

The authMiddleware method allows us to receive our token initially signed with signToken from the client. I decided to make it very flexible when writing it, and set it up to where the token can be placed in the request's body, query, or headers. Eventually I placed it in the headers.

After being pulled from the request, the JWT is then verified, and the decoded data is added to the request object to be used within our GraphQL context.

Adding the authMiddleware function to the ApolloServer:

```JavaScript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
```

Using the context within a resolver:

```JavaScript
    changePassword: async (parent, { password }, context) => {
      // if no admin object within context, return custom error
      if (!context.admin)
        return new AuthenticationError('Failed to authenticate Admin');

      // find the admin with the context.admin's _id and change the password
      const withNewPassword = await Admin.findOneAndUpdate(
        { _id: context.admin._id },
        { password: password },
        { new: true }
      );
      return withNewPassword;
    },
```

### Client-Side

