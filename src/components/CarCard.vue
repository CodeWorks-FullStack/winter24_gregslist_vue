<template>
  <!-- NOTE our car details page has a required parameter that must be supplied in the router-link. We assgin that a value with the params object here -->
  <router-link :to="{ name: 'CarDetails', params: { carId: carProp.id } }">
    <img :src="carProp.imgUrl" class="img-fluid" :alt="carProp.make + ' ' + carProp.model" role="button">
    <div class="car-title">
      <p class="fs-4 mb-1 ms-1">{{ carProp.make }} {{ carProp.model }}</p>
    </div>
  </router-link>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Car } from '../models/Car.js';

export default {
  // NOTE props allow us to pass down data from a parent component (CarsPage) to this component
  props: {
    carProp: {
      type: Car, // type of data being passed down from parent
      required: true // throws an error in console if no prop is passed down from parent
    }
  },
  setup() {
    return {
      // NOTE nothing computed here, all data is passed down from props
    };
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 40vh;
  width: 40vh;
  border-radius: 16px;
  object-fit: cover;
  object-position: center;
  box-shadow: 2px 3px 10px black;
}


.car-title {
  position: absolute;
  bottom: 0;
  color: white;
  text-shadow: 1px 1px 3px black;
  font-weight: bold;
}
</style>