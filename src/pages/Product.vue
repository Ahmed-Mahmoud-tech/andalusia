<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs class="text-brown">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el label="Home" icon="home" />
      <q-breadcrumbs-el label="product" icon="widgets" />
      <!-- <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" /> -->
    </q-breadcrumbs>
  </div>

  <h1 class="title container">Product</h1>
  <Multiselect
    :products="products"
    :resetTypeMultiSelect="resetTypeMultiSelect"
    :resetTypeSelect="resetTypeSelect"
    class="multi-select"
    @getProductsSelected="getProductsSelected"
  />
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
  <div class="check-box">
    <input
      type="checkbox"
      id="check"
      name="check"
      value="check"
      @click="checkZeroFun"
    />
    <label for="check">show zero balance</label>
  </div>
  <form
    action="
  "
    class="radio"
  >
    <div class="radio">
      <label for="all"></label>
      <input
        type="radio"
        name="appearance"
        id="all"
        value="allProducts"
        @click="setRadioValue"
      />
    </div>
    <div class="radio">
      <label for="specific"></label>
      <input
        type="radio"
        name="appearance"
        id="specific"
        value="specificProducts"
        @click="setRadioValue"
      />
    </div>
  </form>

  <q-btn
    :ripple="{ center: true }"
    color="secondary"
    label="Search"
    no-caps
    @click="getAllData"
  />

  <Table :finalData="finalData" :realUpdate="realUpdate" />
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
    const productSelected = ref([]);
    const resetTypeSelect = ref(false);
    const resetTypeMultiSelect = ref(false);
    const radioValue = ref();
    const finalData = ref([]);
    const realUpdate = ref(0);
    const checkZero = ref(false);

    onMounted(() => {
      warehouses.value = Object.keys(store.state.WHs);
    });

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

    const setRadioValue = () => {
      document.getElementsByName("appearance").forEach((radio) => {
        if (radio.checked) {
          radioValue.value = radio.value;
        }
      });
      if (radioValue.value === "specificProducts") {
        document.querySelector(".multi-select").style.visibility = "visible";
      } else {
        document.querySelector(".multi-select").style.visibility = "hidden";
      }
    };

    const getAllData = () => {
      finalData.value = [];
      if (radioValue.value === "specificProducts") {
        store.state.WHs[warehousSelected.value][typeSelected.value].map(
          (ty) => {
            productSelected.value.map((p, i) => {
              if (ty.product == p) {
                finalData.value.push({
                  product: p,
                  onHand: ty.onHand,
                  type: typeSelected.value,
                });
              }
            });
          }
        );
      } else {
        store.state.WHs[warehousSelected.value][typeSelected.value].map(
          (ty) => {
            finalData.value.push({
              product: ty.product,
              onHand: ty.onHand,
              type: typeSelected.value,
            });
          }
        );
      }
      if (checkZero.value) {
        finalData.value = finalData.value.filter((f) => {
          return f.onHand != 0;
        });
      }
      // store.dispatch("serveData", finalData);
      realUpdate.value++;
    };

    const checkZeroFun = (e) => {
      checkZero.value = e.target.checked;
    };

    const getProductsSelected = (e) => {
      productSelected.value = e;
    };

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
      setRadioValue,
      getAllData,
      getProductsSelected,
      finalData,
      realUpdate,
      checkZeroFun,
    };
  },
};
</script>

<style lang="scss">
// .title {
//   margin-top: 10px;
//   font-weight: bold;
//   font-size: 18px;
// }
// .product {
//   min-height: 80vh;
//   background-color: #fff;
//   margin-bottom: 10px;

//   .product-content {
//     padding: 20px 40px;
//     .sec-title {
//       border-bottom: 1px solid #eee;
//       display: flex;
//       align-items: center;
//       padding-bottom: 10px;
//       gap: 5px;
//       h3 {
//         font-size: 16px;
//       }
//       svg {
//         color: aquamarine;
//       }
//     }
//   }
// }
.multi-select {
  visibility: hidden;
}
</style>
