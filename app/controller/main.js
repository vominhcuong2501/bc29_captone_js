var api = new Services();
var dssp = new ProductList();
var arrProduct = dssp.arrList;
var cart = [];
getLocalStorage();

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
      var product = new Products(id, loai, hinhAnh, ten, gia, soLuong);
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
              </div>
              <div id= "divAdd" class="d-flex justify-content-between my-3">
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
 * Câu 6:Không push trực tiếp sản phẩm được chọn vào mảng cart vì không có số lượng , tạo một đối
tượng mới có định dạng sau rồi push vào mảng cart 
 * Câu 7: Khi thêm sản phẩm vào giỏ hàng, nếu sản phẩm chưa có trong giỏ hàng thì push vào cart với quantity là 1, nếu đã có rồi thì ko push nữa mà chỉ tăng quantity lên 1 đơn vị
 */
// Cách 1 dùng mảng
function addCart(productId) {
  for( var i = 0; i < cart.length; i++) {
    if(productId === +cart[i].id) {
      cart[i].soLuong++;
      renderCart(cart);
      tongTien();
      tongItem()
      return;
    }
  }
    var id = arrProduct[productId - 1 ].id ; 
    var loai = arrProduct[productId - 1].loai; 
    var hinhAnh = arrProduct[productId - 1].hinhAnh; 
    var ten = arrProduct[productId - 1].ten; 
    var gia = arrProduct[productId - 1].gia; 
    var soLuong = Number(arrProduct[productId - 1].soLuong); 
    var cartItem = new Products(id, loai, hinhAnh, ten, gia, soLuong);
    cart.push(cartItem);
    renderCart(cart);
    tongTien();
    tongItem()
    setLocalStorage();
}

/**
 * Câu 8: . In giỏ hàng ra màn hình, viết hàm renderCart và duyệt mảng giỏ hàng, có bao nhiêu sản phẩm thì tạo ra bấy nhiêu <tr> tương ứng. 
 */
function renderCart(data) { // cách 2: đổi mảng sang data
  var contentHTML = "";
  data.forEach(function(product) {
    contentHTML += `
    <tr>
      <td style = "width: 35%">
          <img class="image" src="./../../assets/images/${product.hinhAnh}" style= "width: 50%; margin-bottom: 10px" />
      </td>
      <td>${product.ten}</td>
      <td>
          <button id="giam" onclick = "giamSL(${product.id})"><i class="fas fa-angle-left"></i></button>
          <input id="soLuong" style="width:30px; border: none" value= "${product.soLuong}">
          <button id="tang" onclick = "tangSL(${product.id})"><i class="fas fa-angle-right"></i></button>
      </td>
      <td >$${product.gia}</td>
      <td >
          <button class = "btn" onclick = "deleteSP(${product.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>`;
  });
  getEle("danhSachSP").innerHTML = contentHTML;
}

// Cách 2 api
// function addCart(id) {
//   getEle("btnAdd").style.display = "none";
//   api
//     .getCartApi(id)
//     .then(function (result) {
//       var id = result.data.id;
//       var loai = result.data.loai;
//       var hinhAnh = result.data.hinhAnh;
//       var ten = result.data.ten;
//       var gia = result.data.gia;
//       var soLuong = result.data.soLuong;
//       var product = new Products(id, loai, hinhAnh, ten, gia, soLuong);
//       cart.push(product);
//       // for( var i = 0; i < cart.length; i++) {
//       //   if(id === cart[i].id) {
//       //     console.log(id);
//       //     console.log(cart[i].id);
//       //     api
//       //       .changeQuantilyProductApi(product)
//       //       .then(function(result) {
//       //        result.data.soLuong += 1;
//       //       })
//       //       .catch(function(error){
//       //         console.log(error);
//       //       })
//       //   }
//         renderCart(cart);
//         // setLocalStorage();
//     //   }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
    
// }

/**
 * Câu 9: Trong giao diện giỏ hàng, cho phép người dùng chỉnh sửa số lượng (gợi ý: cho 2 nút tăng giảm), viết hàm gắn vào 2 nút đó, khi nhấn vào thì truyền vào id, tìm trong mảng giỏ hàng xem sản phẩm
đó nằm ở đâu, lấy quantity ra tăng hoặc giảm , sau đó render lại giao diện
 */
function giamSL(productId) {
  for( var i = 0; i < cart.length; i++) {
    if(productId === +cart[i].id && cart[i].soLuong > 0) {
      cart[i].soLuong--;
    }
  }
    renderCart(cart);
    tongTien();
    tongItem()
    setLocalStorage();
}
function tangSL(productId) {
  for( var i = 0; i < cart.length; i++) {
    if(productId === +cart[i].id) {
      cart[i].soLuong++;
    }
  }
    renderCart(cart);
    tongTien();
    tongItem()
    setLocalStorage();
}

/**
 * Câu 10: In tổng tiền ra giao diện. Trong hàm renderCart, tính tổng giá tiền của tất cả sản phẩm và hiện ra
(giá tiền * số lượng)
 */
function tongTien() {
  var tongTien = 0;
  for(var i = 0; i < cart.length; i++) {
    tongTien += Number(cart[i].soLuong) * Number(cart[i].gia);
  }
  getEle("total").innerHTML = tongTien; 
  setLocalStorage();
}

function tongItem() {
  var soItem = 0;
  for(var i = 0; i < cart.length; i++) {
    soItem += Number(cart[i].soLuong);
  }
  getEle("soItem").innerHTML = soItem; 
  setLocalStorage();
}



/**
 * Câu 11: Lưu giỏ hàng vào localstorage , lần sau khi vào trang sẽ load lên lại.
 */
 function setLocalStorage() {
  // convert from JSON to String (chuyển công thức sang chuỗi)
  var string = JSON.stringify(cart);
  // lưu xuống localstorage
  localStorage.setItem("cart", string);
}

function getLocalStorage() {
  if(localStorage.getItem("cart")) {
      var dataString = localStorage.getItem("cart");
      // convert from string to JSON (chuyển chuỗi sang công thức)
      var dataJSON = JSON.parse(dataString);
      cart = dataJSON;
      renderCart(cart);
  }
}

/**
 * Câu 12: Người dùng nhấn nút thanh toán, clear giỏ hàng, set mảng giỏ hàng về mảng rỗng 
 */
getEle("payment").onclick = function() {
  cart = [];
  renderCart(cart)
  tongTien();
  tongItem()
    setLocalStorage();
}
getEle("clear").onclick = function() {
  cart = [];
  tongTien();
  renderCart(cart)
    setLocalStorage();
    tongItem()
}

/**
 * Câu 13: Cho phép người dùng remove sản phẩm ra khỏi giỏ hàng 
 */
 function deleteSP(productId) {
  for( var i = 0; i < cart.length; i++) {
    if(productId === +cart[i].id) {
      var id = arrProduct[productId - 1 ].id ; 
      var loai = arrProduct[productId - 1].loai; 
      var hinhAnh = arrProduct[productId - 1].hinhAnh; 
      var ten = arrProduct[productId - 1].ten; 
      var gia = arrProduct[productId - 1].gia; 
      var soLuong = Number(arrProduct[productId - 1].soLuong); 
      var cartItem = new Products(id, loai, hinhAnh, ten, gia, soLuong);
      cart.splice(cartItem,1);
    }
  }
    renderCart(cart);
    tongTien();
    tongItem()
    setLocalStorage();
}


