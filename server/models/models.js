module.exports = mongoose => {
  const todo = mongoose.model(
    "todo",
    mongoose.Schema({ todo: String }, { timestamps: true })
  );
  return todo;
};
