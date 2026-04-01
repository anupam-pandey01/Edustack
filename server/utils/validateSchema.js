const Joi = require("joi");

const registerUserSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
    
    password: Joi.string()
        .min(6)
        .required(),


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    
    role: Joi.string()
});


const loginSchema = Joi.object({
    username: Joi.string().allow("").optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    
    password: Joi.string()
        .required(),
        
    role: Joi.string()
});

const verifyCodeSchema = Joi.object({
    verificationCode: Joi.string()
        .pattern(/^[0-9]{6}$/)
        .required()
        .messages({
            'string.pattern.base': 'Verification code must be 6 digits.',
            'any.required': 'Verification code is required.'
        })
});

const uploadCourseSchema = Joi.object({
  courseTitle: Joi.string()
    .min(10)
    .max(80)
    .required(),

  courseDescription: Joi.string()
    .min(30)
    .max(1000)
    .required(),

  courseImage: Joi.optional()
    
});



module.exports = {
    loginSchema,
    registerUserSchema,
    verifyCodeSchema,
    uploadCourseSchema,
}