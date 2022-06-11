import {ProductList} from '../models/dssp.js';
import {Products} from '../models/products.js';
import {Services} from '../services/index.js';

// biến ở local
let api = new Services();
let dssp = new ProductList();
let arrProduct = dssp.arrList;
let cart = [];

const getEle = (id) => {
  return document.getElementById(id);
}

/**
 * Câu 8: . In giỏ hàng ra màn hình, viết hàm renderCart và duyệt mảng giỏ hàng, có bao nhiêu sản phẩm thì tạo ra bấy nhiêu <tr> tương ứng. 
 */
 const renderCart = (data) => { 
  let contentHTML = "";
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

/**
 * Câu 11: Lưu giỏ hàng vào localstorage , lần sau khi vào trang sẽ load lên lại.
 */
 const setLocalStorage = () => {
  let string = JSON.stringify(cart);
  localStorage.setItem("cart", string);
}

const getLocalStorage = () => {
  if(localStorage.getItem("cart")) {
      let dataString = localStorage.getItem("cart");
      let dataJSON = JSON.parse(dataString);
      cart = dataJSON;
      renderCart(cart);
  }
}
getLocalStorage();

// tạo mảng
const getArrProduct = (data) => {
  data.forEach(function(product) {
      let id = product.id;
      let loai = product.loai;
      let hinhAnh = product.hinhAnh;
      let ten = product.ten;
      let gia = product.gia;
      let soLuong = product.soLuong;
      let products = new Products(id, loai, hinhAnh, ten, gia, soLuong);
      dssp.addProduct(products);
  })
}

/**
 * Câu 3: Hiển thị danh sách sản phẩm cho khách hàng.
 */

 const renderListProduct = (data) => {
  let content = "";
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

const getListProducts = () => {
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

/**
 * Câu 4: Tạo một ô select cho phép người dùng filter theo loại sản phẩm, ô select có 2 option là samsung và iphone, viết hàm gắn vào sự kiện onChange của select
 */

getEle("loaiDT").onchange = () => {
  let loaiSelect = getEle("loaiDT").value;
  let fillerProduct= arrProduct.filter(function(product) {
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
window.addCart = (productId) => {
  for( let i = 0; i < cart.length; i++) {
    if(productId === +cart[i].id) {
      cart[i].soLuong++;
      renderCart(cart);
      general();
      return;
    }
  }
    let id = arrProduct[productId - 1 ].id ; 
    let loai = arrProduct[productId - 1].loai; 
    let hinhAnh = arrProduct[productId - 1].hinhAnh; 
    let ten = arrProduct[productId - 1].ten; 
    let gia = arrProduct[productId - 1].gia; 
    let soLuong = Number(arrProduct[productId - 1].soLuong); 
    let cartItem = new Products(id, loai, hinhAnh, ten, gia, soLuong);
    cart.push(cartItem);
    renderCart(cart);
    general();
}

/**
 * Câu 9: Trong giao diện giỏ hàng, cho phép người dùng chỉnh sửa số lượng (gợi ý: cho 2 nút tăng giảm), viết hàm gắn vào 2 nút đó, khi nhấn vào thì truyền vào id, tìm trong mảng giỏ hàng xem sản phẩm
đó nằm ở đâu, lấy quantity ra tăng hoặc giảm , sau đó render lại giao diện
 */
window.giamSL = (productId) => {
  for( let i = 0; i < cart.length; i++) {
    if(productId === +cart[i].id && cart[i].soLuong > 0) {
      cart[i].soLuong--;
    }
  }
    renderCart(cart);
    general();
}
window.tangSL = (productId) => {
  for( let i = 0; i < cart.length; i++) {
    if(productId === +cart[i].id) {
      cart[i].soLuong++;
    }
  }
    renderCart(cart);
    general();
}

/**
 * Câu 10: In tổng tiền ra giao diện. Trong hàm renderCart, tính tổng giá tiền của tất cả sản phẩm và hiện ra
(giá tiền * số lượng)
 */
const tongTien = () => {
  let tongTien = 0;
  for(let i = 0; i < cart.length; i++) {
    tongTien += Number(cart[i].soLuong) * Number(cart[i].gia);
  }
  getEle("total").innerHTML = tongTien; 
  setLocalStorage();
}

const tongItem = () => {
  let soItem = 0;
  for(let i = 0; i < cart.length; i++) {
    soItem += Number(cart[i].soLuong);
  }
  getEle("soItem").innerHTML = soItem; 
  setLocalStorage();
}



/**
 * Câu 12: Người dùng nhấn nút thanh toán, clear giỏ hàng, set mảng giỏ hàng về mảng rỗng 
 */
getEle("payment").onclick = () => {
  cart = [];
  renderCart(cart)
  general();
}
getEle("clear").onclick = () => {
  cart = [];
  renderCart(cart)
  general();
}

/**
 * Câu 13: Cho phép người dùng remove sản phẩm ra khỏi giỏ hàng 
 */
window.deleteSP = (productId) => {
  for( let i = 0; i < cart.length; i++) {
    if(productId === +cart[i].id) {
      cart.splice(i,1);
    }
  }
    renderCart(cart);
    general();
}


// hàm tính tiền + đếm số item + setlocal
const general = () => {
  tongTien();
  tongItem()
  setLocalStorage();
}