const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req,res) => {
    try
    {
        const {name,email,password} = req.body;

        //Validate the Input
        if(!name || !email || !password)
            return res.status(400).json({message:"All Fields are required !!!"});

        //Check for existing user
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message:"User already Exists"});

        //password encrption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //Create the User, (Not Approved by Default)
        const user = await User.create(
            {
                name,
                email,
                password:hashedPassword,
                isApproved:false

            }
        );

        res.status(201).json({message:"Registration Successful !! waiting for admin approval"});


    }
    catch (error) 
    {
        res.status(500).json({ message: error.message });
    }
    
}

exports.loginUser = async (req,res)=>{
    try
    {
        const {email,password} = req.body;

        //Searching for User
        const user = await User.findOne({email});

        //If No user is present
        if(!user)
            res.status(400).json({message:"Invalid Credentials"});

        //Check for Admin Approval
        if (user.isApproved === false) {
            return res
              .status(403)
              .json({ message: "Account not approved by admin" });
          }

        //Password comparing
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
            res.status(400).json({message:"Invalid Credentials"});

        //Generate JWT
        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
}