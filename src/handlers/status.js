export const status = (req, res, next) => {
  res.send(200, 'OK')
  next();
}
