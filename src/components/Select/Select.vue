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
<style lang="scss">
.q-pa-md {
  padding: 16px 0;
}
.q-field__control.relative-position.row.no-wrap {
  padding: 0 0 0 15px;
}
.q-field__append.q-field__marginal.row.no-wrap.items-center.q-anchor--skip {
  width: 30px;
  padding: 12px;
  background-color: #8bc1df36;
  padding-left: 3px;
}
.q-field__label.no-pointer-events.absolute.ellipsis {
  padding-left: 20px;
}

.q-field--focused .q-field__label.no-pointer-events.absolute.ellipsis,
.q-field--float .q-field__label.no-pointer-events.absolute.ellipsis {
  display: none;
}

.q-field__control.relative-position.row.no-wrap {
  background: #f5f7f9;
}
.q-field__control.relative-position.row.no-wrap,
.q-field__control.relative-position.row.no-wrap * {
  min-height: unset;
  max-height: 30px;
}
.q-field--auto-height.q-field--labeled .q-field__control-container {
  padding-top: 7px;
}
.q-field__label {
  left: 0;
  font-size: 12px !important;
  top: 5px;
  padding-left: 2px !important;
}
</style>
