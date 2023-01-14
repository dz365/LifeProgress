module.exports = DailyReflections = (mongoose) => {
  const DailyReflectionsSchema = new mongoose.Schema(
    {
      userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      reflections: [
        {
          year: String,
          month: {
            1: [{ day: Number, happiness: String, reflection: String }],
            2: [{ day: Number, happiness: String, reflection: String }],
            3: [{ day: Number, happiness: String, reflection: String }],
            4: [{ day: Number, happiness: String, reflection: String }],
            5: [{ day: Number, happiness: String, reflection: String }],
            6: [{ day: Number, happiness: String, reflection: String }],
            7: [{ day: Number, happiness: String, reflection: String }],
            8: [{ day: Number, happiness: String, reflection: String }],
            9: [{ day: Number, happiness: String, reflection: String }],
            10: [{ day: Number, happiness: String, reflection: String }],
            11: [{ day: Number, happiness: String, reflection: String }],
            12: [{ day: Number, happiness: String, reflection: String }],
          },
        },
      ],
    },
    { timestamps: true }
  );
  return mongoose.model("DailyReflections", DailyReflectionsSchema);
};
