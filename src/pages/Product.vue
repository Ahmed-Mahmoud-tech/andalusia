<template>
  <h3 class="title container">Product</h3>
  <div class="product container">
    <div class="product-content">
      <div class="sec-title">
        <q-icon size="1.5em" name="file_copy" />
        <h3>basic information</h3>
      </div>
      <div class="product-first-row">
        <div class="warehouses">
          <label for="warehouses">warehouses</label>
          <Select
            id="warehouses"
            :data="warehouses"
            theLable="warehouses"
            @changeData="changeWarehouse"
          />
        </div>
        <div class="types">
          <label for="types">types</label>
          <Select
            id="types"
            :data="types"
            theLable="types"
            @changeData="changeType"
            :resetTypeSelect="resetTypeSelect"
          />
        </div>
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
      </div>
      <div class="product-seconde-row">
        <form action="" class="radio">
          <div class="radio">
            <label for="all">all products</label>
            <input
              type="radio"
              name="appearance"
              id="all"
              value="allProducts"
              @click="setRadioValue"
            />
          </div>
          <div class="radio">
            <label for="specific">specific products</label>
            <input
              type="radio"
              name="appearance"
              id="specific"
              value="specificProducts"
              @click="setRadioValue"
            />
          </div>
        </form>
        <Multiselect
          :products="products"
          :resetTypeMultiSelect="resetTypeMultiSelect"
          :resetTypeSelect="resetTypeSelect"
          class="multi-select"
          @getProductsSelected="getProductsSelected"
        />
        <div class="search-button">
          <q-btn
            :ripple="{ center: true }"
            color="secondary"
            label="Search"
            no-caps
            @click="getAllData"
          />
        </div>
      </div>
      <Table :finalData="finalData" :realUpdate="realUpdate" />
    </div>
  </div>
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
.title {
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
  height: 34px;
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
      i {
        color: #71dfba;
      }
    }
    .product-first-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding-top: 30px;
    }
    .product-seconde-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding-top: 30px;
    }
  }
}
.multi-select {
  visibility: hidden;
}

.q-table__bottom .q-table__control {
  max-height: 25px;
  min-height: unset;
}
</style>
