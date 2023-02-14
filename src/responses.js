const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// response for when the response is successful
const success = (request, response, type) => {
  const object = {
    message: 'Successful response',
  };

  if (type[0] === 'text/xml') {
    let XML = '<response>';
    XML += `<message>${object.message}</message>`;
    XML += '</response>';

    return respond(request, response, 200, XML, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(object), 'application/json');
};

// Error 400: Bad request
const badRequest = (request, response, type, params) => {
  let status = 200;

  const object = {
    message: 'Request has required parameters',
    id: 'badRequest',
  };

  // checks the parameters to see if they are not validm and it changes the status to 400
  if (params.valid !== 'true' || !params.valid) {
    object.message = 'Missing valid query paramters';
    response.id = 'badRequest';
    status = 400;
  }

  if (type[0] === 'text/xml') {
    let XML = '<response>';
    XML += `<message>${object.message}</message>`;
    XML += '</response>';

    return respond(request, response, status, XML, 'text/xml');
  }

  return respond(request, response, status, JSON.stringify(object), 'application/json');
};

// Error 401: Not Authorized
const unauthorized = (request, response, type, params) => {
  let status = 200;

  const object = {
    message: 'Request has required paramters',
    id: 'unauthorized',
  };

  // Checks if the user is logged in, will deny authorization if not
  if (params.loggedIn !== 'yes' || !params.loggedIn) {
    object.message = 'Missing valid query paramters';
    response.id = 'badRequest';
    status = 401;
  }

  if (type[0] === 'text/xml') {
    let XML = '<response>';
    XML += `<message>${object.message}</message>`;
    XML += '</response>';

    return respond(request, response, status, XML, 'text/xml');
  }

  return respond(request, response, status, JSON.stringify(object), 'application/json');
};

// Error 403: Forbidden
const forbidden = (request, response, type) => {
  const object = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (type[0] === 'text/xml') {
    let XML = '<response>';
    XML += `<message>${object.message}</message>`;
    XML += '</response>';

    return respond(request, response, 403, XML, 'text/xml');
  }

  return respond(request, response, 403, JSON.stringify(object), 'application/json');
};

// Error 404: page not found
const notFound = (request, response, type) => {
  const object = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  if (type[0] === 'text/xml') {
    let XML = '<response>';
    XML += `<message>${object.message}</message>`;
    XML += '</response>';

    return respond(request, response, 404, XML, 'text/xml');
  }

  return respond(request, response, 404, JSON.stringify(object), 'application/json');
};

// Error 500: Internal Error
const internal = (request, response, type) => {
  const object = {
    message: 'Internal Server Error',
    id: 'internalError',
  };

  if (type[0] === 'text/xml') {
    let XML = '<response>';
    XML += `<message>${object.message}</message>`;
    XML += '</response>';

    return respond(request, response, 500, XML, 'text/xml');
  }

  return respond(request, response, 500, JSON.stringify(object), 'application/json');
};

// Error 501: Page not Implemented
const notImplemented = (request, response, type) => {
  const object = {
    message: 'Page has not been implemented yet. Check back later.',
    id: 'notImplemented',
  };

  if (type[0] === 'text/xml') {
    let XML = '<response>';
    XML += `<message>${object.message}</message>`;
    XML += '</response>';

    return respond(request, response, 501, XML, 'text/xml');
  }

  return respond(request, response, 501, JSON.stringify(object), 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  internal,
  notImplemented,
};
