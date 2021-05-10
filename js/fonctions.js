//Timer page d'erreur 404

    setInterval(function() {
        var div = document.querySelector("#counter");
        var count = div.textContent * 1 - 1;
        div.textContent = count;
        if (count <= 0) {
            window.location.replace("../index.html");
        }
    }, 1000);

//Message ajouté au panier

function ajouterpanier() {
    const msg="PRODUIT(S) AJOUTÉ(S) AU PANIER";
    console.log(msg)
    alert(msg);
}


