const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const { updateDb } = require('./helpers/updateDb');

// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

(async function () {
  await server.start();
  server.applyMiddleware({ app });
})();

app.use(helmet());
app.use(logger('dev'));
app.use(compression());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Will use GraphQL entirely, instead of REST API
// app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

setInterval(updateDb, 1000 * 60 * 60 * 12);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`GraphQL: http://localhost:${PORT}${server.graphqlPath}`);
  });
});
