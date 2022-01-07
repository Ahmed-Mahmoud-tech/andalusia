<template>
  <div class="sec-title">
    <q-icon size="1.5em" name="file_open" />
    <h3>products details</h3>
  </div>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:top-right>
        <div class="tableheader">
          <div class="flexrow">
            <span> Product </span> <span> on-Hand </span> <span> Type </span>
          </div>
        </div>
        <div class="inputscont">
          <div class="flexrow" ref="inputscont">
            <input
              type="text"
              @keyup="
                onRequest(
                  { pagination, filter: $event.target.value },
                  'product'
                )
              "
              @focus="resetInputs"
            />
            <q-icon size="1.5em" name="search" />
            <input
              type="text"
              @keyup="
                onRequest({ pagination, filter: $event.target.value }, 'onHand')
              "
              @focus="resetInputs"
            />
            <q-icon size="1.5em" name="search" />

            <input
              type="text"
              @keyup="
                onRequest({ pagination, filter: $event.target.value }, 'type')
              "
              @focus="resetInputs"
            />
            <q-icon size="1.5em" name="search" />
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted, watch, onUpdated, computed } from "vue";
import { useStore } from "vuex";

const columns = [
  {
    name: "product",
    label: "product",
    field: "product",
    align: "left",

    // format: (val) => `${val}`,
    // sortable: true,
  },
  {
    name: "onHand",
    label: "onHand",
    field: "onHand",
    align: "left",
  },
  {
    name: "type",
    label: "type",
    field: "type",
    align: "left",
  },
];

export default {
  props: ["finalData", "realUpdate"],
  setup(props) {
    const store = useStore();
    const rows = ref([]);
    const realUpdateHere = ref(1);
    const filter = ref("");
    const loading = ref(false);
    const inputscont = ref(null);
    const pagination = ref({
      sortBy: "product",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 10,
    });

    const tableData = ref([]);
    let originalRows = tableData.value;
    let pageNumber = ref(0);

    const resetInputs = (e) => {
      let childArray = inputscont.value.children;
      [...childArray].map((child) => {
        child.value = "";
      });
    };

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    const fetchFromServer = (
      startRow,
      count,
      filter,
      sortBy = "product",
      descending = false,
      type
    ) => {
      const data = filter
        ? originalRows.filter((row) => {
            return row[type].toString().includes(filter);
          })
        : originalRows.slice();

      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === "product"
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }

      if (count) {
        return data.slice(startRow, startRow + count);
      } else {
        return data.slice(0, 5);
      }
      return data;
    };

    // emulate 'SELECT count(*) FROM ...WHERE...'
    function getRowsNumberCount(filter) {
      if (!filter) {
        return originalRows.length;
      }
      let count = 0;
      originalRows.forEach((treat) => {
        if (treat.product.includes(filter)) {
          ++count;
        }
      });
      return count;
    }

    function onRequest(props, type = "product") {
      let { page, rowsPerPage, sortBy, descending } = props.pagination;
      let filter;
      if (typeof props.filter == "string") {
        filter = props.filter;
      } else {
        filter = "";
      }
      loading.value = true;

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        pagination.value.rowsNumber = getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        let fetchCount =
          rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

        // calculate starting row of data
        let startRow = (page - 1) * rowsPerPage;
        if (!page) {
          page = 1;
          startRow = 0;
          (fetchCount = 5), (filter = "");
          rowsPerPage = 5;
        }
        pageNumber.value = page;

        // fetch data from "server"
        const returnedData = fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending,
          type
        );

        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData);

        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;

        // ...and turn of loading indicator
        loading.value = false;
      }, 500);
    }

    onUpdated(() => {
      if (props.realUpdate == realUpdateHere.value && props.realUpdate != 0) {
        originalRows = props.finalData;
        // setTimeout(() => {
        onRequest({ pagination, filter });
        // }, 1000);
        realUpdateHere.value++;
      }
    });

    onMounted(() => {
      // get initial data from server (1st page)
      onRequest({
        pagination: pagination.value,
        filter: undefined,
      });
    });

    watch(
      () => props.finalData,
      (first, second) => {
        console.log(
          "Watch props.selected function called with args:",
          first,
          second
        );
      }
    );
    watch(
      () => props.finalData,
      (first, second) => {
        console.log("Watch props.selected function called with args:", first);
        originalRows.value = first;
      }
    );

    return {
      filter,
      loading,
      pagination,
      columns,
      rows,
      tableData,
      fetchFromServer,
      onRequest,
      pageNumber,
      inputscont,
      resetInputs,
    };
  },
};
</script>

