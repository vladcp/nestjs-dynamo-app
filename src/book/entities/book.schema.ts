import { Schema } from 'dynamoose';

export const BookSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  publicationYear: {
    type: Number,
  },
});
