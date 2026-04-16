const { EntitySchema } = require('typeorm');


const TenantSchema = new EntitySchema({
  name: "Tenant",
  tableName: "tenants",
  columns: {
    id: { primary: true, type: "uuid", generated: "uuid" },
    name: { type: "varchar" },
    // Adding the timestamp as per PDF
    createdAt: { type: "timestamp", createDate: true } 
  },
  relations: {
    adminUsers: {
      type: "one-to-many",
      target: "AdminUser",
      inverseSide: "tenant"
    },
    customers: {
      type: "one-to-many",
      target: "Customer",
      inverseSide: "tenant"
    }
  }
});


const AdminSchema = new EntitySchema({
  name: "AdminUser",
  tableName: "admin_users",
  columns: {
    id: { primary: true, type: "uuid", generated: "uuid" },
    email: { type: "varchar", unique: true },
    password: { type: "varchar" },
    role: { 
      type: "enum", 
      enum: ["SUPER_ADMIN", "ADMIN"],
      default: "ADMIN" 
    },
    tenantId: { type: "uuid" },
    createdAt: { type: "timestamp", createDate: true }
  },
  relations: {
    tenant: {
      type: "many-to-one",
      target: "Tenant",
      joinColumn: { name: "tenantId" },
      onDelete: "CASCADE"
    }
  }
});


const CustomerSchema = new EntitySchema({
  name: "Customer",
  tableName: "customers",
  columns: {
    id: { primary: true, type: "uuid", generated: "uuid" },
    firstName: { type: "varchar" }, 
    lastName: { type: "varchar" },  
    email: { type: "varchar" },
    isVerified: { type: "boolean", default: false }, // Added for Phase 3 OTP
    tenantId: { type: "uuid" },
    createdAt: { type: "timestamp", createDate: true }
  },
  relations: {
    tenant: {
      target: "Tenant",
      type: "many-to-one",
      joinColumn: { name: "tenantId" },
      onDelete: "CASCADE"
    },
    segments: {
      type: "many-to-many",
      target: "Segment",
      mappedBy: "customers" 
    }
  }
});


const OTPSchema = new EntitySchema({
  name: "OTP",
  tableName: "otps",
  columns: {
    id: { primary: true, type: "uuid", generated: "uuid" },
    email: { type: "varchar" },
    tenantId: { type: "uuid" },
    code: { type: "char", length: 6 }, 
    expiresAt: { type: "timestamp" },
    used: { type: "boolean", default: false },
    createdAt: { type: "timestamp", createDate: true }
  }
});

const SegmentSchema = new EntitySchema({
  name: "Segment",
  tableName: "segments",
  columns: {
    id: { primary: true, type: "uuid", generated: "uuid" },
    name: { type: "varchar" },
    tenantId: { type: "uuid" },
    createdAt: { type: "timestamp", createDate: true }
  },
  relations: {
    tenant: {
      type: "many-to-one",
      target: "Tenant",
      joinColumn: { name: "tenantId" }
    },
    customers: {
      type: "many-to-many",
      target: "Customer",
      joinTable: {
        name: "segment_customers", // This is the junction table from your PDF
        joinColumn: { name: "segmentId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "customerId", referencedColumnName: "id" }
      }
    }
  }
});


module.exports = { TenantSchema, AdminSchema, CustomerSchema, OTPSchema, SegmentSchema };




