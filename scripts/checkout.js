import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
// import '../data/backend-practice.js'; Corre este ficheiro/script automaticamente quando o ficheiro checkout.js corre
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

//Esperar por várias promessas (uma de cada vez) para depois dar render
/*
new Promise((resolve)=> {
  loadProducts(() => {
    resolve();
  })

}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

//Esperar pelo conjunto de promessas (que serão executadas simultaneamente) para depois dar render
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});


/*Usar callbacks (é melhor pratica usar promises)
loadProducts(() => {

  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});*/
