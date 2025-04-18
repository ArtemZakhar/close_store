export const responseMessages = {
  codes: {
    200: 200,
    201: 201,
    401: 401,
    403: 403,
    404: 404,
    409: 409,
    500: 500,
    503: 503,
  },
  user: {
    message: 'User already exist',
    emailSendingFailed: 'Email sending failed',
    noUser: 'There are no such user',
    wrongPassword: 'Wrong password',
    forbidden: 'forbidden',
  },

  password: {
    noUser: 'There are no such user',
  },

  token: {
    expired: 'Token has expired',
    invalid: 'Invalid token',
  },

  server: {
    error: 'Internal server error',
  },

  goods: {
    exist: 'Goods already exist',
    category: {
      noData: 'Invalid input or data is missing',
      exist: 'Category name or uniqueID already exist',
      notExist: 'This category is not exist',
    },

    seller: {
      noData: 'Missing email or phone input.',
    },
    firm: {
      noData: 'Missing name or country of goods firm.',
    },
    delete: 'Успішно видалено',
  },
};
