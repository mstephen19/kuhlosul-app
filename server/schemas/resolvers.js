const { AuthenticationError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const { Types } = require('mongoose');
// ex. { $push: { exercises: Types.ObjectId(_id) } },
const { Track, Admin } = require('../models');

const { updateDb } = require('../helpers/updateDb');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    tracks: async () => {
      const tracks = await Track.find({});
      return tracks;
    },
    viewdashboard: async (parent, args, context) => {
      if (!context.admin) return { isAdmin: false };
      const admin = await Admin.findOne({ _id: context.admin._id });
      if (admin) return { isAdmin: true };
      if (!admin) return { isAdmin: false };
    },
  },
  Mutation: {
    seed: async (parent, args, context) => {
      if (!context.admin)
        return new AuthenticationError('Failed to authenticate Admin');
      const checkAdmin = await Admin.findById(context.admin._id);
      if (!checkAdmin) {
        return new AuthenticationError('Failed to authenticate Admin');
      }

      const updated = await updateDb();
      if (!updated) {
        return new Error('Failed to update the database');
      }
      // console.log(updated);
      return updated;
    },
    login: async (parent, { email, password }) => {
      const admin = await Admin.findOne({ email });

      if (!admin) return new Error('No admin with this email found!');

      const correctPass = await admin.checkPassword(password);

      if (!correctPass) return new AuthenticationError('Incorrect passoword!');

      const token = signToken(admin);
      return { token, admin };
    },
    changePassword: async (parent, { password }, context) => {
      if (!context.admin)
        return new AuthenticationError('Failed to authenticate Admin');

      const withNewPassword = await Admin.findOneAndUpdate(
        { _id: context.admin._id },
        { password: password },
        { new: true }
      );

      return withNewPassword;
    },
  },
  // Define custom type of Date
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
};

module.exports = resolvers;
