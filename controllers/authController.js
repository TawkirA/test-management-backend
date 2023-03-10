import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticationError } from '../Errors/index.js';

const register = async (req, res, next) => {
    
    const { name, phoneNumber, password } = req.body;
    console.log('Body', name, phoneNumber, password);
    if(!name || !phoneNumber || !password) {
        throw new BadRequestError('Please provide all the values')
    }
    console.log('phoneNum', phoneNumber);
    const isNumberAlreadyExist = User.findOne({phoneNumber});
    // console.log('isNumberAlreadyExist', isNumberAlreadyExist);
    // if (isNumberAlreadyExist) {
    //     throw new Error('Number already exists')
    // }

    const user = await User.create({ name, phoneNumber, password });
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({ user: {name: user.name, phoneNumber: user.phoneNumber}, token })
}

const login = async (req, res) => {
    const { phoneNumber, password } = req.body;
    console.log('CHK', phoneNumber, password);
    if (!phoneNumber || !password) {
        throw new BadRequestError('Please provide all the values')
    }
    
    const user = await User.findOne({ phoneNumber }).select('+password');
    console.log('CHK1', user);
    if (!user) {
        throw new UnAuthenticationError('Invalid credential');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    console.log('CHK', isPasswordCorrect);
    if (!isPasswordCorrect) {
        throw new UnAuthenticationError('Invalid credential');
    }

    const token = await user.createJWT();
    user.password = undefined;

    res.status(StatusCodes.OK).json({ user, token })
}

export { register, login }