<style lang="scss">
.q-table__bottom .q-table__separator {
  display: none;
}

.q-table__bottom.row.items-center.justify-end {
  justify-content: space-between;
  flex-direction: row-reverse;
}

.q-table__control:nth-child(2) > span.q-table__bottom-item,
i.notranslate.material-icons.q-icon.q-table__bottom-nodata-icon,
thead,
.q-table__title {
  display: none;
}

.q-table__control:nth-child(3) span.q-table__bottom-item {
  position: absolute;
  right: 20px;
}

.q-table__control:nth-child(3) {
  width: 100%;
}

.q-table__control:nth-child(2) {
  position: absolute;
  right: 25%;
}

.q-table__control:nth-child(3) span.q-table__bottom-item:after {
  // content: " items";
  content: v-bind(pageNumber);
}

.q-table__bottom.row.items-center.q-table__bottom--nodata::after {
  color: black;
  content: "Select Wharehouse and Product";
  position: absolute;
  top: 105%;
  left: 50%;
  transform: translateX(-50%);
}
.q-table__bottom.row.items-center.q-table__bottom--nodata {
  color: transparent;
  background-color: transparent;
  text-align: center;
  width: 50%;
  min-height: 100px;
  background-image: url("../../assets/noDataFoundGreen.svg");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 55px auto;
  position: relative;
  border-top: 0;
}

.q-table__top {
  padding: 0;
}

.q-table__top .q-table__control {
  flex-direction: column;
}

.q-table__top .q-table__control:last-of-type > div {
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: space-between;
}

.flexrow {
  display: flex;
  justify-content: space-between;
  padding: 0px 5%;
  text-align: left;
}

.flexrow {
  display: flex;
  justify-content: space-between;
  padding: 0px 1.5%;
  text-align: left;
  width: 100%;
}
td {
  width: 30%;
  height: 20px !important;
}
.flexrow input[type="text"] {
  width: 28%;
  height: 25px;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  padding: 5px;
  z-index: 2;
  background: #ffffffb8;
  outline: none;
}

.flexrow span {
  width: 32%;
}
.flexrow i {
  top: 2px;
  position: relative;
  right: 4.5%;
  color: #020202;
  z-index: 1;
}

.inputscont {
  background: #f5f7f9;
  padding-bottom: 8px !important;
}

.q-table__bottom {
  min-height: 33px;
  padding: 4px 14px 4px 16px;
  font-size: 10px;
  background: #f5f7f9;
}

.q-table__bottom.row.items-center.justify-end
  .q-field__control.relative-position.row.no-wrap {
  background: #f5f7f9;
}
.q-table__bottom.row.items-center.justify-end
  .q-field__append.q-field__marginal.row.no-wrap.items-center.q-anchor--skip {
  background: unset;
}

.q-table__bottom.row.items-center .q-field__native.row.items-center {
  padding-top: 3px;
}

.q-table__bottom.row.items-center.justify-end
  .q-field__control.relative-position.row.no-wrap.text-grey-8 {
  font-size: 14px;
  border: 1px solid;
  height: 24px;
  padding-left: 6px;
  background-color: white;
  border-color: #d7e4f1;
}

.q-table__container.q-table--horizontal-separator.column.no-wrap.q-table__card.q-table--no-wrap {
  margin-top: 30px;
}
</style>
