import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
// import '../data/backend-practice.js'; Corre este ficheiro/script automaticamente quando o ficheiro checkout.js corre
import { loadProducts } from '../data/products.js';

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
