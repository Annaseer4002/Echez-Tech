import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const payload = {
    user: {
        id: ""
    }
}


export const Authorization = (req: Request, res: Response, next: NextFunction) => {
   
        
     const token = req.header('Authorization');


    if(!token) {
        return res.status(401).json({message: "Access denied, no token provided"});
    }
    
    // console.log(token)

   

        const splitToken = token.split(" ")
        // console.log(splitToken);

        const realToken = splitToken[1]
        if(!realToken){
            return res.status(401).json({message: "Access denied, no token provided"});
        }
        // console.log(realToken);
        
        
        const decoded = jwt.verify(realToken, process.env.ACCESS_TOKEN as string) as typeof payload;
        // console.log(decoded);

       ( req as any) .user = decoded
       console.log((req as any).user);
       console.log((req as any).user.id);

       
       
       

        if(!decoded) {
            return res.status(401).json({message: "Invalid token"});
        }



   

      

    //    req.user = decoded.user
        //  console.log(req.user);
        //  console.log(req.user.username)


        next()

    }

