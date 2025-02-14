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
    await connectMongo();

    const body = await readBody(event);

    const newUserRequest = new UserRequest({ ...body });
    const response = await newUserRequest.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'async.it.ua@gmail.com',
        pass: 'zemf aaji qxvs xljk',
      },
    });

    const mailOptionsCompany = {
      from: response.email,
      to: 'async.it.ua@gmail.com',
      subject: 'Contact Us',
      html: `
          <h1 class="text-2xl font-semibold text-gray-800">New Contact Request</h1>
          <p class="text-lg text-gray-600">You can reach out to the user directly via the email below:</p>
          <ul class="list-none pl-5 text-gray-800 space-y-2">
            <li class="text-lg">${response.name} ${response.surname}</li>
            <li class="text-lg">${response.message}</li>
            <li class="text-lg"><strong>Email:</strong> ${response.email}</li>
          </ul>
          <p class="text-lg text-gray-600">Feel free to contact them for further details.</p>
        `
    };
    const mailOptionsUser = {
      from: 'async.it.ua@gmail.com',
      to: response.email,
      subject: 'We’ve received your message!',
      html: `
          <h1 class="text-2xl font-semibold text-gray-800">Thank you for reaching out!</h1>
          <p class="text-lg text-gray-600">We’ve received your message and will get back to you shortly. Here’s the information we received:</p>
          <ul class="list-none pl-5 text-gray-800 space-y-2">
            <li class="text-lg">${response.name} ${response.surname}</li>
            <li class="text-lg">${response.message}</li>
            <li class="text-lg"><strong>Email:</strong> ${response.email}</li>
          </ul>
          <p class="text-lg text-gray-600">Our team will review your message and respond as soon as possible. You can reach us at the email above if needed.</p>
          <p class="text-lg text-gray-600">Thank you for contacting us!</p>
        `
    };
    // Send letter to company
    transporter.sendMail(mailOptionsCompany, (error, info) => {
      if (error) {
        console.log('Error sending to company:', error);
      } else {
        console.log('Company notification sent:', info.response);
      }
    });

    // Send duplicate letter to user
    transporter.sendMail(mailOptionsUser, (error, info) => {
      if (error) {
        console.log('Error sending to user:', error);
      } else {
        console.log('User notification sent:', info.response);
      }
    });

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
