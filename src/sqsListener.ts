import * as dotenv from 'dotenv';
dotenv.config();

import { SQS } from 'aws-sdk';
const sqs = new SQS();

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });


export async function receiveMessages() {
  while (true) {
    try {
      const receiveParams: SQS.Types.ReceiveMessageRequest = {
        QueueUrl: `${process.env.AWS_QUEUE_URL}`,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20, // Adjust as needed
      };

      const data = await sqs.receiveMessage(receiveParams).promise();

      if (data.Messages && data.Messages.length > 0) {
        const message = data.Messages[0];
        console.log('Received message:', message.Body);

        // Process the message as needed

        // Delete the message from the queue
        await sqs
          .deleteMessage({
            QueueUrl: `${process.env.AWS_QUEUE_URL}`,
            ReceiptHandle: message.ReceiptHandle!,
          })
          .promise();
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }
}