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
/*
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
*/

/*Usar callbacks (não é tao eficiente, é melhor pratica usar promises)
loadProducts(() => {

  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});*/


//Ainda melhor que usar promises, é usar async e await (que são atalhos das promises)
async function loadPage(){
  
  try{

    //throw 'exemplo de erro'; //Isto serve para criar um erro de proposito para o codigo saltar logo para o catch

    await loadProductsFetch(); //await so funciona com promises (esta funcao retorna uma promise)

    //Aqui passamos uma promise diretamente
    const value = await new Promise((resolve) => {
      loadCart(() => {
        resolve('Se quisermos passar algo pela variavel value');
      });
    });
  } catch (error) {
    console.log('Unexpected Error, try again later...');
  }
  
  renderOrderSummary();
  renderPaymentSummary();

  //return 'passar um valor pelo return'; //Opcional
}

/*Um exemplo se quisessemos executar ainda mais código depois de esperar pelo loadPage
loadPage().then((value) => {
  console.log('next step');
  console.log(value);
});*/

loadPage();