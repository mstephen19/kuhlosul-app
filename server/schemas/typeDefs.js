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

  type AdminCheck {
    isAdmin: Boolean!
  }

  type Query {
    tracks: [Track]
    viewdashboard: AdminCheck
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    seed: [Track]
    changePassword(password: String!): Admin
    createAdmin(email: String!, password: String!): Admin
  }
`;

module.exports = typeDefs;
