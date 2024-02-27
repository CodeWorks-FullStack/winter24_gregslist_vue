<template>
  <div class="container">
    <section class="row">
      <div class="col-12">
        <h1 class="my-3">Car Details</h1>
      </div>
    </section>

    <!-- NOTE car will be null on page load which will break application if we try to drill into it. v-if will not render this row and content within if car is falsy in AppState (null) -->
    <section v-if="car" class="row">
      <div class="col-12">
        <h2> {{ car.year }} {{ car.make }} {{ car.model }}</h2>
        <img :src="car.imgUrl" :alt="car.make + ' ' + car.model">
        <p>{{ car.description }}</p>
        <p>Listed by {{ car.creator.name }}</p>
        <div>
          <!-- NOTE only shows this button if the logged in user created the car -->
          <button v-if="car.creatorId == account.id" @click="destroyCar()" class="btn btn-danger">Delete Car</button>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js'
export default {
  setup() {

    // NOTE gives us information about the current route using the vue router
    const route = useRoute()

    // NOTE allows to change information about the current route
    const router = useRouter()

    async function getCarById() {
      try {
        // NOTE pulls carId parameter out of route params
        // NOTE if url looks like: 'http://localhost8080/#/cars/6463c9ecafbe13b729b64ae7', carId value will be '6463c9ecafbe13b729b64ae7'
        // NOTE only works if you have a route parameter set up in vue router (cars/:carId)
        const carId = route.params.carId
        await carsService.getCarById(carId)
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      // logger.log('Mounted car details page!');
      // logger.log('Route information', route)
      // logger.log('Id from route', route.params.carId)
      // NOTE gets rid of old data in appstate
      carsService.clearAppState()
      getCarById()
    })

    return {
      car: computed(() => AppState.activeCar),
      account: computed(() => AppState.account),

      async destroyCar() {
        try {
          const wantsToDelete = await Pop.confirm('Are you sure you want to delete this car?')

          if (!wantsToDelete) {
            return
          }

          const carId = route.params.carId

          logger.log('deleting car', carId)

          await carsService.destroyCar(carId)

          Pop.success('Car was deleted!')

          // NOTE navigates user to CarsPage after successful delete request
          router.push({ name: 'Cars' })
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  max-height: 40vh;
}
</style>