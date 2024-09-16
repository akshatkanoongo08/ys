const UserModel=require('../Models/User');
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email});

        if(user){
            return res.status(409)
            .json({message:'User already exists,you can login',success:false})
        }

        const userModel=new UserModel({name,email,password});
        userModel.password=await bcrypt.hash(password,10)

        await userModel.save();
        res.status(201)
        .json({
            message:"signup successfully"
            ,success:true
        })
    }catch(err){
        res.status(500)
        .json({
            message:"internal server error",
            success:false
        }
        )
    }
}
const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Log the incoming request body
        console.log("Login request body:", req.body);

        const user = await UserModel.findOne({ email });

        if (!user) {
            console.log("User not found:", email);
            return res.status(403).json({ message: 'Auth failed: email or password is wrong', success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            console.log("Password mismatch for user:", email);
            return res.status(403).json({ message: 'Auth failed: email or password is wrong', success: false });
        }

        const jwttoken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Log successful login
        console.log("User logged in successfully:", email);

        return res.status(200).json({
            message: "Login successful",
            success: true,
            jwttoken,
            email,
            name: user.name
        });

    } catch (err) {
        console.error("Error in login function:", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
module.exports={
    signup,login
}