import { eventIntercatorInterface } from "../interfaces/eventInteracorInterface";
import { Request,Response } from "express";
import { eventInterface } from "../interfaces/eventInterface";


export class eventController{
    
    private eventInteractor:eventIntercatorInterface

    constructor(eventInteractor:eventIntercatorInterface){
        this.eventInteractor=eventInteractor
    }

    async onCreateEvent(req:Request,res:Response){
        console.log(req.body);
        
          
        const eventData:eventInterface=req.body
        const response= await this.eventInteractor.addEvent(eventData)
        res.json(response)

    }



}