import { totalCartQuantity } from "../../data/cart.js";

//Função para mostrar em cima no checkout o total de items
export function renderCheckoutHeader() {

  const cartQuantity = totalCartQuantity();

  //Se o carro tiver vazio não coloca nada no header
  cartQuantity === 0 ? 
  document.querySelector('.js-return-to-home-link').innerHTML = ''
  :
  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}

