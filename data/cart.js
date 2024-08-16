export const cart = [];

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
      quantity: quantidadeSelect //se for nomes diferentes tem de se colocar
    });
  }
}
