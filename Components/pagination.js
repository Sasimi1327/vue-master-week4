// 1. 先將元件環境建立
// 2. 把版型加入
// 3. 解除版型內的錯誤

export default {
  props: ['pages', 'getProducts'],
  template: /*html*/`
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" 
        :class="{ disabled: !pages.has_pre }"
        >
          <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="getProducts(pages.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" 
        v-for="page in pages.total_pages" :key="page + 123"
        :class="{ 
          active: page === pages.current_page
        }">
          <span class="page-link"
            v-if="page === pages.current_page"
          >{{ page }}</span>
          <a class="page-link" href="#"
            v-else
            @click.prevent="getProducts(page)"
          >{{ page }}</a>
        </li>
        <li class="page-item" 
          :class="{ disabled: !pages.has_next }"
        >
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="getProducts(pages.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>`
}