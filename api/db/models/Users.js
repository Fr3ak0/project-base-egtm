const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    first_name: String,
    last_name: String,
    phone_number: String,
    language: { type: String, default: DEFAULT_LANG },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

class Users extends mongoose.Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  static validateFieldsBeforeAuth(email, password) {
    if (
      typeof password !== "string" ||
      password.length < PASS_LENGTH ||
      is.not.email(email)
    )
      throw new CustomError(
        HTTP_CODES.UNAUTHORIZED,
        "Validation Error",
        "email or password wrong"
      );

    return null;
  }
}

schema.loadClass(Users);
module.exports = mongoose.module("users", schema);
