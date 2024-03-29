import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
     { 
      googleId: { 
        type: String
      },
        firstName: { 
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      lastName: { 
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      email: { 
        type: String,
        required: true,
        unique: true,
        max: 50,
      }, 
      password: { 
        type: String,
        require: true,
        min: 5,
       
      },
      picturePath: { 
        type: String,
        default: '',
      }
      ,
      friends:      { 
        type: Array,
        default:[]
      }, 
      occupation: String,
      location: String,
      viewedProfile: Number,
      impressions: Number,
      isAdmin: {
        type: Boolean,
        require: true,
        default: false
      }

      
      

    
    },  { timestamps: true}
);

const User = mongoose.model('User', UserSchema);
export default User;