<template>
  <div class="container">
    <section class="row">
      <div class="col-12 my-2">
        <h1>Cars</h1>
      </div>

      <div class="col-12">
        <!-- NOTE car form component, all logic pertaining to creating a car is handled there -->
        <CarForm />
      </div>
    </section>

    <section class="row">
      <div v-for="car in cars" :key="car.id" class="col-md-4 mb-3 car-card">
        <!-- STUB html abstracted to CarCard component -->
        <!-- <img :src="car.imgUrl" class="img-fluid" :alt="car.make + ' ' + car.model" role="button">
        <div class="car-title">
          <p class="fs-4 mb-1 ms-1">{{ car.make }} {{ car.model }}</p>
        </div> -->
        <!-- NOTE carProp is the name of our prop, car is the value being passed down for that prop -->
        <!-- Very similar to parameters and arguments, carProp is the parameter, car is the argument -->
        <CarCard :carProp="car" />
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js'
import { AppState } from '../AppState.js'
import CarCard from '../components/CarCard.vue';
import { logger } from '../utils/Logger.js';
import CarForm from '../components/CarForm.vue';
export default {
  setup() {

    // NOTE this function is called by the onMounted to retrieve data from API whenever this component is mounted into the view
    async function getCars() {
      try {
        await carsService.getCars();
      }
      catch (error) {
        Pop.error(error);
      }
    }

    // NOTE when the page loads!
    onMounted(() => {
      getCars();
    });

    return {
      // NOTE bring in cars from appstate with listeners attached
      cars: computed(() => AppState.cars),
    };
  },
  components: { CarCard, CarForm }
}
</script>


<style lang="scss" scoped>
.car-card {
  position: relative;
}
</style>