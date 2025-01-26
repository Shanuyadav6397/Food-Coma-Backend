import mongoose from "mongoose";


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
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;