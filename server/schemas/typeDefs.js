const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Admin {
    _id: ID
    email: String
    password: String
  }

  scalar Date

  type Track {
    _id: ID
    title: String
    thumbnail: String
    url: String
    genre: String
    html: String
    publishedAt: Date
  }

  type Auth {
    token: ID!
    admin: Admin
  }

  type Query {
    tracks: [Track]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    seed(id: ID!): [Track]
  }
`;

module.exports = typeDefs;
