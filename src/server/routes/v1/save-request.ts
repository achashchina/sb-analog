import { defineEventHandler, readBody } from 'h3';
import nodemailer from 'nodemailer';
import connectMongo from '../../../db/connection';
import UserRequest from '../../../models/user-request';

export default defineEventHandler(async (event) => {
  connectMongo().catch((error) => ({
    statusCode: 400,
    body: { error: 'Connecting to db failed!' },
  }));

  const body = await readBody(event);

  const newUserRequest = new UserRequest({ ...body });
  const response = await newUserRequest.save();

  try {
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
