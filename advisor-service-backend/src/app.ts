import express,{Request,Response,Application} from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/dbConnection'
import  router  from './routes/router'
import bodyParser from 'body-parser'
dotenv.config()

const app:Application=express()
const port:string|undefined=process.env.PORT
const mongoUri:string|undefined=process.env.MONGO_URI
app.use(bodyParser.json())
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
  })

app.use('/coordinators',router)
  app.listen(port,()=>{
    console.log(`Server is Fire at http://localhost:${port}`);
    
  })

  connectDB(mongoUri)