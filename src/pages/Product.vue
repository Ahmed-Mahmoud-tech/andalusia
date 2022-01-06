<template>
  <h1 class="title container">Product</h1>

  <Multiselect
    :products="products"
    :resetTypeMultiSelect="resetTypeMultiSelect"
    :resetTypeSelect="resetTypeSelect"
  />
  <q-icon name="list" />
  <Select
    :data="warehouses"
    theLable="warehouses"
    @changeData="changeWarehouse"
  />
  <Select
    :data="types"
    theLable="types"
    @changeData="changeType"
    :resetTypeSelect="resetTypeSelect"
  />

  <Table />
</template>

<script>
import { onMounted, ref, onUpdated } from "vue";
import { useStore } from "vuex";

import Multiselect from "../components/Multiselect/Multiselect.vue";
import Select from "../components/Select/Select.vue";
import Table from "../components/Table/Table.vue";

export default {
  components: { Multiselect, Select, Table },
  setup() {
    const store = useStore();

    const warehouses = ref();
    const types = ref();
    const products = ref();
    const warehousSelected = ref();
    const typeSelected = ref();
    const productSelected = ref();
    const resetTypeSelect = ref(false);
    const resetTypeMultiSelect = ref(false);

    const changeWarehouse = (e) => {
      resetTypeSelect.value = false;
      resetTypeMultiSelect.value = "w";
      Object.keys(store.state.WHs).map((w) => {
        if (w == e.value) {
          types.value = Object.keys(store.state.WHs[w]);
          warehousSelected.value = w;
        }
      });
    };

    // const resetTypeSelect = () => {
    //   resetTypeSelect.value = " ";
    // };

    const changeType = (e) => {
      resetTypeSelect.value = true;
      resetTypeMultiSelect.value = "t";
      typeSelected.value = e.value;
      products.value = store.state.WHs[warehousSelected.value][e.value]?.map(
        (p) => {
          return p.product;
        }
      );
    };

    onMounted(() => {
      warehouses.value = Object.keys(store.state.WHs);
    });

    return {
      warehouses,
      warehousSelected,
      types,
      typeSelected,
      changeWarehouse,
      products,
      productSelected,
      changeType,
      resetTypeSelect,
      resetTypeMultiSelect,
    };
  },
};
</script>

<style lang="scss">
.title {
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
}
.product {
  min-height: 80vh;
  background-color: #fff;
  margin-bottom: 10px;

  .product-content {
    padding: 20px 40px;
    .sec-title {
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      gap: 5px;
      h3 {
        font-size: 16px;
      }
      svg {
        color: aquamarine;
      }
    }
  }
}
</style>
