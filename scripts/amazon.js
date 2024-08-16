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
            $${(product.priceCents / 100).toFixed(2)}
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

          <div class="added-to-cart">
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

//Maneira que foi feita no Tutorial (usou uma propriedade do HTML para guardar/passar dados no/pelo elemento)
addToCartButtons.forEach((addButton) => {
  addButton.addEventListener('click', () => {
    
  //const productId = addButton.dataset.productId;
    const {productId} = addButton.dataset; //(como a variavel tem o mesmo nome do atributo pode-se usar o atalho)

    let matchingItem;

    //Verificar se o item adicionado já existe no carrinho
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    //Ir buscar a quantidade selecionada no botao respetivo de select
    const quantidadeSelect = Number(document.querySelector(`.js-select-quantity-${productId}`).value);

    //Se já existir o item, aumentar a sua quantidade, se não existir, adicionar o item novo ao carrinho
    if(matchingItem) {
      matchingItem.quantity += quantidadeSelect;
    } else {
      cart.push({
        productId: productId, //quando tem o mesmo nome pode omitir-se a definição, ficando apenas productId
        quantity: quantidadeSelect //se for nomes diferentes tem de se colocar
      });
    }

    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;  
    });
    
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    console.log(cartQuantity);
    console.log(cart);
  })
});