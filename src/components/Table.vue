<script setup>
import Loading from "@/components/Loading.vue";

const props = defineProps({
  columns: {
    type: Array,
    default: []
  },
  content: {
    type: Array,
    default: []
  },
  onCellClick: {
    type: Object,
    default: {}
  },
  formatCellText: {
    type: Object,
    default: {}
  },
  cellStyle: {
    type: Object,
    default: {}
  },
  actions: {
    type: Array,
    default: []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: "700px"
  }
});

function traverseObjectFromString(o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1");
  s = s.replace(/^\./, "");

  const a = s.split(".");

  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }

  return o;
}

function getCellComponent(column, row) {
  const component = props.formatCellText[column.accessor](
    traverseObjectFromString(row, column.accessor),
    row
  );

  if (!component.__v_isVNode) return component;

  const tag = component.type;
  let properties = "";

  for (const key in component.props) properties += `${key}=${component.props[key]} `;

  return `<${tag} ${properties}></${tag}>`;
}

function getCellStyle(column, row) {
  return props.cellStyle[column.accessor]
    ? props.cellStyle[column.accessor](row[column.accessor], row) || {}
    : {};
}

function getCellProperties(column, row) {
  return {
    ...props.onCellClick[column.accessor],
    onClick: () => {
      return props.onCellClick[column.accessor] ? props.onCellClick[column.accessor](row) : null;
    },
    class: "clickable"
  };
}
</script>

<template>
  <div v-if="props.isLoading"><Loading size="40px" /></div>

  <div v-if="!props.isLoading" class="table-container" v-bind:style="{ maxHeight: props.height }">
    <table>
      <thead>
        <tr>
          <th v-for="(column, i) in props.columns" :key="i">{{ column.title }}</th>

          <th v-for="(action, i) in props.actions" :key="i + props.columns.length">
            {{ action.title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, i) in props.content" :key="row._id">
          <td
            v-for="(column, k) in props.columns"
            :key="k"
            v-bind:style="getCellStyle(column, row)"
            v-bind="getCellProperties(column, row)"
          >
            <div
              v-if="props.formatCellText[column.accessor]"
              v-html="getCellComponent(column, row)"
            ></div>
            <span v-else>{{ traverseObjectFromString(row, column.accessor) }}</span>
          </td>

          <td
            v-for="(action, k) in props.actions"
            @click="action.onClick(row)"
            :key="k + props.columns.length"
          >
            {{ action.component }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
div.table-container {
  width: 100%;
  overflow: auto;
  border-radius: 9px;
  position: relative;
  z-index: 1;
}

table {
  width: 100%;
}

table tr {
  border-bottom: 1px solid #eee;
}

table tr:nth-child(even) {
  background-color: #f7f7f7;
}

table tr:nth-child(odd) {
  background-color: #ffffff;
}

table td,
table th {
  vertical-align: middle;
  padding: 20px 0;
  text-align: center;
}

table td.clickable,
table th.clickable {
  cursor: pointer;
}

table td.clickable:hover,
table th.clickable:hover {
  text-decoration: underline;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.05) 2%,
    rgba(0, 0, 0, 0.05) 98%,
    rgba(0, 0, 0, 0) 100%
  );
}

thead {
  position: sticky;
  top: -0.5px;

  font-weight: bold;
  text-transform: uppercase;
  border-top: 1px solid #eee;
}

thead tr:nth-child(odd) {
  background-color: slateblue;
  color: #fff;
}

tbody tr:hover {
  filter: brightness(0.92);
}

table img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
