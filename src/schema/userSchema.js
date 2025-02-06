import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minLength: [3, 'First should be at least 3 characters long'],
        maxLength: [20, 'First name should not exceed 20 characters'],
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minLength: [3, 'Last should be at least 3 characters long'],
        maxLength: [20, 'Last name should not exceed 20 characters'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already exists'],
        trim: true,
        lowercase: true,
        // match: [/.+\@.+\..+/, 'Please enter a valid email']
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    mobileNumber: {
        type: Number,
        required: [true, 'Mobile number is required'],
        unique: [true, 'Mobile number is already exists'],
        trim: true,
        validate: {
            validator: function (value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: (props) => `${props.value} is not a valid mobile number!`,
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minLength: [6, 'Password should be at least 6 characters long'],
        maxLength: [20, 'Password should not exceed 20 characters'],
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        minLength: [10, 'Address should be at least 10 characters long'],
        maxLength: [100, 'Address should not exceed 100 characters'],
    },
}, { timestamps: true });


userSchema.pre('save', async function (next) { //next is a callback function
    if (!this.isModified('password')) { //isModified is a mongoose method to check if the password is modified or not
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;