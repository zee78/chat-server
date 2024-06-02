const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};
  errors.array().forEach((err) => {
    const fieldName = err.path || "field";
    if (!extractedErrors[fieldName]) {
      extractedErrors[fieldName] = err.msg;
    }
  });
  return res.status(422).json({
    status: 422,
    message: "validation error, try again",
    errors: extractedErrors,
  });
};
module.exports = {
  validate,
};
