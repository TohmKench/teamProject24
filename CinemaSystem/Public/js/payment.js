$(document).ready(function() {
    // Stripe publishable key
    var stripe = Stripe('pk_test_51OzhFyDUeC3TT3wqiH828xSx3d9a99ON04Jc25Ez0Kox2eNaddyt7t31tdScRaDOIlqplQj73a2P7Z2N5yKu4fsD00ARDVhYJI');

    var elements = stripe.elements();

    var card = elements.create('card');

    card.mount('#card-element');

    $('#payment-form').submit(function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                $('#card-errors').text(result.error.message);
            } else {
                stripeTokenHandler(result.token);
            }
        });
    });
    function stripeTokenHandler(token) {
        console.log(token);
        window.location.href = "paymentConfirmation.html";
    }

});
