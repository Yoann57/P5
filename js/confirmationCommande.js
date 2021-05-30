// recuperation de l'id de la commande dans le local storage
const responseId = localStorage.getItem("responseId");
console.log(`responseId : ${responseId}`);

//injection de l'id commande dans le html
const structureConfirmationCommande =  `
<h5>Votre commande est bien validée</h5>

<div class="recapCommande">
<p>Merci pour votre commande</p>
<p>Votre commande numéro: ${responseId} a bien été prise en compte</p>

</div>

`;
document.getElementById("container-recapitulatif-commande").innerHTML = structureConfirmationCommande;

//effacer local storage 
function enleverCleLocalStorage(key){
    localStorage.removeItem(key);
};
enleverCleLocalStorage("responseId");
enleverCleLocalStorage("produit");
