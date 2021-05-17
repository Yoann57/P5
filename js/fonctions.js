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


//Message ajouté au panier

function ajouterpanier() {
    const msg = "PRODUIT(S) AJOUTÉ(S) AU PANIER";
    console.log(msg)
    alert(msg);
}
//Récuperation des données
fetch('http://localhost:3000/api/cameras').then((reponse) => {
    return reponse.json()
}).then((data) => {
    console.log(data)
    data.forEach(d => creerCartePhoto(d))
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
    balisePrice.textContent = d.price / 100 + ",00€";

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

//Récuperation de l'ID produit
var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
console.log(id);

//Récuperation Produits par l'ID
fetch(`http://localhost:3000/api/cameras/${id}`).then((reponse) => {
    return reponse.json()
}).then((data) => {

    //Récuperation de l'image 
    let baliseImage = document.getElementsByClassName("imageproduit")[0];
    baliseImage.setAttribute("src", data.imageUrl);

    //  Récuperation du nom
    let baliseName = document.getElementsByTagName("h2")[0];
    baliseName.innerHTML = data.name;

    //  Récuperation description
    let baliseDescription = document.getElementById("description");
    baliseDescription.innerHTML = data.description;

    // Récuperation des objectifs (concatenation +l+)
    let baliseSelect = document.getElementById("objectif-select");
    baliseSelect.innerHTML = data.lenses.map(l => {
        return '<option value="obj">' + l + '</option>'
    })
    console.log(baliseSelect.innerHTML);

    // Récuperation du prix
    let balisePrix = document.getElementById("prix");
    balisePrix.innerHTML = data.price;
    balisePrix.textContent = data.price / 100 + ",00€";

    console.log(data)
}).catch((error) => {
    console.log(error)
})