const { Track, Admin } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { updateDb } = require('../helpers/updateDb');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    tracks: async () => {
      return Track.find({});
    },
  },
  Mutation: {
    seed: async (parent, { adminId }, context) => {
      const checkAdmin = await Admin.findById(adminId);
      if (checkAdmin && context.admin) {
        return new AuthenticationError('Failed to authenticate Admin');
      }

      const updated = await updateDb();
      if (!updated) {
        return new Error('Failed to update the database');
      }
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
  },
};

module.exports = resolvers;
