import {deliveryOptions} from "./deliveryOptions.js";

export let cart;

loadFromStorage(); //Carregar o carrinho da localStorage (ou criar carrinho caso nao haja um)

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  /*Carrinho de compras (Modelo)
  cart[
    {
      id: 'qwr135adqwr'
      quantity: 2
      deliveryOptionId: 1
    }
  ]*/
  
  if (!cart) {
    cart = [];
  }
}

//Adicionar item ao carrinho
export function addToCart(productId){
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
      quantity: quantidadeSelect, //se for nomes diferentes tem de se colocar
      deliveryOptionId: '1'
    });
  }
  saveCartToStorage();
}

//Remover produto do carrinho
export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveCartToStorage();
}

//Guardar o cart na local storage para nao perder o mesmo ao atualizar a pagina (as variaveis levam reset com o refresh das paginas)
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/*Mostrar carrinho HTML //Para ser usada esta função teria de alterar algumas coisas então preferi deixar copias da mesma nos varios scripts
export function showCartQuantity (){
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;  
  });
  if(cartQuantity === 0){
    document.querySelector('.js-cart-quantity').innerHTML = '';
  } else {
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
}*/

//Função para atualizar a quantidade no carrinho depois de editar as quantidades no checkout
export function updateCartQuantity(productId, newQuantity) {
  
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveCartToStorage();
}

//Função para atualizar a opção de entrega escolhido pelo utilizador
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  //Verificar se o item adicionado já existe no carrinho
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveCartToStorage();
}

//Função para calcular a quantidade total de items no cart
export function totalCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;  
  });
  return cartQuantity;
}

//Carregar o carrinho através do servidor de backend
export function loadCart(functionToRunAfterLoading) {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {

    console.log(xhr.response);

    functionToRunAfterLoading();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');

  xhr.send();
}

//O modo fetch usa promises sendo entao uma melhor pratica que o XMLHttpRequest com callbacks
export async function loadCartFetch(){
  const promise = fetch(
    'https://supersimplebackend.dev/cart'
  ).then((response) => {
    return response.text();
  }).then((cartData) => {
    //cart = cartData; //Este carro é fake, neste caso ia ficar vazio com uma mensagem de texto
    console.log(cartData);
  }).catch((error) => { //Se acontecer um erro durante o fetch
    console.log('Unexpected Error, try again later...');
    //Opcionar: pode usar-se o parametro error para obter mais informaçoes sobre o erro que aconteceu
  });
  return promise;
}