const validation = (argSchema) => {
  const validationMiddleware = (req, _, next) => {
    const { error } = argSchema.validate(req.body)
    if (error) {
      error.status = 400
      next(error)
    }
    next()
  }
  return validationMiddleware
}
module.exports = validation
