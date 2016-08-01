const SubclassError = require('subclass-error');

exports.Error = SubclassError("Error", {statusCode:400});

exports.NotAuthorizedError = SubclassError("NotAuthorizedError", exports.Error, {statusCode:401});
exports.ForbiddenError = SubclassError("ForbiddenError", exports.Error, {statusCode:403});
exports.NotFoundError = SubclassError("NotFoundError", exports.Error, {statusCode:404});
