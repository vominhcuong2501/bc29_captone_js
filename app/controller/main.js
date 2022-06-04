var service = new Services();
var cart = [];


function getEle(id) {
  return document.getElementById(id);
}

/**
 * Câu 3: Hiển thị danh sách sản phẩm cho khách hàng. 
 */
 function getListProducts() {
  service
    .getListProductApi()
    .then(function (result) {
      renderListProduct(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProducts();

function renderListProduct(data) {
  var content = "";
  data.forEach(function(product) {
    content += `
    <div class="col-6 col-md-4 col-lg-3 ">
          <div class="product__item" id="iphone">
            <div class="d-flex logo justify-content-between">
              <p id="loai">${product.loai}</p>
            </div>
            <img class="image" src="./../../assets/images/${product.hinhAnh}" alt="" />
            <h5 class="mt-3 py-3">${product.ten}</h5>
            <div class="product__detail">
              <div class="product__intro">
                <p>Prize: <span>$${product.gia}</span> </p>
                <div>
                  <p>Số lượng:
                    <button id="giam" style="border:none; background-color: rgb(167, 167, 167);"><i class="fas fa-angle-left"></i></button>
                    <input id="soLuong" style="width:20px" placeholder="0" >
                    <button id="tang" style="border:none; background-color: rgb(167, 167, 167);"><i class="fas fa-angle-right"></i></button>
                  </p>
                </div>
              </div>
              <div class="d-flex justify-content-between my-3">
                <div class="cardPhone__rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>
                <div>
                  <button id="btnAdd" class="btnAdd">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>`
  });
  getEle("listProduct").innerHTML = content;
}

/**
 * Câu 4: Tạo một ô select cho phép người dùng filter theo loại sản phẩm, ô select có 2 option là samsung và iphone, viết hàm gắn vào sự kiện onChange của select
 */
 function getListLoai(value) {
  service
    .getListProductApi()
    .then(function (result) {
      var arrayLoai = result.data.map(function(product){
        if(product.loai === value) {
          return product;
        }
      })
      var arrayKhac = arrayLoai.filter(function(productKhac){
        return productKhac !== undefined;
      })
      renderListProduct(arrayKhac);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function chonThayDoi() {
  var theSpan = getEle("xuat");
  var dropdown = getEle("loaiDT");
  theSpan.innerHTML = dropdown.value;
  getListLoai(dropdown.value)
}

/**
 * Câu 5: Cho phép người dùng chọn sản phẩm bỏ vào giỏ hàng
Gợi ý: - tạo một mảng giỏ hàng - cart (biến global), mảng cart sẽ chứa các đối tượng cartItem
 */
getEle("gioHang").onclick = function() {
  getEle("products").style.display = "none";
}

function addCart(id) {
  service
  .getCartApi(id)
  .then(function (result) {
    cart.push(result.data);
    renderCart(cart);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function renderCart(data) {
  var soLuong = getEle("soLuong").value;
  console.log(soLuong);
   var contentHTML = "";
   data.forEach(function(product, index){
    contentHTML += `
     <tr>
          <td>${index + 1}</td>
          <td>
            <img class="image" src="./../../assets/images/${product.hinhAnh}" style= "width: 20%" /></td>
          <td>${product.ten}</td>
          <td>${product.loai}</td>
          <td>
            <div class="product__intro">
            <p>Số lượng: <input id="soLuong" type="number" min="0" max="1000" style="width:70px" placeholder="0"></p>
          </div>
          </td>
          <td>$${product.gia}</td>
     </tr>`
   });
   getEle("tblSP").innerHTML = contentHTML;
}