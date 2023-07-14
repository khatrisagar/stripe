<template>
  <div ref="cardDiv"></div>
  <input type="button" value="Order Now" @click="orderCustom" />
  <input type="button" value="Pay" @click="payAmount" />
  {{ clientScrete }}
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { ref } from "vue";
export default {
  setup() {
    let stripe;
    let card;
    const cardDiv = ref(null);
    const clientScrete = ref(null);
    (async () => {
      stripe = await loadStripe(
        `pk_test_51NTINKSGN8qgx3N346njGGYMWq1W6Ek7LIR1zpRSKMnMuJvjwSfbJEMOswXHy6wDGFWdFYw5V5DmpKGW8V3433og00yB8C4LEl`
      );
      const elements = stripe.elements("card");
      let style = {
        base: {
          border: "1px solid #D8D8D8",
          borderRadius: "4px",
          color: "#000",
        },

        invalid: {
          // All of the error styles go inside of here.
        },
      };

      card = elements.create("card", { style, hidePostalCode: true });

      card.mount(cardDiv.value);
    })();
    const orderCustom = async () => {
      try {
        // const result = await stripe.createToken(card);
        // const result = await stripe.createSource(card, {
        //   type: "card",
        //   currency: "inr",
        // });

        const response = await fetch("http://localhost:9999/custom-payment", {
          method: "post",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        clientScrete.value = data.client_secret;
      } catch (error) {
        console.log(error);
      }
    };

    const payAmount = async () => {
      const data = await stripe.confirmCardPayment(clientScrete.value, {
        payment_method: {
          card: card,
        },
      });
      console.log(data);
    };
    return {
      orderCustom,
      cardDiv,
      clientScrete,
      payAmount,
    };
  },
};
</script>
