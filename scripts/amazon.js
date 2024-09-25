import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts, loadProductsFetch} from '../data/products.js'
import {moneyConverter} from './utils/money.js';

//loadProducts(renderProductsGrid); //Usar callbacks

/*Usar Promises
loadProductsFetch().then(() => {
  renderProductsGrid();
});
*/

loadPage();

//Usar Promises mas com async e await
async function loadPage(){
  await loadProductsFetch();
  renderProductsGrid();
}

function renderProductsGrid(){

  let productsHTML = '';

  products.forEach((product) => {

    productsHTML += `
            <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${moneyConverter(product.priceCents)}
            </div>

            <div class="product-quantity-container">
              <select class="js-select-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`
  });

  //Apresentar o código gerado na página (na div criada para o efeito)
  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  //Adicionar EventListener a todos os botoes criados
  const addToCartButtons = document.querySelectorAll('.js-add-to-cart-button');

  /*Maneira que eu fiz inicialmente
  addToCartButtons.forEach((addButton,i) => {
    addButton.addEventListener('click', () => {
      //console.log(`${products[i].name} $${(products[i].priceCents / 100)}`);

      let matchingItem;

      cart.forEach((item) => {
        if (item.productId === products[i].id) {
          matchingItem = item;
        }
      });

      if(matchingItem) {
        matchingItem.quantity += 1;
      } else {
      cart.push({
        productId: products[i].id,
        quantity: 1
      });
      }
      console.log(cart);
    })
  });*/

  //Inicializar os timeOuts antes dos eventos dos butões
  const addedMessageTimeouts = []; //É um array (ou objeto) porque cada butao tem o seu timeout, podem ocorrer vários ao mesmo tempo

  //Maneira que foi feita no Tutorial (usou uma propriedade do HTML para guardar/passar dados no/pelo elemento)
  addToCartButtons.forEach((addButton) => {
    addButton.addEventListener('click', () => {
      
    //const productId = addButton.dataset.productId;
      const {productId} = addButton.dataset; //(como a variavel tem o mesmo nome do atributo pode-se usar o atalho)

      addToCart(productId);
      addCartQuantity(productId);
    })
  });

  //Função para atualizar o carrinho, 
  function addCartQuantity(productId) {

    //Mostrar a mensage de Added depois de adicionar ao carrinho
    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-to-cart-show');

    // Check if there's a previous timeout for this
    // product. If there is, we should stop it.
    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    //Se nao existir nenhum timeout previo, iniciamos agora um
    const timeOutId = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-to-cart-show');
    }, 2000);

    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    addedMessageTimeouts[productId] = timeOutId;
    
    showCartQuantity();
  }

  //Mostrar carrinho HTML //Esta função poderia ser modificada para ser partilhada pelos vários scripts (armazenando a mesma no cart.js e exportando)
  function showCartQuantity (){
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;  
    });
    if(cartQuantity === 0){
      document.querySelector('.js-cart-quantity').innerHTML = '';
    } else {
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }
  }

  showCartQuantity();
}