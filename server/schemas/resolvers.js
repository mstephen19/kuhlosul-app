const { AuthenticationError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const { Types } = require('mongoose');
// ex. { $push: { exercises: Types.ObjectId(_id) } },
const { Track, Admin, About } = require('../models');

const { updateDb } = require('../helpers/updateDb');
const { signToken } = require('../utils/auth');

require('dotenv').config();

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
    getAbout: async (parent, args) => {
      try {
        const about = await About.findOne({ code: 123 }, { code: 0 });

        return about;
      } catch (err) {
        return err;
      }
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

      updateDb();

      const tracks = await Track.find({});

      // if (!updated) {
      //   return new Error('Failed to update the database');
      // }
      return tracks;
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
    createAdmin: async (parent, args, context) => {
      if (!context.admin)
        return new AuthenticationError('Failed to authenticate current Admin');

      try {
        const newAdmin = await Admin.create(args);

        return newAdmin;
      } catch (err) {
        return new Error(err);
      }
    },
    updateAbout: async (parent, { header, body }, context) => {
      if (!context.admin)
        return new AuthenticationError('Failed to authenticate current Admin');

      try {
        const updated = await About.findOneAndUpdate(
          { code: 123 },
          { header, body },
          { new: true, fields: { code: 0 } }
        );

        if (!updated) return new Error('Failed to update the homepage!');

        return updated;
      } catch (err) {
        return new Error(err);
      }
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
