import { defineEventHandler, readBody } from 'h3';
import connectMongo from '../../../db/connection';
import LinkedinPost from '../../../models/linkedin-post';

export default defineEventHandler(async (event) => {
  connectMongo().catch((error) => ({
    statusCode: 400,
    body: { error: 'Connecting to db failed!' },
  }));

  switch (event._method) {
    case 'POST':
      return addPost(event);

    case 'GET':
      return getPosts();

    default:
      return {
        statusCode: 404,
        body: { error: 'HTTP method doesn`t exist ' },
      };
  }
});

const getPosts = async () => {
  try {
    const posts = await LinkedinPost.find({}).sort({date: 'desc'});
    return {
      statusCode: 200,
      body: { status: true, response: posts },
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: { error },
    };
  }
};

const addPost = async (event) => {
  const body = await readBody(event);

  const newPost = new LinkedinPost({ ...body });

  try {
    const response = await newPost.save();

    return {
      statusCode: 200,
      body: { status: true, response },
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: { error },
    };
  }
};
