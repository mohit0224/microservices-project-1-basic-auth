import Joi from "joi";

const createAccountValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3).max(50).trim().required().messages({
			"string.base": "Username should be a text value.",
			"string.empty": "Username is required.",
			"string.min": "Username must be at least 3 characters long.",
			"string.max": "Username cannot be longer than 50 characters.",
			"any.required": "Username is a required field.",
		}),

		email: Joi.string().email().lowercase().trim().required().messages({
			"string.base": "Email should be a text value.",
			"string.email": "Please enter a valid email address.",
			"string.empty": "Email is required.",
			"any.required": "Email is a required field.",
		}),

		password: Joi.string()
			.min(8)
			.message("Password must be at least 8 characters long")
			.regex(/[A-Z]/)
			.message("Password must include at least one uppercase letter")
			.regex(/[a-z]/)
			.message("Password must include at least one lowercase letter")
			.regex(/\d/)
			.message("Password must include at least one number")
			.regex(/[!@#$%^&*(),.?":{}|<>]/)
			.message("Password must include at least one special character"),
	});

	return schema.validate(data);
};
const loginAccountValidation = (data) => {
	const schema = Joi.object({
		identifier: Joi.string().min(3).max(50).trim().required().messages({
			"string.base": "Username / Email should be a text value.",
			"string.empty": "Username / Email is required.",
			"string.min": "Username / Email must be at least 3 characters long.",
			"string.max": "Username / Email cannot be longer than 50 characters.",
			"any.required": "Username / Email is a required field.",
		}),

		password: Joi.string()
			.min(8)
			.message("Password must be at least 8 characters long")
			.regex(/[A-Z]/)
			.message("Password must include at least one uppercase letter")
			.regex(/[a-z]/)
			.message("Password must include at least one lowercase letter")
			.regex(/\d/)
			.message("Password must include at least one number")
			.regex(/[!@#$%^&*(),.?":{}|<>]/)
			.message("Password must include at least one special character"),
	});

	return schema.validate(data);
};

export { createAccountValidation, loginAccountValidation };
