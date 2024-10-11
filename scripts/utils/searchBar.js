//Adicionar EventListener à search bar para pesquisar produtos
export function searchBarEventListener(){

  document.querySelector('.js-search-button').addEventListener('click', () => {
    let searchInput = document.querySelector('.js-search-bar').value;
    console.log(searchInput);

    //Confirmar se realmente o utilizador escreveu algo na pesquisa
    if(searchInput){
      searchInput = searchInput.trim(); //Trim remove os espaços antes e depois da string (antes do primeiro caracter e depois do ultimo)
      console.log(searchInput);
  
      searchInput = searchInput.replace(/\s+/g, " "); //Esta Regular Expression (RegExp) remove espaços extra (mais do que um espaço seguido)
      console.log(searchInput);
  
      //searchInput = searchInput.replace(/^\s+|\s+$/g, ""); //Esta linha supostamente faria as duas anteriores mas não esta a funcionar corretamente (This line removes all extra white-space (more than one) between words and at the beginning (^) and end ($). The g at the end of the RegExp means: global, ie match and replace all occurences.)
      
      searchInput = searchInput.toLowerCase(); //transformar tudo em letras minusculas para ficar case insensitive
      console.log(searchInput);

      searchInput = searchInput.replaceAll(' ', '+'); //Trocar os espaços por + para passar pelo URL para evitar erros (depois volta a trocar-se para ter a string normal)
      console.log(searchInput);
  
      //Confirmar novamente (depois de remover os espaços extra) se realmente o utilizador escreveu algo na pesquisa
      if(searchInput){
        window.location.href = `amazon.html?search=${searchInput}`;
      }
    }
  });

  //Adicionar EventListener ao botao ENTER
  document.querySelector('.js-search-bar').addEventListener('keypress', (event) => {
    
    if(event.key === "Enter") {
      let searchInput = document.querySelector('.js-search-bar').value;
      console.log(searchInput);

      //Confirmar se realmente o utilizador escreveu algo na pesquisa
      if(searchInput){
        searchInput = searchInput.trim(); //Trim remove os espaços antes e depois da string (antes do primeiro caracter e depois do ultimo)
        console.log(searchInput);
    
        searchInput = searchInput.replace(/\s+/g, " "); //Esta Regular Expression (RegExp) remove espaços extra (mais do que um espaço seguido)
        console.log(searchInput);
    
        //searchInput = searchInput.replace(/^\s+|\s+$/g, ""); //Esta linha supostamente faria as duas anteriores mas não esta a funcionar corretamente (This line removes all extra white-space (more than one) between words and at the beginning (^) and end ($). The g at the end of the RegExp means: global, ie match and replace all occurences.)
        
        searchInput = searchInput.toLowerCase(); //transformar tudo em letras minusculas para ficar case insensitive
        console.log(searchInput);

        searchInput = searchInput.replaceAll(' ', '+'); //Trocar os espaços por + para passar pelo URL para evitar erros (depois volta a trocar-se para ter a string normal)
        console.log(searchInput);
    
        //Confirmar novamente (depois de remover os espaços extra) se realmente o utilizador escreveu algo na pesquisa
        if(searchInput){
          window.location.href = `amazon.html?search=${searchInput}`;
        }
      }
    }
  });
}