import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  // NOTE adds an additional route that can be accessed by the browser
  {
    path: '/cars', // what the url will look like, ex: 'http://localhost8080/#/cars'
    name: 'Cars', // name for our route, used with router-links, useRoute, and useRouter
    component: loadPage('CarsPage') // which .vue page file to load out of the pages folder when the url matches the path in this object
  },
  {
    // NOTE the :carId allows us to set up a route parameter, so a variable can be put into the url and accessed. 
    path: '/cars/:carId', // ex: 'http://localhost8080/#/cars/6463c9ecafbe13b729b64ae7' will load the carDetails page, and we can target the id from the route parameters for a network request
    name: 'CarDetails',
    component: loadPage('CarDetailsPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
