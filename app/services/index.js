export class Services {
  /**
   * Câu 1: Tự tạo api Product bằng MockAPI.
   */
    getListProductApi = () => {
        return axios({
            url: "https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone",
            method: "GET",
        });
    };

    getCartApi = (id) => {
        return axios({
          url:`https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone/${id}`,
          method: "GET",
        });
    };

    
}
