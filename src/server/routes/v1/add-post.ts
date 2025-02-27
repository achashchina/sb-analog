import { defineEventHandler, readBody } from 'h3';
import connectMongo from '../../../db/connection';
import LinkedinPost from '../../../models/linkedin-post';

export default defineEventHandler(async (event) => {
    console.log(999);
  connectMongo().catch((error) => ({
    statusCode: 400,
    body: { error: 'Connecting to db failed!' },
  }));

  const body = await readBody(event);
  console.log(body);

  const newUserRequest = new LinkedinPost({ ...body });

  try {
    await connectMongo();

    // const body = await readBody(event);
    const response = await newUserRequest.save();

  

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
});
