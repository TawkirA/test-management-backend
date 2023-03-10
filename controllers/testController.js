import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticationError } from '../Errors/index.js';
import Test from '../models/test.js';

const addTest = async (req, res, next) => {
    const { questions, subject, chapters, examDt, totalMarks } = req.body;

    if (questions.length === 0 || subject === "" || chapters === "" || examDt === "" || totalMarks === "") {
        throw new BadRequestError('Please provide all the values')
    }

    req.body.createdBy = req.user.userId;

    const test = await Test.create(req.body);
    console.log('TEST', test);
    res.status(StatusCodes.CREATED).json({test});
}

const getAllTest = async (req, res, next) => {
    const allTest = await Test.find()

    res.status(StatusCodes.OK).json({ allTest })
}

export { addTest, getAllTest }
