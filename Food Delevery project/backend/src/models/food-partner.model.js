import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

foodPartnerSchema.methods.verifyPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


foodPartnerSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await hashPassword(this.password);
    
});


const FoodPartnerModel = mongoose.model("FoodPartner", foodPartnerSchema);

export default FoodPartnerModel;