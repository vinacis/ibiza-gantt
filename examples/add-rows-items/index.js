import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
// import GSTC from '../../dist/gstc.wasm.esm.min.js';
import { Plugin as TimelinePointer } from '../../dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from '../../dist/plugins/selection.esm.min.js';
import { Plugin as ItemMovement } from '../../dist/plugins/item-movement.esm.min.js';
import { Plugin as ItemResizing } from '../../dist/plugins/item-resizing.esm.min.js';

const iterations = 100;

const startDate = GSTC.api.date().subtract(5, 'month').valueOf();

let gstc, state;

let lastItemId = 0;
let lastRowId = 0;

function generateNewItems() {
  let rowsIds = [];
  if (gstc) {
    const rows = gstc.api.getAllRows();
    rowsIds = Object.keys(rows);
  } else {
    for (let i = 0; i < iterations; i++) {
      rowsIds.push(GSTC.api.GSTCID(String(i)));
    }
  }

  /**
   * @type {import("../../dist/gstc").Items}
   */
  const items = {};
  for (let i = 0, len = rowsIds.length; i < len; i++) {
    let rowId = rowsIds[i];
    let id = GSTC.api.GSTCID(String(lastItemId++));
    let startDayjs = GSTC.api
      .date(startDate)
      .startOf('day')
      .add(Math.floor(Math.random() * 365 * 2), 'day');
    items[id] = {
      id,
      label: 'item id ' + GSTC.api.sourceID(id),
      progress: Math.round(Math.random() * 100),
      time: {
        start: startDayjs.startOf('day').valueOf(),
        end: startDayjs
          .clone()
          .add(Math.floor(Math.random() * 2) + 4, 'day')
          .endOf('day')
          .valueOf(),
      },
      rowId,
    };
  }
  return items;
}

function generateNewItem() {
  let rowId = GSTC.api.GSTCID(String(lastRowId - 1));
  let id = GSTC.api.GSTCID(String(lastItemId++));
  let startDayjs = GSTC.api
    .date(startDate)
    .startOf('day')
    .add(Math.floor(Math.random() * 365 * 2), 'day');
  return {
    id,
    label: 'item id ' + GSTC.api.sourceID(id),
    progress: Math.round(Math.random() * 100),
    time: {
      start: startDayjs.startOf('day').valueOf(),
      end: startDayjs
        .clone()
        .add(Math.floor(Math.random() * 20) + 4, 'day')
        .endOf('day')
        .valueOf(),
    },
    rowId,
  };
}

function generateNewRows() {
  /**
   * @type {import("../../dist/gstc").Rows}
   */
  const rows = {};
  for (let i = 0; i < iterations; i++) {
    const id = GSTC.api.GSTCID(String(lastRowId++));
    rows[id] = {
      id,
      label: `Row ${lastRowId - 1}`,
      expanded: false,
    };
  }
  return rows;
}

function generateNewRow() {
  return {
    id: GSTC.api.GSTCID(String(lastRowId++)),
    label: `Row ${lastRowId}`,
  };
}

const columns = {
  data: {
    [GSTC.api.GSTCID('id')]: {
      id: GSTC.api.GSTCID('id'),
      data: ({ row }) => GSTC.api.sourceID(row.id),
      width: 80,
      sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)),
      header: {
        content: 'ID',
      },
      resizer: false,
    },
    [GSTC.api.GSTCID('label')]: {
      id: GSTC.api.GSTCID('label'),
      data: 'label',
      sortable: 'label',
      expander: true,
      isHTML: false,
      width: 230,
      header: {
        content: 'Label',
      },
    },
  },
};

/**
 * @type {import("../../dist/gstc").Config}
 */
const config = {
  licenseKey:
    '====BEGIN LICENSE KEY====\nWzVvPXMTi17W2tBoYgAjCRurYwmoilqPzew4PDApYkcrtu42uptbQiJmuZgy6iHyj9ZapfNupQZx0PO2tAMKmShNts7ZWT+N4N+lBkYCOsgc9nZG5ERYe25ixnNWzPnWA2YLj5GnZuKGJjK4EoRWsv3FJUoiBmUhKelLldb1dqCSiSjN4s5UwOtx55RLDEh0rj4GswVk4QaL74lmilmismeV+AxhQVdX8PVxz9bu0VW+wio/lo5QmfawWCeNLhuu0p0lys6pOvJhN/267+MsWhd3RYBvWIp6Mogug5P7nLQdeSdCgxVMVn1HOGZZ5ATTs9WDuWvvM1667MkEvtm2Ow==||U2FsdGVkX1+oPC1pq0yGIQoqTUJ8//k3BU81G6FLMlVijZH1e68HsOW0I2GI4aPzgeDcnoZvNO0MhGGTD+Nu8C1KviY3/a0MQhT+jGNofmA=\nUSUtJc13WJ1GjpEDFNHYeSsh1P7zRE5h+vdMN7KXcKDXAKi4gr3ebWUEHP3QjbcTeC3+mnn786sNVsERPLE67iqmgLdeXPjGIoScidvINw2x975diSP2r3kZkceqcfs48q3I6zXPaK1BJK/Yyin/7zboatOn+Abs+yAFZvDoLgga1nHRrtNgtaK+OXRJnCs519NsZuzqFSI2WuCYzaVkrO1hJqzgDsrxxue/NKmLtncLcWnFwNVZ2SDWdxgk4xGOi0GJmXUv3kn1fRau35FXF6zf0kPbilcWkGgweVpdDnBor1fjwvNLQDJpBT/Rav42SDKO7BRfWgjEKNY+lihQsA==\n====END LICENSE KEY====',
  plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
  list: {
    rows: generateNewRows(),
    columns,
  },
  chart: {
    items: generateNewItems(),
  },
  scroll: {
    vertical: { precise: false },
  },
};

state = GSTC.api.stateFromConfig(config);
const element = document.getElementById('gstc');

element.addEventListener('gstc-loaded', () => {
  gstc.api.scrollToTime(gstc.api.time.date().valueOf()); // eslint-disable-line
});

gstc = GSTC({
  element,
  state,
});

function setNewItems() {
  state.update('config.chart.items', () => {
    return generateNewItems();
  });
}
globalThis.setNewItems = setNewItems;

function addNewItem() {
  const item = generateNewItem();
  console.log('new item', item);
  state.update(`config.chart.items.${item.id}`, item);
}
globalThis.addNewItem = addNewItem;

function setNewRows() {
  // you cannot create new rows if existing items are assigned to current ones
  // first of all you need to clear items
  state.update('config.chart.items', {});
  state.update('config.list.rows', () => {
    return generateNewRows();
  });
  // you can also update whole config like state.update('config',(config)=>{ config.list.rows = newRows; config.chart.items=newItems; return config; })
}

globalThis.setNewRows = setNewRows;

function addNewRow() {
  const row = generateNewRow();
  state.update(`config.list.rows.${row.id}`, row);
}

globalThis.addNewRow = addNewRow;

document.getElementById('add-items').addEventListener('click', setNewItems);
document.getElementById('add-item').addEventListener('click', addNewItem);
document.getElementById('add-rows').addEventListener('click', setNewRows);
document.getElementById('add-row').addEventListener('click', addNewRow);

//@ts-ignore
globalThis.state = state;
//@ts-ignore
globalThis.gstc = gstc;
