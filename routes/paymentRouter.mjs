import express from 'express'
import { paymenCheckout } from '../controllers/paymentController.mjs';

let routes = express.Router();

routes.post('/checkout',paymenCheckout);

export default routes