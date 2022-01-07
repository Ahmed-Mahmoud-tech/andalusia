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
          <label for="warehouses"
            >warehouses <span class="astric">*</span></label
          >
          <Select
            id="warehouses"
            :data="warehouses"
            theLable="warehouses"
            @changeData="changeWarehouse"
          />
          <span class="message"> this fild is required </span>
        </div>
        <div class="types">
          <label for="types">types <span class="astric">*</span></label>
          <Select
            id="types"
            :data="types"
            theLable="types"
            @changeData="changeType"
            :resetTypeSelect="resetTypeSelect"
          />
          <span class="message"> this fild is required </span>
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
        <div class="radio-container">
          <span class="radio-title">product classification</span>
          <form action="" class="radio">
            <div class="radio-sec">
              <input
                type="radio"
                name="appearance"
                id="all"
                value="allProducts"
                @click="setRadioValue"
              />
              <label for="all">all products</label>
            </div>
            <div class="radio-sec">
              <input
                type="radio"
                name="appearance"
                id="specific"
                value="specificProducts"
                @click="setRadioValue"
              />
              <label for="specific">specific products</label>
            </div>
          </form>
        </div>

        <div class="multi-select">
          <label for="types">product <span class="astric">*</span></label>
          <Multiselect
            :products="products"
            :resetTypeMultiSelect="resetTypeMultiSelect"
            :resetTypeSelect="resetTypeSelect"
            class=""
            @getProductsSelected="getProductsSelected"
          />
          <span class="message"> this fild is required </span>
        </div>

        <div class="search-button">
          <button @click="getAllData">Search</button>
          <!-- <q-btn
            :ripple="{ center: true }"
            color="secondary"
            label="Search"
            no-caps
           
          /> -->
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
    const radioValue = ref("allProducts");
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
    const required = () => {
      if (!warehousSelected.value) {
        document.querySelector(" .warehouses .message").style.opacity = 1;
        setTimeout(() => {
          document.querySelector(" .warehouses .message").style.opacity = 0;
        }, 2000);
      } else if (
        (warehousSelected.value && typeSelected.value == " ") ||
        !typeSelected.value
      ) {
        document.querySelector(" .types .message").style.opacity = 1;
        document.querySelector(" .warehouses .message").style.opacity = 0;
        setTimeout(() => {
          document.querySelector(" .types .message").style.opacity = 0;
        }, 2000);
      }
      if (
        warehousSelected.value &&
        typeSelected.value &&
        typeSelected.value != " " &&
        radioValue.value == "specificProducts" &&
        productSelected.value.length == "0"
      ) {
        document.querySelector(".multi-select .message").style.opacity = 1;
        setTimeout(() => {
          document.querySelector(".multi-select .message").style.opacity = 0;
        }, 2000);
      }
    };
    const getAllData = () => {
      required();
      finalData.value = [];
      if (radioValue.value === "specificProducts") {
        store.state.WHs[warehousSelected.value][typeSelected.value]?.map(
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
        store.state.WHs[warehousSelected.value]
          ? store.state.WHs[warehousSelected.value][typeSelected.value].map(
              (ty) => {
                finalData.value.push({
                  product: ty.product,
                  onHand: ty.onHand,
                  type: typeSelected.value,
                });
              }
            )
          : null;
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
  font-weight: bold;
  font-size: 18px;
  height: 34px;
}
.product {
  min-height: 80vh;
  background-color: #fff;
  margin-bottom: 10px;
  .product-content {
    padding: 0px 40px 20px;

    color: #666;

    .sec-title {
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      text-transform: capitalize;

      gap: 5px;
      h3 {
        font-size: 16px;
        font-weight: 700;
        line-height: 30px;
        padding-top: 10px;
      }
      i {
        color: #3ce9ee;
      }
    }
    .product-first-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding-top: 30px;
      .warehouses {
        label {
          text-transform: capitalize;
          font-size: 12px;
          color: #484887d1;
          font-weight: 500;

          span.astric {
            color: red;
          }
        }
      }
      .types {
        label {
          text-transform: capitalize;
          font-size: 12px;
          color: #484887d1;
          span.astric {
            color: red;
          }
        }
      }
      .check-box {
        display: flex;
        align-items: center;
        input {
          margin-right: 10px;
        }
        label {
          text-transform: capitalize;
          font-size: 12px;
          color: #484887d1;
          font-weight: 500;
        }
      }
    }
    .product-seconde-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding-top: 30px;
      .radio-container {
        .radio-title {
          text-transform: capitalize;
          font-size: 12px;
          color: #484887d1;
          font-weight: 500;
          margin-bottom: 12px;
          display: block;
        }
        .radio {
          display: flex;
          justify-content: space-between;
          margin-right: 60px;
          .radio-sec {
            display: flex;
            align-items: center;

            justify-content: flex-start;
            label {
              text-transform: capitalize;
              font-size: 12px;
              color: #484887d1;
            }
            input {
              margin-right: 7px;
            }
          }
        }
      }
      .multi-select {
        visibility: hidden;
        label {
          text-transform: capitalize;
          font-size: 12px;
          color: #484887d1;
          span.astric {
            color: red;
          }
        }
      }
      .search-button {
        display: flex;
        align-items: end;
        justify-content: right;
        button {
          border: 1px solid #eee;
          border-radius: 4px;
          width: 90px;
          color: #fff;
          background-color: #3ce9ee;
          padding: 3px;
          height: 29px;
          cursor: pointer;
        }
      }
    }
  }
}
.message {
  color: red;
  text-transform: capitalize;
  font-size: 12px;
  opacity: 0;
  transition: 0.3s;
}
.q-table__bottom .q-table__control {
  max-height: 25px;
  min-height: unset;
}
.q-pa-md {
  padding: 4px 0;
}
</style>
