import kafkajs from 'kafkajs';
import { sendAdvisorData } from './kafkaService';
import { DistributeRepository } from '../repositories/distributeRepository';
import { DistributeInteractor } from '../interactors/distributeInteractor';
import { DistributeController } from '../conrollers/distrbuteContoller';
const distributeRepository=new DistributeRepository
const distributeInteractor=new DistributeInteractor(distributeRepository)
const distributeController=new DistributeController(distributeInteractor)

const kafkaClient = new kafkajs.Kafka({
  clientId: 'coordinator-service',
  brokers: ['127.0.0.1:9092']
});
const consumer = kafkaClient.consumer({ groupId: 'coordinator' });

async function consumeReviewData() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'review-events',fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const reviewDatas = JSON.parse((message as any).value.toString());
        
        if(reviewDatas.type=='advisors-task'){
            console.log('advisors taskkkk',reviewDatas);

         distributeController.onDistributeReviews(reviewDatas)

            
        }
        if(reviewDatas.type=='review-scheduler-data'){
            let coordinatorData=[{_id:'123',name:"sachin"},{_id:'34343',name:"sreeragg"}]
            const corrdinatorReviewData=sendAdvisorData('coordinator-data',coordinatorData)
          console.log('Product availability updated successfully.');
            
        }
         
      } catch (error) {
        console.error('Error processing order event:', error);
      }
    }
  });

 

 
  
}
async function consumeMeetData() {
  return new Promise((resolve, reject) => {
    let meetLinkData;

    consumer.connect().then(() => {
      consumer.subscribe({ topic: 'meeting-link', fromBeginning: true }).then(() => {
        consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            try {
              meetLinkData = JSON.parse((message as any).value.toString());
              console.log('Received meeting link:', meetLinkData);

              // Stop the consumer after receiving the meeting link
              consumer.stop().then(() => {
                console.log('Consumer stopped.');
              });

              resolve(meetLinkData);
            } catch (error) {
              console.log('Error parsing message:', error);
              reject(error);
            }
          }
        });
      });
    }).catch(error => {
      console.log('Error connecting/subscribing to Kafka:', error);
      reject(error);
    });
  });
}



export {consumeReviewData,consumeMeetData}