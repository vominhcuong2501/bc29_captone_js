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
  data.forEach(function (product) {
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
                    <button id="giam" onclick = "giamSL(${product.id})"><i class="fas fa-angle-left"></i></button>
                    <input id="soLuong" style="width:20px" value = "${product.soLuong}" >
                    <button id="tang" onclick = "tangSL(${product.id})"><i class="fas fa-angle-right"></i></button>
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
                  <button id="btnAdd" class="btnAdd" onclick= "addCart(${product.id})">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
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
      var arrayLoai = result.data.map(function (product) {
        if (product.loai === value) {
          return product;
        }
      });
      var arrayKhac = arrayLoai.filter(function (productKhac) {
        return productKhac !== undefined;
      });
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
  getListLoai(dropdown.value);
}

/**
 * Câu 5: Cho phép người dùng chọn sản phẩm bỏ vào giỏ hàng
Gợi ý: - tạo một mảng giỏ hàng - cart (biến global), mảng cart sẽ chứa các đối tượng cartItem
 */

getEle("gioHang").onclick = function () {
  var footer = `
  <p class="text-right col-12">Totals:
    <span id="tongTien"></span>
  </p>
    <div>
      <button class="btn btn-primary" id="thanhToan">Purchase
        <i class="fas fa-credit-card"></i></button>
      <button class="btn btn-danger" id="clearCart">Clear cart
        <i class="fas fa-trash"></i></button>
    </div>`;
  getEle("footer").innerHTML = footer;
};


function addCart(id) {
  service
    .getCartApi(id)
    .then(function (result) {
      var cartItem = {
        id: result.data.id,
        ten: result.data.ten , 
        gia: result.data.gia,
        hinhAnh: result.data.hinhAnh,
        soLuong: result.data.soLuong,}
      cart.push(cartItem);
      
      renderCart(cart);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function renderCart(data) {
  var contentHTML = "";
  data.forEach(function (product) {
    contentHTML += `
    <div class="navbar__menu row">
      <div class = "col-3">
        <img class="image" src="./../../assets/images/${product.hinhAnh}" style= "width: 50%; margin-bottom: 10px" /></td>
      </div>
      <div id="ten" class = "col-3">${product.ten}</div>
      <div class = "col-3">
        <button id="giam" onclick = "giamSL(${product.id})"><i class="fas fa-angle-left"></i></button>
          <input id="soLuong" style="width:20px; border: none" value= "${product.soLuong}">
          <button id="tang" onclick = "tangSL(${product.id})"><i class="fas fa-angle-right"></i></button>
      </div>
      <div id="gia" class = "col-2">$${product.gia}</div>
      <div id="delete" class = "col-1">
          <button class = "btn"><i class="fas fa-trash"></i></button>
      </div>
    </div>`;
  });
  getEle("listProductCart").innerHTML = contentHTML;
}


// /**
//  * lưu dữ kiện trên trình duyệt
//  */ 
//  function setLocalStorage() {
//   // convert from JSON to String (chuyển công thức sang chuỗi)
//   var string = JSON.stringify(cart);
//   // lưu xuống localstorage
//   localStorage.setItem("GioHang", string);
// }

// function getLocalStorage() {
//   if(localStorage.getItem("GioHang")) {
//       var dataString = localStorage.getItem("GioHang");
//       // convert from string to JSON (chuyển chuỗi sang công thức)
//       var dataJSON = JSON.parse(dataString);
//       cart= dataJSON;
//       renderCart(cart);
//   }   
// }
