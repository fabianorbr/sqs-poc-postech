import * as dotenv from 'dotenv';
dotenv.config();

import { SQS } from 'aws-sdk';
const sqs = new SQS();

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });

export async function sendMessage(message: string) {
  const params: SQS.Types.SendMessageRequest = {
    QueueUrl: `${process.env.AWS_QUEUE_URL}`,
    MessageBody: JSON.stringify(message),
    MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`,
  };

  try {
    const data = await sqs.sendMessage(params).promise();
      console.log('Message sent:', data.MessageId);
  } catch (error) {
      console.error('Error sending message:', error);
  }
}