<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <div style="min-width: 250px; max-width: 300px">
        <q-select
          filled
          v-model="modelMultiple"
          multiple
          :options="options"
          use-chips
          stack-label
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onUpdated } from "vue";

export default {
  props: ["products", "resetTypeMultiSelect", "resetTypeSelect"],
  setup(props, { emit }) {
    const modelSingle = ref("Apple");
    const modelMultiple = ref([]);
    const options = ref([props.products]);
    const firstInArray = ref("");

    let p = onUpdated(() => {
      emit("getProductsSelected", modelMultiple.value);
      if (props.products) {
        options.value = props.products;
        if (firstInArray.value != props.products[0]) {
          firstInArray.value = props.products[0];
          modelMultiple.value = [];
        }
      }

      if (!props.resetTypeSelect) {
        modelMultiple.value = [];
        options.value = [];
      }
    });

    return {
      modelSingle,
      modelMultiple,
      options,
    };
  },
};
</script>
<style lang="scss">
.q-chip.row.inline.no-wrap.items-center.q-chip--dense {
  font-size: 10px;
  background-color: #d7e4f1;
}
.notranslate.material-icons.q-icon.q-chip__icon.q-chip__icon--remove.cursor-pointer {
  color: darkblue;
}
.q-gutter-md.row.items-start > div {
  max-width: unset !important;
  width: 100%;
}

.q-field__control.relative-position.row.no-wrap,
.q-field__control.relative-position.row.no-wrap * {
  max-height: unset !important;
  height: auto;
  min-height: fit-content !important;
}

.q-field__control.relative-position.row.no-wrap {
  border: 1px solid #deecf3;
}

.q-field__marginal {
  height: auto;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
  min-height: 25px;
  padding: 4px 6px !important;
}
.q-field--outlined .q-field__control:before {
  border: 0;
}
</style>
