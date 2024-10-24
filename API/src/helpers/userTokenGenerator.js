import jwt from 'jsonwebtoken'
import configEnv from "./configEnv";

const UserTokenGenerator=async(email)=>{
    const token=await jwt.sign(
        {email},
        process.env.TOKEN_SECRET,{
            expiresIn:'20h'
        }
    )
    return token;
}

export default UserTokenGenerator;