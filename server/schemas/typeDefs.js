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

  type EmailForm {
    email: String
    type: String
    subject: String
    body: String
  }

  type featuredTrack {
    _id: ID
    thumbnailLink: String
    title: String
    description: String
    releaseDate: Date
  }

  type About {
    header: String
    body: String
    showFeatured: Boolean
    featuredTrack: featuredTrack
  }

  type Auth {
    token: ID!
    admin: Admin
  }

  type AdminCheck {
    isAdmin: Boolean!
  }

  type Status {
    status: Boolean!
  }

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
    sendMessage(email: String!, type: String!, subject: String!, body: String!): Status
  }
`;

module.exports = typeDefs;
