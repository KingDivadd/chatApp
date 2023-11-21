const { NotFoundError } = require('../error')

const notFound = (req, res, next) => {
    throw new NotFoundError("Page not found!!! check url and try again")
    next()
}

module.exports = notFound