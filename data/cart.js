export let cart = JSON.parse(localStorage.getItem('cart'));

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
      quantity: quantidadeSelect //se for nomes diferentes tem de se colocar
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