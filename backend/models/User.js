module.exports = UserModel = (mongoose) => {
  const UserSchema = new mongoose.Schema(
    {
      email: String,
      password: String,
      salt: String,
      firstName: String,
      lastName: String,
      age: Number
    },
    { timestamps: true }
  );
  return mongoose.model("User", UserSchema);
};
