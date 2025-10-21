import ratelimit from "../config/upstash.js";

const rateLimiter=async(req,res,next)=>{
    try{
        //my-limit-key can be dynamic based on user (what is their id)
        const {success}=await ratelimit.limit("my-rate-limit-key");

        if(!success){
            return res.status(429).json({message:"too many requests"});
        }
        next();
    }
    catch(error){
        console.error("error in rateLimiter middleware",error);
        return res.status(500).json({message:"internal server error"});
    }
}

export default rateLimiter;