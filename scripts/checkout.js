import {cart, addToCart, removeFromCart, updateCartQuantity, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import moneyConverter from './utils/money.js'; //Usei um export default portanto nao precisa das {}
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //Importar Biblioteca externa //Não precisa dos {} porque a library só exporta uma função como default (export default dayjs)
import {deliveryOptions} from '../data/deliveryOptions.js';

//Colocar todo o código dentro de uma função para chamar a função sempre que quiser dar update/refresh na página, basicamente, volto a desenhar tudo novamente mas com os novos dados (depois de os mudar e guardar), a página é desenhada novamente com os novos dados, em vez de mudar elemento a elemento
function renderOrderSummary(){
  let cartHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.id;

    let matchingProduct;

    products.forEach((product) => {
      if(product.id === productId) {
        matchingProduct = product;
      }
    });

    //Associar a data de entrega (que é mostrada no resumo do carrinho) com a opção de entrega escolhida no menu das opçoes de entrega
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    
    //Gerar o HTML para apresentar o resumo do carrinho
    cartHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>

      </div>
    </div>`;
  });

  document.querySelector('.js-order-summary').innerHTML = cartHTML;

  onTopCartQuantity(); //Calcular e mostrar a quantidade de items no topo da pagina

  //Adicionar EventListeners aos botoes Delete para remover produto do carrinho
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.remove();

      onTopCartQuantity();
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

  //Adicionar EventListeners ao botao ENTER para dar Save e guardar novas quantidades de produtos no carrinho
  document.querySelectorAll('.js-quantity-enter').forEach((input) => {
    input.addEventListener('keypress', (event) => {
      const productId = input.dataset.productId;

      if(event.key === "Enter") {
        saveNewQuantity(productId);
      }
    })
  });

  //Adicionar EventListeners aos botões INPUT para selecionar a delivery option
  document.querySelectorAll('.js-delivery-option').forEach((inputElement) => {
    inputElement.addEventListener('click', () => {
      
      //const productId = inputElement.dataset.productId;
      //const deliveryOptionId = inputElement.dataset.deliveryOptionId;
      //Em baixo fica o atalho para criar as duas variaveis de cima
      const {productId, deliveryOptionId} = inputElement.dataset;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); //Volta a desenhar a página inteira com os novos dados (podia ter feito isto para atualizar todas as mudanças no HTML, em vez de mudar elemento a elemento, desenha-se tudo mas com os novos dados)

    })
  })

  // ----- FUNCTIONS ----- \\

  //Gerar o HTML das 3 opções de Delivery
  function deliveryOptionsHTML(matchingProduct, cartItem){

    let deliveryOptionsHTML = '';

    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = option.priceCents === 0 ? 'FREE' : `$${moneyConverter(option.priceCents)}`;

      const isChecked = option.id === cartItem.deliveryOptionId; //Guarda true or false conforme a opção delivery de cada item no carrinho
      
      deliveryOptionsHTML += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${option.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
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

  //Função para guardar a quantidade de um produto (escolhida/alterada no checkout)
  function saveNewQuantity(productId){
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

    updateCartQuantity(productId, newQuantity); //Atualizar a quantidade no carrinho

    //Se selecionar quantidade 0, fazer desaparecer o item do carro, outra quantidade simplesmente atualiza
    if(newQuantity === 0){
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    } else {
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    }
    onTopCartQuantity();
  }

  //Função para calcular a quantidade do carrinho e mostrar em cima no checkout o total de items
  function onTopCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;  
    });

  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  }

}
renderOrderSummary();