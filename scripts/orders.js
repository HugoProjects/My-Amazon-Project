import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { showCartQuantity, addToCart } from "../data/cart.js";
import { moneyConverter } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //Importar Biblioteca externa //Não precisa dos {} porque a library só exporta uma função como default (export default dayjs)

async function loadPage(){
  try {

    await loadProductsFetch().
    then(() => {
      showCartQuantity();
      renderOrders();
    });

  } catch (error) {
    console.log('Unexpected Error, try again later...');
  }
}

function renderOrders(){

  let ordersHTML = '';

  orders.forEach((order) => {

    console.log(order);

    const orderDateTime = dayjs(order.orderTime).format('dddd, MMMM D');

    //Gerar o HTML para apresentar as ordens
    ordersHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDateTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${moneyConverter(order.totalCostCents)}$</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid js-order-details">
      ${orderDetails(order)}
      </div>
    </div>`;
  });

  document.querySelector('.js-orders-grid-summary').innerHTML = ordersHTML;

  //Adicionar EventListener a todos os botoes "Buy again" criados
  const buyAgainButtons = document.querySelectorAll('.js-buy-again');

  buyAgainButtons.forEach((buyButton) => {
    buyButton.addEventListener('click', () => {

      const productId = buyButton.dataset.productId;
      addToCart(productId);
      showCartQuantity();
    });
  });
}

function orderDetails(order){

  let orderDetailsHTML = '';

  //Cada ordem tem um array de produtos
  order.products.forEach((product) => {

    console.log(product);

    const estimatedDeliveryTime = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');

    const productId = product.productId;

    //Função (exportada) para saber qual o produto correto (para ter acesso aos dados do mesmo)
    const matchingProduct = getProduct(productId);
    console.log(matchingProduct);

    orderDetailsHTML += `
      <div class="product-image-container">
          <img src=${matchingProduct.image}>
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${estimatedDeliveryTime}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again" data-product-id="${matchingProduct.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });
  return orderDetailsHTML;
}



//Carregar a página
loadPage();