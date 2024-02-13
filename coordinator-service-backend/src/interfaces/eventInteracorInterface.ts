import { eventInterface } from "./eventInterface";


export interface eventIntercatorInterface{

    addEvent(event:eventInterface):any
    editevent(event:eventInterface,id:string):any
    deleteEvent(id:string):any
 

}