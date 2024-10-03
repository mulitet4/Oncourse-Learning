async function validateUrl(req, res, next) {
  const { url } = req.body;
  next();
}

export { validateUrl };
