exports.validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({ errors: result.error.flatten() });
  }
  req.validated = result.data;
  next();
};

exports.validateUser = (req, res, next) => {
  const reqUserId = req.params.userId;
  const loggedInUserId = req.session.userId;

  if (!loggedInUserId) {
    return res
      .status(401)
      .json({ message: "You have to log in to create a rental." });
  }

  if (Number(loggedInUserId) !== Number(reqUserId)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};
