main();
function main() {
  getArticles();
}

// Récupérer les articles depuis l'API
function getArticles() {
  fetch(" http://localhost:3000/api/furniture ")
    .then(function (rep) {
      return rep.json();
    })
    .catch((error) => {
      let productsContainer = document.querySelector(".container");
      productsContainer.innerHTML =
      "Nous n'avons pas réussi à afficher la page";
      productsContainer.style.textAlign = "center";
      productsContainer.style.padding = "30px 0";
    })

    //  données de chaque produit (prix, nom,id,price) dans le DOM
    .then(function (resultatAPI) {
      const articles = resultatAPI;
      console.log(articles);
      for (let article in articles) {
        let productCard = document.createElement("div");
        document.querySelector(".produites-container").appendChild(productCard);
        productCard.classList.add("produit");

        let productLink = document.createElement("a");
        productCard.appendChild(productLink);
        productLink.href = `product.html?id=${resultatAPI[article]._id}`;
        productLink.classList.add("stretched-link");

        let productImgDiv = document.createElement("div");
        productLink.appendChild(productImgDiv);
        productImgDiv.classList.add("produit__img");

        let productImg = document.createElement("img");
        productImgDiv.appendChild(productImg);
        productImg.src = resultatAPI[article].imageUrl;

        let productInfosDiv = document.createElement("div");
        productLink.appendChild(productInfosDiv);
        productInfosDiv.classList.add("produites__infos");

        let productInfoTitle = document.createElement("div");
        productInfosDiv.appendChild(productInfoTitle);
        productInfoTitle.classList.add("produites__infos__title");
        productInfoTitle.innerHTML = resultatAPI[article].name;

        let productInfoPrice = document.createElement("div");
        productInfosDiv.appendChild(productInfoPrice);
        productInfoPrice.classList.add("produit__infos__price");

        // afficher en euros
        resultatAPI[article].price = resultatAPI[article].price / 100;
        productInfoPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(resultatAPI[article].price);
      }
    });
}