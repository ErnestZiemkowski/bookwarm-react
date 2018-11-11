import { schema } from 'normalizr';

const bookSchema = new schema.Entity(
    "books",
    {},
    { idAttribute: "_id" }
);

export default bookSchema;