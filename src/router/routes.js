import Home from 'app/src/pages/Home.vue'
import Product from 'app/src/pages/Product.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
]

export default routes
