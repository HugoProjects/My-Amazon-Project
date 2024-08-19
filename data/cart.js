import {deliveryOptions} from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

/*Carrinho de compras (Modelo)
cart[
  {
    id: 'qwr135adqwr'
    quantity: 2
    deliveryOption: 1
  }
]*/

if (!cart) {
  cart = [];
}

//Adicionei 2 items ao carrinho para testar o checkout sempre com items presentes
export function addToCart(productId){
  let matchingItem;

  //Verificar se o item adicionado já existe no carrinho
  cart.forEach((item) => {
    if (item.id === productId) {
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
      id: productId, //quando tem o mesmo nome pode omitir-se a definição, ficando apenas productId
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
    if (cartItem.id !== productId){
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
    if (cartItem.id === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveCartToStorage();
}