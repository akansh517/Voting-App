const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    aadharCardNumber: {
        type: Number,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});


userSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;


// const mongoose=require('mongoose');
// const bcrypt=require('bcrypt');

// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:Number,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     mobile:{    //mobile is country specific so we generally consider the type of mobile as String instead of number
//         type:String
//     },
//     address:{
//         type:String,
//         required:true,
//     },
//     aadharCardNumber:{
//         type:Number,
//         required:true,
//         unique:true //means we can do only one registration with one uid and if it is present in my db then we will not allow to give vote again
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         enum:['voter','admin'],
//         default:'voter'//by default we are assigning to it as a voter
//     },
//     isVoted:{
//         type:Boolean,//bcz by default when user sign up then we know that he had not given the vote after just signing up
//         default:false
//     }

// })



// userSchema.pre('save', async function(next){
//     const person = this;

//     // Hash the password only if it has been modified (or is new)
//     if(!person.isModified('password')) return next();
//     try{
//         // hash password generation
//         const salt = await bcrypt.genSalt(10);

//         // hash password
//         const hashedPassword = await bcrypt.hash(person.password, salt);
        
//         // Override the plain password with the hashed one
//         person.password = hashedPassword;
//         next();
//     }catch(err){
//         return next(err);
//     }
// })

// userSchema.methods.comparePassword = async function(candidatePassword){
//     try{
//         // Use bcrypt to compare the provided password with the hashed password
//         const isMatch = await bcrypt.compare(candidatePassword, this.password);
//         return isMatch;
//     }catch(err){
//         throw err;
//     }
// }


// module.exports=mongoose.model("User",userSchema);
