//Timer page d'erreur 404
    const timer404 = () => {
    setInterval(function () {
        var div = document.querySelector("#counter");
        var count = div.textContent * 1 - 1;
        div.textContent = count;
        if (count <= 0) {
            window.location.replace("../index.html");
        }
    }, 1000);
}

//***** INDEX *****//
//Récuperation des données de l'index
const getCameras = () =>{
fetch('http://localhost:3000/api/cameras').then((reponse) => {
    return reponse.json()
}).then((dataCamera) => {
    console.log(dataCamera)
    dataCamera.forEach(d => creerCartePhoto(d))
}).catch((error) => {
    console.log(error)
})
//Creation de la carte
function creerCartePhoto(d) {
    var carte = document.createElement("div");
    carte.classList.add('carte');

    //Création de l'image    
    var baliseImage = document.createElement("img");
    baliseImage.setAttribute("src", d.imageUrl);
    baliseImage.classList.add('image');

    //Création du nom
    var baliseName = document.createElement("name");
    baliseName.innerHTML = d.name;
    baliseName.classList.add('carte-strong');

    //Création du prix
    var balisePrice = document.createElement("price");
    balisePrice.innerHTML = d.price;
    balisePrice.classList.add("carte-p");
    balisePrice.textContent = d.price/100 +" €";

    //Ajout du boutton
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Voir le produit");
    btn.appendChild(t);
    btn.classList.add("voirprod");
    btn.onclick = function () {
    window.location = '/html/produits.html?id=' + d._id
    };

    //Ajout de la carte et des éléments au DOM
    carte.appendChild(baliseImage)
    carte.appendChild(baliseName)
    carte.appendChild(balisePrice)
    carte.appendChild(btn)
    document.getElementById("cameras").appendChild(carte);
}
}
//Récuperation de l'ID produit
const getCamerasById = () => {
var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
console.log(id);

//***** PRODUITS *****//
//Récuperation Produits par l'ID
fetch(`http://localhost:3000/api/cameras/${id}`).then((reponse) => {
    return reponse.json()

}).then((dataCamera) => {

    //Récuperation de l'image 
    let baliseImage = document.getElementsByClassName("imageproduit")[0];
    baliseImage.setAttribute("src", dataCamera.imageUrl);

    //  Récuperation du nom
    let baliseName = document.getElementsByTagName("h2")[0];
    baliseName.innerHTML = dataCamera.name;

    //  Récuperation description
    let baliseDescription = document.getElementById("description");
    baliseDescription.innerHTML = dataCamera.description;

    // Récuperation des objectifs (concatenation +l+)
    let baliseSelect = document.getElementById("objectif-select");
    baliseSelect.innerHTML = dataCamera.lenses.map(l => {
        return '<option>' + l + '</option>'
    })
    console.log(baliseSelect.innerHTML);

    // Récuperation du prix
    let balisePrix = document.getElementById("prix");
    balisePrix.innerHTML = dataCamera.price;
    balisePrix.textContent = dataCamera.price/100+" €";

//***** GESTION DU PANIER *****//

//Récupération des données:
//quantité choisi
let quantity = document.querySelector("#quantité")

//Séléction du bouton Ajouter  au panier
const btnPanier = document.querySelector("#button");
console.log(btnPanier);

//Ecouter le bouton et envoyer le panier
btnPanier.addEventListener("click", (event)=>{
    window.location = '/html/Panier.html'
    event.preventDefault();

//Récupération des valeurs du formulaire
let optionsProduit = {
    name: dataCamera.name,
    idproduit: dataCamera._id,
    option: baliseSelect.value,
    quantité:quantity.value ,
    prix: dataCamera.price
}
console.log(optionsProduit);

//***** LOCAL STORAGE *****//

//Si il y a deja des produits enregistré dans le local storage
if(produitLocalStorage){
    produitLocalStorage.push(optionsProduit);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    console.log(produitLocalStorage);  
}
//si il n'y a pas de produit enregistré dans le locale storage
else{
    produitLocalStorage = [];
    produitLocalStorage.push(optionsProduit);
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
    console.log(produitLocalStorage); 
}
});
    console.log(dataCamera)
}).catch((error) => {
        window.location.replace("Page_erreur404.html");
    console.log(error)
})
}
//Déclaration de la variable "produitLocalStorage" dans laquelle on met les keys et les values qui sont dans le local storage
//JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet Javascript
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitLocalStorage);

// Affichage des produits du panier
const panierGauche = () => {document.getElementById("titrepanier");

//si le panier est vide : afficher le panier est vide
if(produitLocalStorage < 1) {
    
    const panierVide = document.getElementById("paniervide");
   panierVide.textContent += "Le panier est vide !";
   
}
else{
    //si le panier n'est pas vide afficher les produits du localstorage
  let produitHtml= ""
  produitLocalStorage.forEach((p)=> {
   produitHtml+= `<div id="nomarticle"><h4>Article :</h4>${p.name}
                  </div><div id="option"><h4>Objectif :</h4> ${p.option}
                  </div><div id="quantite"><h4>Quantité :<h4/> ${p.quantité}
                  </div><div id="prixarticle"><h4>Prix :</h4> ${p.prix/100+" €"}</div>
                  <input id="btnsuppr" type="button" value="Supprimer" onclick="supprimerProduit()">`
  })
  document.getElementById("lignecommande").innerHTML=produitHtml;
}
}
var calculPrix = () =>{
//Calcule de l'addition total
let totalPrix = 0;
produitLocalStorage.forEach((p)=>{

//le prix total = le prix x la quantité + le produit x la quantité de chaque produit suivant
    totalPrix += p.prix*p.quantité; 
});
//Affichage du prix total à payer dans l'addition
console.log(totalPrix);
document.getElementById("prixtotal").textContent = totalPrix /100 +" €";
}
//*** Supprimer un produit du panier ***//
 supprimerProduit = (i) =>{
   
    //enleve le produit du local storage 
    produitLocalStorage.splice(i, 1); 
   
    // mettre à jour le localStorage avec le nouveau panier
    localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

    //relance la création de l'addition
    window.location.reload();
};
//***** FORMULAIRE *****//

//verification des données avant envoi
const veriform = () =>{
    // récupère le formulaire et le champ d'e-mail 
var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');

email.addEventListener("input", function (event) {
  // vérifie la validité du champ e-mail.
  if (email.validity.valid) {}
}, false);
form.addEventListener("submit", function (event) {
  // Chaque fois que l'utilisateur tente d'envoyer les données
  // on vérifie que le champ email est valide.
  if (!email.validity.valid) { 
    //  on empêche l'envoi des données du formulaire
    event.preventDefault();
  }
}, false);
}
