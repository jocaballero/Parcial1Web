const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let cart = [];

let cartIcon = document.querySelector("#cart");
let title = document.querySelector("#foodTitle");
const order = document.querySelector("#orderTable");
order.hidden = true;

fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    const burguers = responseJson[0].products;
    const tacos = responseJson[1].products;
    const salads = responseJson[2].products;
    const desserts = responseJson[3].products;
    const drinks = responseJson[4].products;

    showFood(burguers);

    const burg = document.querySelector("#burg");
    burg.onmouseover = () => (burg.style.cursor = "pointer");
    burg.onclick = () => {
      title.innerText = "Burguers";
      document.querySelector("#orderTable").hidden = true;
      showFood(burguers);
    };

    const tac = document.querySelector("#tac");
    tac.onmouseover = () => (tac.style.cursor = "pointer");
    tac.onclick = () => {
      title.innerText = "Tacos";
      document.querySelector("#orderTable").hidden = true;
      showFood(tacos);
    };

    const sal = document.querySelector("#sal");
    sal.onmouseover = () => (sal.style.cursor = "pointer");
    sal.onclick = () => {
      title.innerText = "Salads";
      document.querySelector("#orderTable").hidden = true;
      showFood(salads);
    };

    const des = document.querySelector("#des");
    des.onmouseover = () => (des.style.cursor = "pointer");
    des.onclick = () => {
      title.innerText = "Desserts";
      document.querySelector("#orderTable").hidden = true;
      showFood(desserts);
    };

    const dri = document.querySelector("#dri");
    dri.onmouseover = () => (dri.style.cursor = "pointer");
    dri.onclick = () => {
      title.innerText = "Drinks & Sides";
      document.querySelector("#orderTable").hidden = true;
      showFood(drinks);
    };

    cartIcon.onclick = () => {
      orderResume(cart);
    };
  });

function showFood(list) {
  const contents = document.querySelector("#foodList");
  contents.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    node = document.createElement("div");
    node.classList.add("card");
    node.innerHTML = `<img src="${list[i].image}" class="card-img-top mx-auto foodPhoto" alt="Burger Image.">
                      <div class="card-body">
                        <h5 id="elementName${i}" class="card-title text-center">${list[i].name}</h5>
                        <p class="card-text">${list[i].description}<br><strong id="elementPrice${i}" class="price">$${list[i].price}</strong></p>
                        <div class="text-center"><a onclick="addToCart(this, ${i})" class="btn btn-primary">Add to Cart</a></div>
                      </div>`;
    contents.appendChild(node);
  }
}

function addToCart(element, i) {
  const name = document.querySelector(`#elementName${i}`);
  const price = document.querySelector(`#elementPrice${i}`);
  let product = { name: name.innerText, price: price.innerText, quantity: 1 };

  let found = false;
  found = cart.some((element) => {
    if (element.name === name.innerHTML) {
      element.quantity += 1;
      return true;
    }
  });

  if (!found) {
    cart.push(product);
    let cartItems = document.querySelector("#cartItems");
    cartItems.innerHTML = cart.length + " items";
  }
}

function orderResume(cart) {
  title.innerText = "ORDER DETAIL";
  const contents = document.querySelector("#foodList");
  contents.innerHTML = "";
  order.hidden = false;
  let orderTable = document.querySelector("#orderTableBody");
  orderTable.innerHTML = "";
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let node = document.createElement("tr");
    node.id = `node${i}`;
    node.innerHTML = `<td>${i + 1}</td>
                      <td>${cart[i].quantity}</td>
                      <td>${cart[i].name}</td>
                      <td>${cart[i].price}</td>
                      <td>$${(cart[i].price.slice(1) * cart[i].quantity).toFixed(2)}</td>
                      <td><a id="add${i}" onclick="add(${i})" class="btn btn-primary">+</a> 
                      <a id="remove${i}" onclick="remove(${i})" class="btn btn-primary">-</a></td>`;
    orderTable.appendChild(node);
    total += parseFloat(cart[i].price.slice(1) * cart[i].quantity);
  }
  if (cart.length !== 0) {
    let parent = document.querySelector("#orderTable");
    if (document.querySelector("#totalOrder") === null) {
      let node = document.createElement("div");
      node.classList.add("row");
      node.id = "totalOrder";
      node.innerHTML = `<div class="align-left"><strong>Total: $${total.toFixed(2)}</strong></div>
                        <div class="align-right"><a onclick="cancelO()" class="cancel btn btn-primary">Cancel</a></div>
                        <div class="align-right"><a onclick="confirmO()" class="confirm btn btn-primary">Confirm</a></div>`;
      parent.appendChild(node);
    } else {
      document.querySelector("#totalOrder").innerHTML = "";
      let panel = document.querySelector("#totalOrder");
      panel.innerHTML = `<div class="align-left"><strong>Total: $${total.toFixed(2)}</strong></div>
                         <div class="align-right"><a onclick="cancelO()" class="cancel btn btn-primary">Cancel</a></div>
                         <div class="align-right"><a onclick="confirmO()" class="confirm btn btn-primary">Confirm</a></div>`;
    }
  } else {
    document.querySelector("#totalOrder").innerHTML = "";
  }
}

function add(i) {
  cart[i].quantity += 1;
  orderResume(cart);
}

function remove(i) {
  if (cart[i].quantity === 1) {
    const tr = document.getElementById(`node${i}`);
    tr.parentNode.removeChild(tr);
    cart.splice(i, i + 1);
    let cartItems = document.querySelector("#cartItems");
    if (cart.length === 0) {
      cartItems.innerHTML = "";
    } else {
      cartItems.innerHTML = cart.length + " items";
    }
  } else {
    cart[i].quantity -= 1;
  }
  orderResume(cart);
}

function cancelO() {
  if (confirm("Esta seguro?")) {
    cart.length = 0;
    orderResume(cart);
  }
}

function confirmO() {
  console.log(cart);
}
