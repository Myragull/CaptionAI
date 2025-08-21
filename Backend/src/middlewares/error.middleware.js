const errorMiddleware = (err, req, res, next) => {

const status = err.status || 500;
const message = err.message || "Backend error";
const extraDetails = err.extraDetails || null;
console.error(err.stack)


  res.status(status).json({
    message,
    extraDetails,
  });
};

module.exports = errorMiddleware;
