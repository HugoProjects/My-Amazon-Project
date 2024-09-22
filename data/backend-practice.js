const xhr = new XMLHttpRequest();

//Primeiro criamos o eventListener para estar pronto a receber a resposta quando o pedido for enviado
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev'); //Setup do Request

xhr.send(); //Enviar pedido ao servidor

