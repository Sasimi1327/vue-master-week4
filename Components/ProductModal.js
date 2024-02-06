// 1. 先將元件環境建立
// 2. 把版型加入
// 3. 解除版型內的錯誤
// 4. $refs Bootstrap
//!  - 選取 DOM 元素
//!  - 調用元件內的資料和方法 ✔

export default {
  props: ['selectProduct','updateProduct'],
  data() {
    return {
      bsProductModal: null
    }
  },
  template: /*html*/`<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
  aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="selectProduct.id">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input type="text" class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="selectProduct.imageUrl">
                <img class="img-fluid" 
                    :src="selectProduct.imageUrl" 
                    :alt="selectProduct.title">
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <!-- 判斷 selectProduct.imagesUrl 是一個陣列 -->
              <template  v-if="Array.isArray(selectProduct.imagesUrl)">
                <div class="mb-1" v-for="(img, key) in selectProduct.imagesUrl" :key="img">
                  <div class="mb-3">
                    <label class="form-label">圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結"
                    v-model="selectProduct.imagesUrl[key]">
                  </div>
                  <img class="img-fluid" :src="selectProduct.imagesUrl[key]">
                </div>
                <!-- 當 selectProduct.imagesUrl 長度不為0 或 陣列最後一個位置是有值的 -->
                <div v-if="!selectProduct.imagesUrl.length || selectProduct.imagesUrl.at(-1)">
                  <button class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="selectProduct.imagesUrl.push('')">
                    新增圖片
                  </button>
                </div>
                <div v-if="selectProduct.imagesUrl.length">
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="selectProduct.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </div>
              </template>
              <div v-else>
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="selectProduct.imagesUrl = ['']">
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" 
                        placeholder="請輸入標題"
                        v-model="selectProduct.title">
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control"
                        placeholder="請輸入分類"
                        v-model="selectProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" 
                        placeholder="請輸入單位"
                        v-model="selectProduct.unit">
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                          v-model.number="selectProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control"
                  placeholder="請輸入售價"
                          v-model.number="selectProduct.price">
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入產品描述"
                          v-model="selectProduct.description">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="content" type="text" class="form-control"
                          placeholder="請輸入說明內容"
                          v-model="selectProduct.content">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                          :true-value="1" :false-value="0"
                          v-model="selectProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary"
          @click="updateProduct"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    // Modal 控制
    showModal() {
      this.bsProductModal.show()
    },
    hideModal() {
      this.bsProductModal.hide()
    },
  },
  mounted() {
    this.bsProductModal = new bootstrap.Modal(this.$refs.productModal);
  }
}