
//Déclaration de la variable "produitLocalStorage" dans laquelle on met les keys et les values qui sont dans le local storage

let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
//JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet Javascript
console.log(produitLocalStorage);

// Affichage des produits du panier
//Selection class panier vide
const panierGauche = document.getElementById("titrepanier");

//si le panier est vide : afficher le panier est vide
if(produitLocalStorage === null) {
    console.log("panier vide");
    const panierVide = `
    <div id = "paniervide">
        <div>Le panier est vide</div>
    </div>`
    ;
    panierGauche.innerHTML = panierVide;
}
else{
    //si le panier n'est pas vide afficher les produits du localstorage
  let produitHtml= ""
  produitLocalStorage.forEach((p)=> {
   produitHtml+= `<div id="nomarticle">${p.name}
                  </div><div id="option">${p.option}
                  </div><div id="quantite">${p.quantité}
                  </div><div id="prixarticle">${p.prix}</div><button id="btnsuppr">supprimer</button>  `
   
  })
  document.getElementById("lignecommande").innerHTML=produitHtml;
}
//Boutton supprimer article

