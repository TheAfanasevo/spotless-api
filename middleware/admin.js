/* A function that checks whether the user is admin or not. */
module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
};

/* HTTP Status Codes Used in the App */
//200 OK
//400 Bad Request
//401 Unauthorized - No valid token supplied.
//403 Forbidden - No permission.
//404 Not Found.
//500 Internal Server Error