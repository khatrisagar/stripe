<template>
  <button @click="submit">Pay now!</button>
</template>

<script>
export default {
  components: {},

  data() {
    this.publishableKey = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY;

    return {
      clientScrete: "",
      loading: false,
      cartItem: [
        {
          price: 100,
          queanity: 1,
        },
      ],
      successURL: "/about",
      cancelURL: "/about",
    };
  },
  methods: {
    async submit() {
      try {
        const response = await fetch("http://localhost:9999/stripe-checkout", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: 20000 }),
        });
        const data = await response.json();
        console.log("ddddddd", data);
        // this.clientScrete = data.clintSecret;
        window.location = data.url;
      } catch (error) {
        console.log(error);
      }
    },
    tokenCreated(token) {
      console.log(token);
      // handle the token
      // send it to your server
    },
  },
};
</script>
