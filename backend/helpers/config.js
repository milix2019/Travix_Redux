const config = {
  
  action: {
    CREATE: "create",
    UPDATE: "update",
    READ_ONE: "readOne",
    READ_ALL: "readAll",
    DELETE: "delete"
  },
  level: {
    INFO: "info",
    WARNING: "warning",
    ERROR: "error"
  },
  statusCode: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDEN: 403,
    NOT_FOUNF: 404,
    METHOD_NOT_ALLOWED: 405,
    LENGTH_REQUIRED: 411,
    PAYLOAD_TOO_LARG: 413,
    UNSUPPORTED_MEDIA_TYPE: 415
  },
  modules: {
    NOTE: "note",
  }
};


module.exports = config;