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
//Déclaration de la variable "produitLocalStorage" dans laquelle on met les keys et les values qui sont dans le local storage
//JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet Javascript
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitLocalStorage);
//***** INDEX *****//
//Récuperation des données de l'index
const getCameras = () => {
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
        balisePrice.textContent = d.price / 100 + " €";

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

        if (!reponse.ok) {
            window.location.replace("Page_erreur404.html");
        }
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
        balisePrix.textContent = "Prix : " + dataCamera.price / 100 + " €";

        //***** GESTION DU PANIER *****//

        //Récupération des données:
        //quantité choisi
        let quantity = document.querySelector("#quantité")

        //Séléction du bouton Ajouter  au panier
        const btnPanier = document.querySelector("#button");
        console.log(btnPanier);

        //Ecouter le bouton et envoyer le panier
        btnPanier.addEventListener("click", (event) => {
            window.location = '/html/Panier.html'
            event.preventDefault();

            //Récupération des valeurs du formulaire
            let optionsProduit = {
                name: dataCamera.name,
                idproduit: dataCamera._id,
                option: baliseSelect.value,
                quantité: quantity.value,
                prix: dataCamera.price
            }
            console.log(optionsProduit);

            //***** LOCAL STORAGE *****//

            //S'il n'y a pas de produits enregistré dans le local storage,crée un tableau
            if (!produitLocalStorage) {
                produitLocalStorage = [];
            }
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.log(produitLocalStorage);
        });
        console.log(dataCamera)
    }).catch((error) => {
        alert("problème réseau")
        console.log(error)
    })
}

// Affichage des produits du panier
const panierGauche = () => {
    document.getElementById("titrepanier");
    //si le panier est vide : afficher le panier est vide
    if (produitLocalStorage < 1) {
        const panierVide = document.getElementById("paniervide");
        panierVide.textContent += "Le panier est vide !";
    } else {
        //si le panier n'est pas vide afficher les produits du localstorage
        let produitHtml = ""
        produitLocalStorage.forEach((p) => {
            produitHtml += `<div id="nomarticle"><h4>Article :</h4>${p.name}
                  </div><div id="option"><h4>Objectif :</h4> ${p.option}
                  </div><div id="quantite"><h4>Quantité :<h4/> ${p.quantité}
                  </div><div id="prixarticle"><h4>Prix :</h4> ${p.prix/100+" €"}</div>
                  <input id="btnsuppr" type="button" value="Supprimer" onclick="supprimerProduit()">`
        })
        document.getElementById("lignecommande").innerHTML = produitHtml;
    }
}
var calculPrix = () => {
    //Calcule de l'addition total
    let totalPrix = 0;
    produitLocalStorage.forEach((p) => {
        //le prix total = le prix x la quantité + le produit x la quantité de chaque produit suivant
        totalPrix += p.prix * p.quantité;
    });
    //Affichage du prix total à payer dans l'addition
    console.log(totalPrix);
    document.getElementById("prixtotal").textContent = totalPrix / 100 + " €";
}
//*** Supprimer un produit du panier ***//
supprimerProduit = (i) => {

    //enleve le produit du local storage 
    produitLocalStorage.splice(i, 1);

    // met à jour le localStorage avec le nouveau panier
    localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

    //relance la création de l'addition
    window.location.reload();
};
//***** FORMULAIRE *****//

const addClickFormListener = () => {
    //selection du bouton d'envoi du formulaire
    const btnForm = document.getElementById("btncomdiv");

    btnForm.addEventListener("click", validForm)
    
}
const validForm = (event) => {
    event.preventDefault();

    //vérifie les inputs du formulaire

    //Controle Regex
    let regexNombre = /[0-9]/;
    let regexMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let regexSpecial = /[§!@#$%^&*(),.?":{}|<>]/;

    //Récupération des entrées
    let formNom = document.getElementById("nom").value;
    let formPrenom = document.getElementById("prenom").value;
    let formMail = document.getElementById("mail").value;
    let formAdresse = document.getElementById("adresse").value;
    let formVille = document.getElementById("ville").value;

    //message erreur
    let messagErreur = "";

    //Test du nom 
    if (regexNombre.test(formNom) == true || regexSpecial.test(formNom) == true || formNom == "") {
        messagErreur = "Nom incorrect";
    } else {
        console.log("Nom ok");
    };
    //Test du prénom 
    if (regexNombre.test(formPrenom) == true || regexSpecial.test(formPrenom) == true || formPrenom == "") {
        messagErreur = "Prénom incorrect";
    } else {
        console.log("Prénom ok");
    };
    //Test de l'adresse mail
    if (regexMail.test(formMail) == false) {
        messagErreur = "Email incorrect";
    } else {
        console.log("Adresse mail ok");
    };
    //Test de l'adresse 
    if (regexSpecial.test(formAdresse) == true || formAdresse == "") {
        messagErreur = "Adresse incorrect";
    } else {
        console.log("Adresse ok");
    };
    //Test de la ville 
    if (regexNombre.test(formVille) == true || regexSpecial.test(formVille) == true || formVille == "") {
        messagErreur = "Ville incorrect"
    } else {
        console.log("Ville ok")
    };
    //Si une entrée est incorect, message d'alert avec la raison
    if (messagErreur != "") {
        alert("Verifier : " + messagErreur);
    }
    //verifie si le panier contient au moins un produit
    let valeurPanier = JSON.parse(localStorage.getItem("produit"));
    if (valeurPanier.length < 1) {
        console.log("le localStorage ne contient pas de panier")
        alert("Votre panier est vide");
    }
    //Si tout est ok création de l'objet contact
    else {
        contact = {
            firstName: formNom,
            lastName: formPrenom,
            address: formAdresse,
            city: formVille,
            email: formMail
        };
        const products = produitLocalStorage.map((produit) => produit.idproduit);
        const aEnvoyer = {
            contact,
            products: products
        };
        envoiServeur(aEnvoyer);
        return contact;
    };
}

function envoiServeur(aEnvoyer) {
    //Envoi du formulaire
    const promise = fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(aEnvoyer),
    });
    //Resultat serveur dans la console
    promise.then(async (response) => {
        //si la promesse est rejeté
        try {
            const contenu = await response.json();
            console.log("contenu de response");
            console.log(contenu);

            if (response.ok) {
                console.log("resultat de response.ok");
                //recuperation de l'id de la reponse du serveur
                console.log("id de response");
                console.log(contenu.orderId);
                //mettre l'id dans le local storage
                localStorage.setItem("responseId", contenu.orderId);
                //aller vers la page de confimation de commande
                window.location = "confirmation-commande.html";

            } else {
                alert("probleme avec le serveur")
            };
        } catch (e) {
            console.log("erreur qui vient du catch");
            console.log(e);
        }
    });
}
const validCommande = () => {
    // recuperation de l'id de la commande dans le local storage
    const responseId = localStorage.getItem("responseId");
    console.log(`responseId : ${responseId}`);

    //injection de l'id commande dans le html
    document.getElementById("idcommande").innerHTML = responseId;

    //effacer local storage 
    function enleverCleLocalStorage(key) {
        localStorage.removeItem(key);
    };
    enleverCleLocalStorage("responseId");
    enleverCleLocalStorage("produit");
}
module.exports = {validForm,validCommande}