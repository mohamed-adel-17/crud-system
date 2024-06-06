var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productImage = document.getElementById("productImage");
var productDesc = document.getElementById("productDesc");
var resetBtn = document.getElementById("resetBtn");

resetBtn.onclick = resetForm;

var indexOfProuct;

var productList;

if (localStorage.getItem("products") !== null) {
  productList = JSON.parse(localStorage.getItem("products"));
  display();
} else {
  productList = [];
}

// add product

function addProduct() {
  var product = {
    productName: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
  };

  if (document.getElementById("addBtn").innerHTML === "Add Product") {
    productList.push(product);
  } else {
    productList.splice(indexOfProuct, 1, product);
    document.getElementById("addBtn").innerHTML = "Add Product";
  }

  localStorage.setItem("products", JSON.stringify(productList));
  display();
  resetForm();
}

// show products

function display() {
  var box = ``;
  for (var i = 0; i < productList.length; i++) {
    box += `
<div class="col-md-4 col-sm-6">
<div class="product border">
  <div class="product-details p-3">
    <p class="text-secondary border-bottom pb-2">${productList[i].productName}</p>
    <p><span class="fw-bold">Category</span><span class="text-secondary">${productList[i].category}</span></p>
    <p><span class="fw-bold">Price</span><span class="text-secondary">${productList[i].price}</span></p>
    <p class="text-secondary border-bottom pb-2">${productList[i].desc}</p>
    <div class="text-center">
    <button class="btn btn-outline-danger m-2 " onclick="deleteProduct(${i})" >Delete<i class="fa fa-trash"></i> </button>
    <button class="btn btn-outline-warning m-2" onclick="updateProduct(${i})" >Update<i class="fa fa-edit"></i> </button>
    </div>
  </div>
</div>
</div>
`;
  }
  document.getElementById("rowBody").innerHTML = box;
}

// deleteProduct

function deleteProduct(index) {
  productList.splice(index, 1);
  display();
  localStorage.setItem("products", JSON.stringify(productList));
}

// update product

function updateProduct(index) {
  indexOfProuct = index;
  productName.value = productList[index].productName;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDesc.value = productList[index].desc;
  document.getElementById("addBtn").innerHTML = "Update Product";
}

// clear form

function resetForm() {
  productName.value = "";
  productPrice.value = "";
  productDesc.value = "";
  productImage.value = "";
  productCategory.value = "";
}


