const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
const RolePrivileges = require("./RolePrivileges.js");

const schema = new Schema(
  {
    role_name: { type: String, required: true, unique: true },
    is_active: { type: Boolean, default: true },
    created_by: {
      type: SchemaTypes.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

class Roles extends mongoose.Model {
  async remove(query) {
    if (query._id) {
      await RolePrivileges.deleteMany({ role_id: query._id });
    }
    await super.remove(query);
  }
}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);
