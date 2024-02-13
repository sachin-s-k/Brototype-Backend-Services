
import mongoose from "mongoose";


const coordinatorSchema=new mongoose.Schema({
    eventsData:Array
}

 )



 const coordinatorsData= mongoose.model('coordinatorsdata',coordinatorSchema)

export {coordinatorsData}
