import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

async function loadPage(){
  try {

    await loadProductsFetch().
    then(() => {
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

    //Gerar o HTML para apresentar as ordens
    ordersHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${order.orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${order.totalCostCents}</div>
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

}

function orderDetails(order){

  let orderDetailsHTML = '';

  //Cada ordem tem um array de produtos
  order.products.forEach((product) => {

    console.log(product);
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
          Arriving on: ${product.estimatedDeliveryTime}
        </div>
        <div class="product-quantity">
          ${product.quantity}
        </div>
        <button class="buy-again-button button-primary">
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

loadPage();