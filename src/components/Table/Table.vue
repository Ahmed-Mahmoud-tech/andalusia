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
        <input
          type="text"
          placeholder="type"
          @keyup="
            onRequest({ pagination, filter: $event.target.value }, 'type')
          "
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted, watch, onUpdated } from "vue";
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
        return originalRows.value.length;
      }
      let count = 0;
      originalRows.value.forEach((treat) => {
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
        setTimeout(() => {
          onRequest({ pagination, filter });
        }, 1000);
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
  // content: " items";
  content: v-bind(pageNumber);
}
</style>
