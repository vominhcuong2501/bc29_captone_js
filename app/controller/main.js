var api = new Services();
var dssp = new ProductList();
var arrProduct = dssp.arrList;
var cart = [];

function getEle(id) {
  return document.getElementById(id);
}

function getArrProduct (data) {
  data.forEach(function(product) {
      var id = product.id;
      var loai = product.loai;
      var hinhAnh = product.hinhAnh;
      var ten = product.ten;
      var gia = product.gia;
      var soLuong = product.soLuong;
      var product = new Product(id, loai, hinhAnh, ten, gia, soLuong);
      dssp.addProduct(product);
  })
}

/**
 * Câu 3: Hiển thị danh sách sản phẩm cho khách hàng.
 */
function getListProducts() {
  api
    .getListProductApi()
    .then(function (result) {
      renderListProduct(result.data);
      getArrProduct(result.data);
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

function getListLoai()  {
  var loaiSelect = getEle("loaiDT").value;
  var fillerProduct= arrProduct.filter(function(product) {
      if (product.loai !== loaiSelect) {
          return false;
      }
      return true;
  })
  if (fillerProduct.length == 0) {
    renderListProduct(arrProduct);
  } else {
    renderListProduct(fillerProduct);
  }
}

/**
 * Câu 5: Cho phép người dùng chọn sản phẩm bỏ vào giỏ hàng
Gợi ý: - tạo một mảng giỏ hàng - cart (biến global), mảng cart sẽ chứa các đối tượng cartItem
 */
function addCart(product) {
  for( var i = 0; i < cart.length; i++) {
    if(item !== cart[i]) {
      cart[i].soLuong += 1;
      break;
    }
  }
    var id = arrProduct[product - 1 ].id ; 
    var loai = arrProduct[product - 1].loai; 
    var hinhAnh = arrProduct[product - 1].hinhAnh; 
    var ten = arrProduct[product - 1].ten; 
    var gia = arrProduct[product - 1].gia; 
    var soLuong = Number(arrProduct[product - 1].soLuong); 
    var item = new Product(id, loai, hinhAnh, ten, gia, soLuong);
    cart.push(item);
    renderCart(cart);
  
  // api
  //   .getCartApi(id)
  //   .then(function (result) {
  //     var cartItem = {
  //       id: result.data.id,
  //       ten: result.data.ten,
  //       gia: result.data.gia,
  //       loai: result.data.loai,
  //       hinhAnh: result.data.hinhAnh,
  //       soLuong: result.data.soLuong,
  //     };
  //     cart.push(cartItem);
  //     cart.push.getArrProduct(cartItem);
  //     renderCart(cart);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}

function renderCart(arrProduct) {
  var contentHTML = "";
  arrProduct.forEach(function(product) {
    contentHTML += `
    <tr>
      <td >${product.id}</td>
      <td style = "width: 35%">
          <img class="image" src="./../../assets/images/${product.hinhAnh}" style= "width: 50%; margin-bottom: 10px" />
      </td>
      <td>${product.ten}</td>
      <td>
          <button id="giam" onclick = "giamSL(${product.id})"><i class="fas fa-angle-left"></i></button>
          <input id="soLuong" style="width:20px; border: none" value= "${product.soLuong}">
          <button id="tang" onclick = "tangSL(${product.id})"><i class="fas fa-angle-right"></i></button>
      </td>
      <td >$${product.gia}</td>
      <td >
          <button class = "btn"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`;
  });
  getEle("danhSachSP").innerHTML = contentHTML;
}






/**
 * Câu 7: Khi thêm sản phẩm vào giỏ hàng, nếu sản phẩm chưa có trong giỏ hàng thì push vào cart với quantity là 1, nếu đã có rồi thì ko push nữa mà chỉ tăng quantity lên 1 đơn vị
 */

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
