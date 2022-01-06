<template>
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
        <input
          type="text"
          placeholder="product"
          @keyup="
            onRequest({ pagination, filter: $event.target.value }, 'product')
          "
        />
        <input
          type="text"
          placeholder="onHand"
          @keyup="
            onRequest({ pagination, filter: $event.target.value }, 'onHand')
          "
        />
        <!-- 
        <input
          type="text"
          placeholder="iron"
          @keyup="
            onRequest({ pagination, filter: $event.target.value }, 'type')
          "
        /> -->
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
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
  // {
  //   name: "type",
  //   label: "type",
  //   field: "type",
  //   align: "left",
  // },
];

const originalRowsold = [
  {
    id: 1,
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    id: 2,
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    id: 3,
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "9%",
    iron: "7%",
  },
  {
    id: 4,
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    id: 5,
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    id: 6,
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
];

export default {
  setup() {
    const store = useStore();
    const rows = ref([]);
    const tableData = ref(store.state.WHs["WH_one"]["type-one-1"]);

    const filter = ref("");
    const loading = ref(false);
    const pagination = ref({
      sortBy: "product",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 10,
    });

    let originalRows = tableData.value;

    console.log(originalRows);

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    const fetchFromServer = (
      startRow,
      count,
      filter,
      sortBy,
      descending,
      type
    ) => {
      console.log();
      const data = filter
        ? originalRows.filter((row) => row[type].toString().includes(filter))
        : originalRows.slice();

      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === "desc"
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }

      return data.slice(startRow, startRow + count);
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
      // console.log(props);
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        pagination.value.rowsNumber = getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

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

    onMounted(() => {
      // get initial data from server (1st page)
      onRequest({
        pagination: pagination.value,
        filter: undefined,
      });
    });

    return {
      filter,
      loading,
      pagination,
      columns,
      rows,
      tableData,
      fetchFromServer,
      onRequest,
    };
  },
};
</script>

<style>
/* .q-table__control:nth-child(2),
span.q-table__bottom-item {
  display: none !important;
}

.q-table__bottom .q-table__control {
  width: 100%;
} */

.q-table__bottom .q-table__separator {
  display: none;
}

.q-table__bottom.row.items-center.justify-end {
  justify-content: space-between;
  flex-direction: row-reverse;
}

.q-table__control:nth-child(2) > span.q-table__bottom-item {
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
  content: " items";
}
</style>
