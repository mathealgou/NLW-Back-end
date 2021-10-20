import {Request, Response, NextFunction} from "express"

import { verify } from "jsonwebtoken"

//Motivo para não usar typescript #3: EU SEI O QUE TEM NA PORRA DO OBJETO, FUI EU QUE CRIEI
interface IPayload {
    sub: string
}

export function ensureAthenticated(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization

    if(!authToken){
        return response.status(401).json({
            errorCode: "token.invalid"
        })
    }
    const [, token] = authToken.split(" ")


    try {
        //Motivos para não usar Typescript #4 
        const {sub} = verify(token, process.env.JWT_SECRET) as IPayload
        
        request.user_id = sub 
    
        return next()
    } catch (error) {
        return response.status(401).json({errorCode: "token.expired"})
    }

}