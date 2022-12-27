// A função SLICE extrai uma parte da string sem mudar a string original,o numero 1 significa que começa pelo index 1

// Data 
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

//Alocação dinâmica dos links 
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click",function(){
   const containerHeight = linksContainer.getBoundingClientRect().height;
   const linksHeight = links.getBoundingClientRect().height;

if(containerHeight === 0 ){
   linksContainer.style.height = `${linksHeight}px`;
} else {
   linksContainer.style.height = 0;
}
});

//NavBar fixa
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll",function(){
   const scrollHeight = window.pageYOffset;
   const navHeight = navbar.getBoundingClientRect().height;
   if(scrollHeight > navHeight){
      navbar.classList.add("fixed-nav");
   }
   else{
      navbar.classList.remove("fixed-nav");
   }
   if(scrollHeight > 500){
      topLink.classList.add("show-link");
   }
   else {
      topLink.classList.remove("show-link");
   }
});

//Scroll suave
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
   link.addEventListener("click",(e) => {
      e.preventDefault();
      //Navegar pra um lugar especifico
      const id = e.currentTarget.getAttribute("href").slice(1);
      const element = document.getElementById(id);
      // calcular os heights
      const navHeight = navbar.getBoundingClientRect().height;
      const containerHeight = linksContainer.getBoundingClientRect().height;
      const fixedNav = navbar.classList.contains("fixed-nav");
      //Calcular a posição do navbar para funcionar no ligar correto
      let position = element.offsetTop - navHeight;
      
      if(!fixedNav) {
         position = position - navHeight;
      }
      //82 não importa na tela grande,este valor é setado para tela pequena
      if(navHeight > 82) {
         position = position + containerHeight;
      }
      window.scrollTo({
         left: 0,
         top: position,
      });
      linksContainer.style.height = 0;
   });
});




