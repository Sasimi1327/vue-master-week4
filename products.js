import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.15/vue.esm-browser.min.js';

import pagination from './Components/pagination.js';
import ProductModal from './Components/ProductModal.js';
import RemoveModal from './Components/RemoveModal.js';

// let bsProductModal = "";
// let bsDelModal = "";

const url = 'https://ec-course-api.hexschool.io/v2';
const apiPath = 'sasimi';

const baseUrl = `${url}/api/${apiPath}/admin/product`;

const app = createApp({
  data() {
    return {
      products: {},
      selectProduct: {
        imagesUrl: []
      },
      pages: {}
    }
  },
  methods: {
    // 登入驗證
    getTokenFromCookies() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)HexSchoolVueToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      axios.defaults.headers.common['Authorization'] = token;
    },
    check() { // 2. 驗證登入
      axios.post(`${url}/api/user/check`)
        .then(res => {
          //驗證成功
          this.getProducts()
        })
        .catch(err => {
          //驗證失敗
          Swal.fire({
            icon: "error",
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: "Got It!",
          }).then((result) => {
            location.replace('./') //按下 confirm button 後才進行跳轉
          });
        })
    },
    // Modal 控制
    //? 已搬移至元件內，讓內層的 Modal 直接調用
    // showModal(modal) {
    //   modal.show()
    // },
    // hideModal(modal) {
    //   modal.hide()
    // },
    // 產品方法
    getProducts(page = 1) {
      const getUrl = `${url}/api/${apiPath}/admin/products?page=${page}`; //有分頁
      axios.get(getUrl)
      .then(res => {
        this.products = res.data.products;
        this.pages = res.data.pagination;
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: `錯誤 ${err.response.status}`,
          text: err.response.data.message,
          confirmButtonText: "OK",
        });
      })
    },
    updateProduct(){
      const url = `${baseUrl}/${this.selectProduct.id ? this.selectProduct.id : ''}`;
      const updateData = {
        data: this.selectProduct,
      };
      const reqMethod = this.selectProduct.id ? 'put' : 'post';

      axios[reqMethod](url, updateData)
        .then(res => {
          this.$refs.prodModal.hideModal()
          this.getProducts();
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: "OK",
          });
        })
    },
    deleteProduct(){
      const url = `${baseUrl}/${this.selectProduct.id}`;
      axios.delete(url)
        .then(res => {
          this.$refs.delModal.hideModal()
          this.getProducts();
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: "OK",
          });
        })
    },
    // 開啟 new model
    openNewModal() {
      this.selectProduct = {}
      // this.showModal(bsProductModal)
      //! [註]: 2. 這邊的 $refs 是綁定在元件上，父元件可透過 $refs 取得子元件內的資料和方法
      this.$refs.prodModal.showModal()
    },
    // 開啟 edit model
    openEditModal(item) {
      this.selectProduct = { ...item }
      // this.showModal(bsProductModal)
      //! [註]: 2. 這邊的 $refs 是綁定在元件上，父元件可透過 $refs 取得子元件內的資料和方法
      this.$refs.prodModal.showModal()
    },
    // 開啟 remove model
    openDeleteModal(item){
      this.selectProduct = { ...item }
      // this.showModal(bsDelModal)
      //! [註]: 2. 這邊的 $refs 是綁定在元件上，父元件可透過 $refs 取得子元件內的資料和方法
      this.$refs.delModal.showModal()
    },
  },
  components: {
    pagination,
    ProductModal,
    RemoveModal
  },
  mounted() {
    this.getTokenFromCookies();
    this.check();
    // 初始化綁定 Modal
    //! [註]: 1. 這邊的 $refs 是為了選取 Modal 的 DOM 元素
    // bsProductModal = new bootstrap.Modal(this.$refs.productModal);
    // bsDelModal = new bootstrap.Modal(this.$refs.delProductModal);
  }
});
app.mount('#app');