import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
// import GSTC from '../../dist/gstc.wasm.esm.min.js';
import { Plugin as TimelinePointer } from '../../dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from '../../dist/plugins/selection.esm.min.js';
import { Plugin as ItemMovement } from '../../dist/plugins/item-movement.esm.min.js';
import { Plugin as ItemResizing } from '../../dist/plugins/item-resizing.esm.min.js';

let canChangeRow = true;
let canCollide = true;
document.getElementById('can-change-row').addEventListener('change', function (el) {
  canChangeRow = el.target.checked;
});
document.getElementById('can-collide').addEventListener('change', function (el) {
  canCollide = el.target.checked;
});

function isCollision(item) {
  const allItems = gstc.api.getAllItems();
  for (const itemId in allItems) {
    if (itemId === item.id) continue;
    const currentItem = allItems[itemId];
    if (currentItem.rowId === item.rowId) {
      if (item.time.start >= currentItem.time.start && item.time.start <= currentItem.time.end) return true;
      if (item.time.end >= currentItem.time.start && item.time.end <= currentItem.time.end) return true;
      if (item.time.start <= currentItem.time.start && item.time.end >= currentItem.time.end) return true;
      if (item.time.start >= currentItem.time.start && item.time.end <= currentItem.time.end) return true;
    }
  }
  return false;
}

const resizingPluginConfig = {
  snapToTime: {
    start({ startTime, vido }) {
      const date = vido.api.time.findOrCreateMainDateAtTime(startTime.valueOf());
      return date.leftGlobalDate.startOf('day').add(12, 'hour');
    },
    end({ endTime, vido }) {
      const date = vido.api.time.findOrCreateMainDateAtTime(endTime.valueOf());
      return date.leftGlobalDate.startOf('day').add(12, 'hour');
    },
  },
};

const movementPluginConfig = {
  events: {
    onMove({ items }) {
      // prevent items to change row
      return items.before.map((beforeMovementItem, index) => {
        const afterMovementItem = items.after[index];
        const myItem = GSTC.api.merge({}, afterMovementItem);
        if (!canChangeRow) {
          myItem.rowId = beforeMovementItem.rowId;
        }
        if (!canCollide && isCollision(myItem)) {
          myItem.time = { ...beforeMovementItem.time };
          myItem.rowId = beforeMovementItem.rowId;
        }
        return myItem;
      });
    },
  },
  snapToTime: {
    start({ startTime, vido }) {
      const date = vido.api.time.findOrCreateMainDateAtTime(startTime.valueOf());
      return date.leftGlobalDate.startOf('day').add(12, 'hour');
    },
  },
};

const rowsFromDB = [
  {
    id: '1',
    label: 'Row 1',
  },
  {
    id: '2',
    label: 'Row 2',
  },
];

const itemsFromDB = [
  {
    id: '1',
    label: 'Item 1',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-01-01').startOf('day').add(12, 'hour').valueOf(),
      end: GSTC.api.date('2020-01-02').endOf('day').add(12, 'hour').valueOf(),
    },
  },
  {
    id: '2',
    label: 'Item 2',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-02-01').startOf('day').add(12, 'hour').valueOf(),
      end: GSTC.api.date('2020-02-02').endOf('day').add(12, 'hour').valueOf(),
    },
  },
  {
    id: '3',
    label: 'Item 3',
    rowId: '2',
    time: {
      start: GSTC.api.date('2020-01-15').startOf('day').add(12, 'hour').valueOf(),
      end: GSTC.api.date('2020-01-20').endOf('day').add(12, 'hour').valueOf(),
    },
  },
];

const columnsFromDB = [
  {
    id: 'id',
    label: 'ID',
    data: ({ row }) => GSTC.api.sourceID(row.id), // show original id (not internal GSTCID)
    sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)), // sort by id converted to number
    width: 80,
    header: {
      content: 'ID',
    },
  },
  {
    id: 'label',
    data: 'label',
    sortable: 'label',
    isHTML: false,
    width: 230,
    header: {
      content: 'Label',
    },
  },
];

// Configuration object
const config = {
  // for free key for your domain please visit https://gstc.neuronet.io/free-key
  // if you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing

  licenseKey:
    '====BEGIN LICENSE KEY====\nWzVvPXMTi17W2tBoYgAjCRurYwmoilqPzew4PDApYkcrtu42uptbQiJmuZgy6iHyj9ZapfNupQZx0PO2tAMKmShNts7ZWT+N4N+lBkYCOsgc9nZG5ERYe25ixnNWzPnWA2YLj5GnZuKGJjK4EoRWsv3FJUoiBmUhKelLldb1dqCSiSjN4s5UwOtx55RLDEh0rj4GswVk4QaL74lmilmismeV+AxhQVdX8PVxz9bu0VW+wio/lo5QmfawWCeNLhuu0p0lys6pOvJhN/267+MsWhd3RYBvWIp6Mogug5P7nLQdeSdCgxVMVn1HOGZZ5ATTs9WDuWvvM1667MkEvtm2Ow==||U2FsdGVkX1+oPC1pq0yGIQoqTUJ8//k3BU81G6FLMlVijZH1e68HsOW0I2GI4aPzgeDcnoZvNO0MhGGTD+Nu8C1KviY3/a0MQhT+jGNofmA=\nUSUtJc13WJ1GjpEDFNHYeSsh1P7zRE5h+vdMN7KXcKDXAKi4gr3ebWUEHP3QjbcTeC3+mnn786sNVsERPLE67iqmgLdeXPjGIoScidvINw2x975diSP2r3kZkceqcfs48q3I6zXPaK1BJK/Yyin/7zboatOn+Abs+yAFZvDoLgga1nHRrtNgtaK+OXRJnCs519NsZuzqFSI2WuCYzaVkrO1hJqzgDsrxxue/NKmLtncLcWnFwNVZ2SDWdxgk4xGOi0GJmXUv3kn1fRau35FXF6zf0kPbilcWkGgweVpdDnBor1fjwvNLQDJpBT/Rav42SDKO7BRfWgjEKNY+lihQsA==\n====END LICENSE KEY====',

  plugins: [
    TimelinePointer({}), // timeline pointer must go first before selection, resizing and movement
    Selection(),
    ItemResizing(resizingPluginConfig), // resizing must go before movement
    ItemMovement(movementPluginConfig),
  ],
  list: {
    columns: {
      data: GSTC.api.fromArray(columnsFromDB),
    },
    rows: GSTC.api.fromArray(rowsFromDB),
  },
  chart: {
    items: GSTC.api.fromArray(itemsFromDB),
  },
};

// Generate GSTC state from configuration object
const state = GSTC.api.stateFromConfig(config);

// for testing
globalThis.state = state;

// Mount the component
const app = GSTC({
  element: document.getElementById('gstc'),
  state,
});

//for testing
globalThis.gstc = app;
