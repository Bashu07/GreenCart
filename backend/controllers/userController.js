import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Register User
export const register =async(req , res)=>{
    try {
        const {name , email , password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({success:false , message:"Missing Details"})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.json({success:false , message:"User already exist "})
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const user = await User.create({name , email , password:hashedPassword})

        const token = jwt.sign({id: user._id } , process.env.JWT_SECRET, {expiresIn:'7d'})

        res.cookie('token' , token , {
            httpOnly:true, //prevent javascript to access the cookie
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge: 7*24*60*60* 1000,

        })

        return res.json({success:true , user:{email :user.email , name:user.name}})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false})
    }
}


// Login User /api/user/login

export const login = async(req,res)=>{
    try {
       
        const {email , password} = req.body
        if(!email || !password){
            res.json({success:false , message:"Email and password are are required"})
        }

        const user = await User.findOne({email})
        if(!user){
            res.json({success:false , message:"Invalid email or password"})
        }
        const isMatch  = await bcrypt.compare(password , user.password)

        if(!isMatch){
            res.json({success:false , message:"Invalid email or password"})
}
const token = jwt.sign({id: user._id } , process.env.JWT_SECRET, {expiresIn:'7d'})

        res.cookie('token' , token , {
            httpOnly:true, //prevent javascript to access the cookie
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge: 7*24*60*60* 1000,

        })

        return res.json({success:true , token})



    } catch (error) {
         console.log(error.message)
        res.status(500).json({success:false})
    }
}

// User authentication controller : /api/user/is-auth

export const isAuth = async (req, res) => {
  try {
    const userId = req.userId  // From auth middleware
    const user = await User.findById(userId).select("-password")

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    return res.json({ success: true, user })

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}



// Logout User : /api/user/logout
export const logout = async(req , res)=>{
    try {
        res.clearCookie('token',{
         httpOnly:true, 
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
        })
        return res.json({success:true , message:"Logout successfully"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false , message:error.massage})
        
    }
}