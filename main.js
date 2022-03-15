const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    const burguers = responseJson[0].products;
    const tacos = responseJson[1].products;
    const salads = responseJson[2].products;
    const desserts = responseJson[3].products;
    const drinks = responseJson[4].products;
    console.log(responseJson);

    const contents = document.querySelector(".foodList");
    const burg = document.querySelector(".burg");
    burg.onclick = () => {
      nodePrincipal = document.createElement("div");
      nodePrincipal.classList.add("card-group");
      for (let i = 0; i < burguers.length; i++) {
        node = document.createElement("div");
        node.classList.add("card", "col-lg-2");
        node.style.width = "18rem";
        node.innerHTML = `<img src=${burguers[i].image} class="card-img-top" alt="...">
                          <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <a href="#" class="btn btn-primary">Go somewhere</a>
                          </div>`;
        nodePrincipal.append(node);
      }
      contents.appendChild(nodePrincipal);
    };
  });
