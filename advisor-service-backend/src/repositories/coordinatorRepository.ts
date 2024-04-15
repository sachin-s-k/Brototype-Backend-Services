import { coordinators } from "../entities/coordinators";
import { ICoordinatorRepository } from "../interfaces/ICoordinatorRepository";


export class CoordinatorRepository implements ICoordinatorRepository{
    addCoordinatorProfile(coordinatorData: any) {
        

    }
   async  editCoordiantorProfile(coordinatorData: any) {
    const response=await coordinators.findByIdAndUpdate(coordinatorData.id,{fullName:coordinatorData.fullname,email:coordinatorData.emailId,profileImageUrl:coordinatorData.profileImageUrl,mobileNumber:coordinatorData.mobileNumber})

return response
        
    }
    async getCoordinatorProfile(id: string) {

        const response=await coordinators.findById(id)
        return response
        
    }
     async findTopcoordinators() {
        
        const response= await coordinators.find().sort({totalReviews:-1}).limit(5)
        console.log(response,'topppppp');
        

        return response
    }
}