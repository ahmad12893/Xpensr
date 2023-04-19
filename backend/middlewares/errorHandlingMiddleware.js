//create function to extract error stack or error message from an error object
const getErrMsg = (error) => {
  if (error.stack) {
    //prefer error stack if possible (if it exists) because it contains the most details about an error, which will be an error message and a function call stack
    return error.stack;
  }
  if (typeof error.toString === 'function') {
    return error.toString();
  }
  return '';
};

//create a function to log error messages

const errMsgLog = (error) => {
  console.error(error);
};

//create function that checks if a HTTP status code falls in the 4xx or 5xx error range
const checkErrStatusCode = (status) => {
  return status >= 400 && status < 600;
  //now we will get back all the status codes between 400 and 600
};

//create a function that checks if the error object specifies and HTTP status code

const getHttpStatusCode = ({ error, response }) => {
  const errorStatusCode = error.status || error.statusCode;
  if (checkErrStatusCode(errorStatusCode)) {
    return errorStatusCode;
  }
  // existing response 'statusCode' will be 200 by default in express but a route handler or middleware might already have set and error http status code (4xx or 5xx)
  const responseStatusCode = response.statusCode;
  if (checkErrStatusCode(responseStatusCode)) {
    return responseStatusCode;
  }
  //generic error http as a fallback --> 500 (internal server error)
  return 500;
};

// const errorHandlingMiddleware = (err, req, res, next) => {
//   const error = getErrMsg(err);
// };

const errorHandlingMiddleware = (error, request, response, next) => {
  const errMsg = getErrMsg(error);

  errMsgLog(errMsg);

  //if response header already sent, delegate to default Express error handler
  if (response.headersSent) {
    return next(error);
  }

  const errResponse = {
    statusCode: getHttpStatusCode({ error, response }),
    body: undefined,
  };

  //Set the response status code.
  response.status(errResponse.statusCode);

  // express res.format() automatically sets 'Content-Type' and 'Vary: Accept' response headers
  // this method performs content negotiation

  // express res.format() automatically sets 'Content-Type' and 'Vary: Accept' response headers
  // this method performs content negotiation

  response.format({
    //set a JSON formatted response body --> Response header: 'Content-Type': 'application/json'
    json: () => {
      response.json({ message: errResponse.body });
    },
    //set a plain text response body --> Response header: 'Content-Type': 'text/plain'
    default: () => {
      response.type('text/plain').send(errResponse.body);
    },
  });

  next();
};

module.exports = { errorHandlingMiddleware };
