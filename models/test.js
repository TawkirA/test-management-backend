import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Please provide subject'],
        minlength: 3,
        maxlength: 25,
        trim: true
    },
    chapters: {
        type: String,
        required: [true, 'Please provide chapter'],
        minlength: 3,
        maxlength: 60,
    },
    examDt: {
        type: String,
        required: [true, 'Please provide exam date'],
    },
    totalMarks: {
        type: String,
        required: true
    },
    questions: [{
        qText: String,
        marks: String
    }],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        // required: [true, 'Please provide user']
    }
}, {timestamps: true})

export default mongoose.model('Test', TestSchema)