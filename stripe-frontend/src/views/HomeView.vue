<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <stripePayment></stripePayment>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import stripePayment from "@/components/stripePayment.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    stripePayment,
  },
};
</script>
