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
