const pagePath = {
  home: '/',
  login: '/login',
  signup: '/signup',
  cart: '/cart',
  register: '/register',
  profile: '/profile',
  products: '/products',
  productDetail: ':nameId',
  purchases: '/purchases',
  addToCart: '/add-to-cart',
  updatePurchase: '/update-purchase',
  buyProducts: '/buy-products',
  logout: '/logout',
  categories: '/categories'
} as const

export default pagePath
