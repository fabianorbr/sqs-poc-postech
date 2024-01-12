import { sendMessage } from "./sqsSender";
import { receiveMessages } from "./sqsListener"; 

/********* Sending message to AWS SQS **********/
const messagesToSend = ['Message 01', 
                        'Message 02',
                        'Message 03'];

messagesToSend.forEach(async (message) => {
  await sendMessage(message);
});
/**********************************************/


/********* Receiving message from AWS SQS **********/
//receiveMessages();
/***************************************************/
