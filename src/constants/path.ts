const pagePath = {
  home: '/',
  login: '/login',
  signup: '/signup',
  register: '/register',
  profile: '/profile',
  products: '/products',
  productDetail: ':nameId',
  purchases: '/purchases',
  addToCart: '/add-to-cart',
  logout: '/logout',
  categories: '/categories'
} as const

export default pagePath
