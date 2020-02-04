import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { postCartPayment } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';

const StripeButton = ({ price, postCartPayment }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_VDVUHRqmElyMUwYUqFclQheZ';

  const onToken = token => {
    postCartPayment(priceForStripe, token);
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='eBuy Inc.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default connect(null, {postCartPayment})(StripeButton);