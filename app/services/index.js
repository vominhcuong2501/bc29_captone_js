function Services() {
  /**
   * Câu 1: Tự tạo api Product bằng MockAPI.
   */
    this.getListProductApi = function() {
        return axios({
            url: "https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone",
            method: "GET",
        });
    };

    this.getCartApi = function(id) {
        return axios({
          url:`https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone/${id}`,
          method: "GET",
        });
    };

    this.changeQuantilyProductApi = function (product) {
      return axios({
        url: `https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone/${product.id}`,
        method: "PUT",
        data: product
      });
    };
}
