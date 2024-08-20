import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //Importar Biblioteca externa //Não precisa dos {} porque a library só exporta uma função como default (export default dayjs)


export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0]; //No caso de não ter nenhuma delivery option selecionada(caso dê algum erro), retornamos a delivery option default (a primeira do array)
}

export function calculateDeliveryDate(deliveryOption) {
  /*const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');*/

  //Ignorar os fins-de-semana para a contagem dos dias de entrega
  const today = dayjs();
  let diasRestantes = deliveryOption.deliveryDays;
  let deliveryDate;
  let contador = 0;

  while(diasRestantes>0) {

    let diaAtual = today.add(contador, 'days');
    let diaSemana = diaAtual.format('dddd');

    if(diaSemana !== 'Saturday' && diaSemana !== 'Sunday'){
      diasRestantes--;
    }
    deliveryDate = diaAtual.add(1, 'days');
    contador++;
  }
  
  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}

