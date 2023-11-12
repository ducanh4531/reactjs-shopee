const pagePath = {
  home: '/',
  login: '/login',
  signup: '/signup',
  register: '/register',
  profile: '/profile',
  products: '/products',
  productDetail: ':nameId',
  purchase: '/purchase',
  logout: '/logout',
  categories: '/categories'
} as const

export default pagePath
