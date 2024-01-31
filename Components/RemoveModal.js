// 1. 先將元件環境建立
// 2. 把版型加入
// 3. 解除版型內的錯誤
// 4. $refs Bootstrap

export default {
  props: ['selectProduct', 'deleteProduct'],
  data() {
    return {
      bsDelModal: null
    }
  },
  methods: {
    // Modal 控制
    showModal() {
      this.bsDelModal.show()
    },
    hideModal() {
      this.bsDelModal.hide()
    },
  },
  template: /*html*/`
  <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
  aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ selectProduct.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger"
          @click="deleteProduct"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  mounted() {
    this.bsDelModal = new bootstrap.Modal(this.$refs.delProductModal);
  }
}