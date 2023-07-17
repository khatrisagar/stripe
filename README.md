# stripe

1. backend side based on the amount description and other details price will be calculated and based on that paymentIntent will be created
2. from payment intent client secret will be send as a response and on the frontend side api of the stripe will be called using a confirmCardPayment and othe payment method passed
3. here i passes a card as a payment menthod and the card object
4. based on 3d_secure2 a authentication of the card has been made with card service provider and the based on that auth payment wiil be created
