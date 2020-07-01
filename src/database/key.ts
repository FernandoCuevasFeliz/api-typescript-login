export const URI = process.env.MONGO_URI || 'mongodb://localhost/db_test';

export const configDB = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
