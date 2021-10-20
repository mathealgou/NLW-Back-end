//Motivo para não usar typescript #2 
//Sim, muito normal isso, claro, faço todo dia, ontem mesmo fiz 12 vezes
declare namespace Express {
    export interface Request {
        user_id: string,
    }
}