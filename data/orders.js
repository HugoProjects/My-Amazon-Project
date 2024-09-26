export const orders = JSON.parse(localStorage.getItem('orders')) || []; //Se nao existir ordens na localStorage, entao cria o array vazio [] (Isto é um atalho)

export function addOrder(order) {
  
  orders.unshift(order); //Adiciona um elemento ao inicio do array (cabeça), em vez do push, que adiciona no fim

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}