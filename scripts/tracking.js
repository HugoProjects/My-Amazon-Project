import { orders, getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { showCartQuantity, addToCart } from "../data/cart.js";
import { moneyConverter } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //Importar Biblioteca externa //Não precisa dos {} porque a library só exporta uma função como default (export default dayjs)


async function loadPage(){
  //try {

    await loadProductsFetch().
    then(() => {
      showCartQuantity();
      renderTracking();
    });
/*
  } catch (error) {
    console.log('Unexpected Error, try again later...');
  }*/
}



function renderTracking(){

  //const url = window.location.href; //Devolve o url inteiro: http://127.0.0.1:5500/tracking.html?orderId=ea3e62f0-fe6e-4c6d-9540-9dba5277b4b7&productId=15b6fc6f-327a-4ec4-896f-486349e85a3d

  const queryString = window.location.search; //Devolve a string depois do '?'
  console.log(queryString);

  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams);

  const orderId = urlParams.get('orderId'); //This will return the first value associated with the given search parameter
  const productId = urlParams.get('productId');
  console.log(orderId);
  console.log(productId);

  //Função (exportada) para saber qual o produto correto (para ter acesso aos dados do mesmo)
  const matchingProduct = getProduct(productId);
  console.log(matchingProduct);

  //Função (exportada) para saber qual a order correta (para ter acesso aos dados da mesma)
  const matchingOrder = getOrder(orderId);
  console.log(matchingOrder);

  //Guardar os detalhes do produto especifico dessa order
  let productDetails;
  matchingOrder.products.forEach((product) => {
    if(product.productId === matchingProduct.id){
      productDetails = product;
    }
  });

  const estimatedDeliveryTime = dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D');
  console.log(estimatedDeliveryTime);

  //Calcular o tracking progress: ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100
  const currentTime = dayjs().format('YYYY-MM-DD');
  console.log(`Current Time: ${currentTime}`);

  const orderTime = dayjs(matchingOrder.orderTime).format('YYYY-MM-DD');
  console.log(`Order Time: ${orderTime}`);

  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime).format('YYYY-MM-DD');
  console.log(`Delivery Time: ${deliveryTime}`);

  const calc1 = dayjs(currentTime).diff(dayjs(orderTime), 'd');
  console.log(calc1);

  const calc2 = dayjs(deliveryTime).diff(dayjs(orderTime), 'd');
  console.log(calc2);

  const trackingStatus = Math.round((calc1 / calc2) * 100);
  console.log(trackingStatus);

  //Order Status (text with green color) -> 0-49% = Preparing | 50-99% = Shipped | 100% = Delivered
  let status;

  if(trackingStatus < 50){
    status = 'preparing';
  }else if (trackingStatus < 100){
    status = 'shipped';
  } else {
    status = 'delivered';
  }
  console.log(status);

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      ${status === 'delivered' ? 'Arrived' : 'Arriving'} on ${estimatedDeliveryTime}
    </div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src=${matchingProduct.image}>

    <div class="progress-labels-container">
      <div class="progress-label ${status  === 'preparing' ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label ${status  === 'shipped' ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label ${status  === 'delivered' ? 'current-status' : ''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width:${trackingStatus}%;"></div>
    </div>
    `;

  document.querySelector('.order-tracking').innerHTML = trackingHTML;
}

//Correr a página
loadPage();