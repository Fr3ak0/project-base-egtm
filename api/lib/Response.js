const _enum = require("../config/enum");
const CustomError = require("../lib/Error");
class Response {
  constructor() {}

  static succesResponse(data, code = 200) {
    return {
      code,
      data,
    };
  }

  static errorResponse(error) {
    console.error("Error:", error);
    if (error instanceof CustomError) {
      return {
        code: error.code,
        error: {
          message: error.message,
          description: error.description,
        },
      };
    }
    return {
      code: _enum.HTTP_CODES.INT_SERVER_ERROR,
      error: {
        message: "Unkown Error",
        description: error.message,
      },
    };
  }
}

module.exports = Response;
