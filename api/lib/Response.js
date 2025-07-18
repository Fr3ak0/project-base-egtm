class Response {
  constructor() {}

  static succesResponse(data, code = 200) {
    return {
      code,
      data,
    };
  }

  static errorResponse(code, message) {
    return {
      code,
      error: {
        message: error.message,
        description: error.description,
      },
    };
  }
}

module.exports = Response;
