


import { coordinatorsData } from "../entities/eventEntity";
import { eventInterface } from "../interfaces/eventInterface";
import { eventRepositoryInterface } from "../interfaces/eventRepositoryInterface";


export class eventRepository implements eventRepositoryInterface{


    

    async addEvent(event: eventInterface) {
        console.log('hello',event);
        
        
        const response= await coordinatorsData.findByIdAndUpdate('659fd55e988e29ecff029fbb',{$push:{eventsData:event}},  { new: true})

           return response

        
    }

}