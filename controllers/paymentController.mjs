import Stripe from "stripe"
let stripe = Stripe('sk_test_51QVmyJGO9zJL4clfK58gcpU9wmCgbtWI2Po8Z0rYLP8N2Cu8l3VV9ozJMBkNevYfljvf8YOqGJBOvpgPuq3f4RGi00IFeOgWia')

export let paymenCheckout = async (req,res)=>{
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.products.map((product) => {
        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: product.name,
              //   description: product.description,
            },
            unit_amount: product.unit_amount * 100,
          },
          quantity: product.quantity,
        };
      }),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    res.json({
      success: true,
      session,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
}


// try {
    // Using directly provided data from req.body
  //   const session = await stripe.checkout.sessions.create({
  //     line_items: [
  //       {
  //         price_data: {
  //           currency: "USD",
  //           product_data: {
  //             name: req.body.name,
  //           },
  //           unit_amount: req.body.unit_amount * 100, // Stripe requires the price in cents
  //         },
  //         quantity: req.body.quantity,
  //       },
  //     ],
  //     mode: "payment",
  //     success_url: "http://localhost:5173/success",
  //     cancel_url: "http://localhost:5173/cancel",
  //   });

  //   res.json({
  //     success: true,
  //     session,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }