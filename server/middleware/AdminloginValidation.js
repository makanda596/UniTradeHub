// middlewares/loginValidate.js
import { check, validationResult } from 'express-validator';

export const AdminloginValidation = [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),

    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

// export const validateLogin = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({
//             message: 'Validation failed',
//             errors: errors.array(),
//         });
//     }
//     next();
// };

