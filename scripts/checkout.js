import {cart, addToCart, removeFromCart, updateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import moneyConverter from './utils/money.js'; //Usei um export default portanto nao precisa das {}
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //Importar Biblioteca externa //Não precisa dos {} porque a library só exporta uma função como default (export default dayjs)
import {deliveryOptions} from '../data/deliveryOptions.js';

let cartHTML = '';

cart.forEach((cartItem) => {

  const productId = cartItem.id;

  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId) {
      matchingProduct = product;
    }
  });

  cartHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>
    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">
  
      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${moneyConverter(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${matchingProduct.id}>
            Update
          </span>
          <input class="quantity-input js-quantity-enter js-quantity-input-${productId}" data-product-id=${matchingProduct.id}>
          <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${matchingProduct.id}>Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
            Delete
          </span>
        </div>
      </div>
  
      <div class="delivery-options js-delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct)}
      </div>

    </div>
  </div>`;
});

document.querySelector('.js-order-summary').innerHTML = cartHTML;

calculateCartQuantity(); //Calcular e mostrar a quantidade de items no topo da pagina

//Gerar o HTML das 3 opções de Delivery
function deliveryOptionsHTML(matchingProduct){

  let deliveryOptionsHTML = '';

  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = option.priceCents === 0 ? 'FREE' : `$${moneyConverter(option.priceCents)}`;

    deliveryOptionsHTML += `
    <div class="delivery-option">
      <input type="radio" checked
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} - Shipping
        </div>
      </div>
    </div>
    `;
  });
  return deliveryOptionsHTML;
}

//Adicionar EventListeners aos botoes Delete para remover produto do carrinho
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    calculateCartQuantity();
  })
});

//Adicionar EventListeners aos botoes Update para atualizar produtos do carrinho
document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  })
});

//Adicionar EventListeners aos botoes Save para guardar novas quantidades de produtos no carrinho
document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    saveNewQuantity(productId);
  })
});

//Adicionar EventListeners ao boto ENTER para dar Save e guardar novas quantidades de produtos no carrinho
document.querySelectorAll('.js-quantity-enter').forEach((input) => {
  input.addEventListener('keypress', (event) => {
    const productId = input.dataset.productId;

    if(event.key === "Enter") {
      saveNewQuantity(productId);
    }
  })
});

function saveNewQuantity(productId){
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');
  
  const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

  updateCartQuantity(productId, newQuantity);

  //Se selecionar quantidade 0, fazer desaparecer o item do carro, outra quantidade simplesmente atualiza
  if(newQuantity === 0){
    removeFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  } else {
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
  }
  calculateCartQuantity();
}

//Função para calcular a quantidade do carrinho e mostrar em cima no checkout o total de items
function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;  
  });

document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}

