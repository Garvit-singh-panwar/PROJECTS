import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required:true,

        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password: {
            type:String,
            required: true,
        }

    },
    {timestamps: true}
)

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

userSchema.methods.verifyPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return ;
    }

    this.password = await hashPassword(this.password);

});

const User = mongoose.model("User" , userSchema);
export default User;