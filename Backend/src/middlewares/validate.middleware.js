const { ZodError } = require("zod");
const apiError = require("../utils/apiError");

const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      // Collect all error messages
      const messages = err.issues.map((e) => e.message);
      return next(new apiError(422, "Validation failed", messages));
      // return res.status(400).json({ errors: messages });
    }

    // Fallback for non-Zod errors
    // return res.status(400).json({ msg: err.message || "Invalid request data"});
    return next(new apiError(400, err.message || "Invalid request data"));
  }
};

module.exports = validate;
