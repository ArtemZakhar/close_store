export const apiCalls = {
  categories: '/api/goods/categories',
  categoriesUpdate(id: string) {
    return `/api/goods/categories/${id}`;
  },
  cities: '/api/cities',
  countries: '/api/countries',
  forgotPassword: '/api/auth/forgot-password',
  finishRegistration: '/api/users/finish-registration',
  firms: '/api/goods/firms',
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  newPassword: '/api/auth/new-password',
  sellers: '/api/goods/sellers',
  users: '/api/users',
};
