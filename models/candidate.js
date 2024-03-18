const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// Define the Person schema
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;



// const mongoose=require('mongoose');

// const candidateSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     party:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:Number,
//         required:true
//     },
//     votes:[
//         {
//             user:{
//                 type:mongoose.Schema.Types.ObjectId,
//                 ref: "User",
//                 required:true
//             },
//             votedAt:{
//                 type:Date,
//                 default:Date.now()
//             }
//         }
//     ]
//     //we have to keep track of how many votes are given to that particular candidate so we are creating an array of data inside which we are creating different objects which have user info. that what is the userID and and at what time had voted so we are creating nested objects 
//     // the id which we are passing is provided by the mongo db at the time of creation of any record that is _id,object id 
//     ,
//     voteCount:{//Initially the vote count is 0 when the candidate is registered
//         type:Number,
//         default:0
//     }
// })

// module.exports=mongoose.model("Candidate",candidateSchema);