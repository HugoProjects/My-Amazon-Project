export let cart = [
  {
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];
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
}