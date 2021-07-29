import { HandlerEvent } from '@netlify/functions';

export const handler = async (event: HandlerEvent) => {
  try {
    const subject = event?.queryStringParameters?.name || 'Wow';
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
