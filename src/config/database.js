const { DataSource } = require('typeorm');
require('dotenv').config();
const { TenantSchema, AdminSchema, CustomerSchema, OTPSchema, SegmentSchema } = require('../models/entities');

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // This builds the tables for you!
  ssl: { rejectUnauthorized: false },
  entities : [TenantSchema, AdminSchema, CustomerSchema, OTPSchema, SegmentSchema]
  // entities: [require('../models/entities').TenantSchema, require('../models/entities').AdminSchema, require('../models/entities').CustomerSchema]
});

module.exports = { AppDataSource };