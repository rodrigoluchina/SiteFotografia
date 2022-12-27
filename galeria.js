// Galeria

//galeriaImagens irá gerar um array contendo .galeria-img
let galeriaImagens = document.querySelectorAll(".galeria-img");
let ultimaImgAberta;
//pegar tamanho da tela , e inserir na variavel com a propriedade"innerWidth"
let windowWidth = window.innerWidth;

//Checar se a condição tem imagens ou não , retornará False se não tiver 
if(galeriaImagens) {
   //a palavra chave "imagem" é a refência para o primeiro item do array
   galeriaImagens.forEach(function(imagem ,index) {
      imagem.onclick = function() {
         let getElementCss = window.getComputedStyle(imagem,index);
         let getFullImgUrl = getElementCss.getPropertyValue("background-image");
         let getImgUrlPos = getFullImgUrl.split("/img/thumbs/");
         let setNewImgUrl = getImgUrlPos[1].replace('")','');
         
        
         ultimaImgAberta = index + 1;
         
         let container = document.body;
         let newImgWindow = document.createElement("div");
         container.appendChild(newImgWindow);
         newImgWindow.setAttribute("class","img-window");
         newImgWindow.setAttribute("onclick","closeImg()");

         
         let newImg = document.createElement("img");
         newImgWindow.appendChild(newImg);
         newImg.setAttribute("src", "img/" + setNewImgUrl);
         newImg.setAttribute("id", "current-img");


         newImg.onload = function() {
            let imgWidth = this.width;
            let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;
            
            //Botão Anterior
            let newPrevBtn = document.createElement("a");
            let btnPrevText = document.createTextNode("Prev");
            newPrevBtn.appendChild(btnPrevText);
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute("class","img-btn-prev");
            newPrevBtn.setAttribute("onclick","changeImg(0)");
            newPrevBtn.style.cssText ="left: " + calcImgToEdge + "px;";
            

            //Botão Proximo
            let newNextBtn = document.createElement("a");
            let btnNextText = document.createTextNode("Next");
            newNextBtn.appendChild(btnNextText);
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute("class","img-btn-next");
            newNextBtn.setAttribute("onclick","changeImg(1)");
            newNextBtn.style.cssText ="right: " + calcImgToEdge + "px;";
            
         }


      }
   });
}

function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
   document.querySelector("#current-img").remove();

   let getImgWindow = document.querySelector(".img-window");
   let newImg = document.createElement("img");
   getImgWindow.appendChild(newImg);

   let calcNewImg;
   if(changeDir == 1) {
      calcNewImg = ultimaImgAberta + 1;
      if (calcNewImg > galeriaImagens.length) {
         calcNewImg = 1;
      }
   }
   else if(changeDir === 0) {
      calcNewImg = ultimaImgAberta - 1;
      if(calcNewImg < 1) {
         calcNewImg = galeriaImagens.length;

      }
   }

   newImg.setAttribute("src","img/img" + calcNewImg + ".jpeg");
   newImg.setAttribute("id","current-img");

   ultimaImgAberta = calcNewImg;

   newImg.onload = function() {
      let imgWidth = this.width;
      let calcImgToEdge = ((windowWidth - imgWidth) / 2) -80;

      let nextBtn = document.querySelector(".img-btn-next");
      nextBtn.style.cssText = "right: " + calcImgToEdge  + "px";

      let prevBtn = document.querySelector(".img-btn-prev");
      prevBtn.style.cssText = "left: " + calcImgToEdge  + "px";

   }


   
}

//Filtro das Divs
const links = document.querySelector(".links");
const btns = document.querySelectorAll(".btn");
const divs = document.querySelectorAll(".filterDiv")

links.addEventListener("click",function(e) {
   const id = e.target.dataset.id;
   if(id) {
      //remover "active" dos outros botoes
      btns.forEach(function(btn) {
         btn.classList.remove("active");
         e.target.classList.add("active");
      });
      //Ocultar divs
      divs.forEach(function(div) {
         div.classList.remove("active")
      })
      //Mostrar as divs ativas
      const element = document.getElementById(id);
      element.classList.add("active");
   }
});