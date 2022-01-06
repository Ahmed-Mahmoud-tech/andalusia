<template>
  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
      <q-select
        outlined
        v-model="model"
        :options="options"
        :label="theLable"
        @change="$emit('changeData')"
      />
    </div>
  </div>
</template>

<script>
import { ref, onUpdated, onMounted } from "vue";

export default {
  props: ["data", "theLable", "resetTypeSelect"],

  setup(props, { emit }) {
    const model = ref(null);
    const checkData = onUpdated(() => {
      emit("changeData", model);
    });

    const theLable = ref(props.theLable);
    const options = ref([props.data]);
    const t = onUpdated(() => {
      if (props.data) {
        options.value = props.data;
      }

      if (!props.resetTypeSelect && props.theLable == "types") {
        model.value = " ";
        console.log(props.resetTypeSelect);
      }
    });

    return {
      model,
      options,
      checkData,
    };
  },
};
</script>
