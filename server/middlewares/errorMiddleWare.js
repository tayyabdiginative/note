const notFound = (req, res, next) => {
  const error = new Error(`NOT Fount ${req.originalUrl}`);
  res.statue(404);
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statue(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "porduction" ? null : res.stack,
  });
};
module.exports = { notFound, errorHandler };
