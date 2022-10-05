import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
// import GSTC from '../../dist/gstc.wasm.esm.min.js';
import { Plugin as TimelinePointer } from '../../dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from '../../dist/plugins/selection.esm.min.js';
import { Plugin as ItemResizing } from '../../dist/plugins/item-resizing.esm.min.js';

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
    label: 'Snap to specified time',
    snap: true,
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-01-01').startOf('day').valueOf(),
      end: GSTC.api.date('2020-01-02').endOf('day').valueOf(),
    },
  },
  {
    id: '2',
    label: 'Item 2',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-02-01').startOf('day').valueOf(),
      end: GSTC.api.date('2020-02-02').endOf('day').valueOf(),
    },
  },
  {
    id: '3',
    label: 'Only 3 days length',
    resizableLength: 3,
    resizablePeriod: 'day',
    rowId: '2',
    time: {
      start: GSTC.api.date('2020-01-15').startOf('day').valueOf(),
      end: GSTC.api.date('2020-01-17').endOf('day').valueOf(),
    },
  },
  {
    id: '4',
    label: 'Not resizable',
    resizable: false,
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-01-05').startOf('day').valueOf(),
      end: GSTC.api.date('2020-01-07').endOf('day').valueOf(),
    },
  },
  {
    id: '5',
    label: 'From 03 to 09 only',
    resizableFrom: GSTC.api.date('2020-01-03').startOf('day').valueOf(),
    resizableTo: GSTC.api.date('2020-01-09').endOf('day').valueOf(),
    rowId: '2',
    time: {
      start: GSTC.api.date('2020-01-05').startOf('day').valueOf(),
      end: GSTC.api.date('2020-01-07').endOf('day').valueOf(),
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

function isItemResizable(item) {
  if (typeof item.resizable === 'boolean') return item.resizable;
  return true;
}

function limitTime(item, oldItem) {
  if (item.resizableFrom && item.time.start < item.resizableFrom) {
    item.time.start = item.resizableFrom;
  }
  if (item.resizableTo && item.time.end > item.resizableTo) {
    item.time.end = item.resizableTo;
  }
  if (item.resizableLength && item.resizablePeriod) {
    const actualDiff = GSTC.api.date(item.time.end).diff(item.time.start, item.resizablePeriod, true);
    if (actualDiff > item.resizableLength) {
      const resizingFromStart = item.time.end === oldItem.time.end;
      if (resizingFromStart) {
        item.time.start = GSTC.api
          .date(item.time.end)
          .subtract(item.resizableLength, item.resizablePeriod) // -1 here because end of day - 3 days -> startOf day = almost 4 days
          .valueOf();
      } else {
        item.time.end = GSTC.api.date(item.time.start).add(item.resizableLength, item.resizablePeriod).valueOf();
      }
    }
  }
  return item;
}

function snapToTimeSeparately(item, vido) {
  if (!item.snap) return item;
  const startDate = vido.api.time.findOrCreateMainDateAtTime(item.time.start);
  const start = startDate.leftGlobalDate.startOf('day').add(10, 'hour');
  const endDate = vido.api.time.findOrCreateMainDateAtTime(item.time.end);
  const end = endDate.leftGlobalDate.startOf('day').add(18, 'hour');
  item.time.start = start.valueOf();
  item.time.end = end.valueOf();
  // to change other properties than time we need to update item
  // because resizing-items plugin only works on time property
  state.update(
    `config.chart.items.${item.id}.label`,
    `From ${start.format('YYYY-MM-DD HH:mm')} to ${end.format('YYYY-MM-DD HH:mm')}`
  );
  return item;
}

// Generate GSTC state from configuration object
const state = GSTC.api.stateFromConfig({
  // for free key for your domain please visit https://gstc.neuronet.io/free-key
  // if you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing

  licenseKey:
    '====BEGIN LICENSE KEY====\nWzVvPXMTi17W2tBoYgAjCRurYwmoilqPzew4PDApYkcrtu42uptbQiJmuZgy6iHyj9ZapfNupQZx0PO2tAMKmShNts7ZWT+N4N+lBkYCOsgc9nZG5ERYe25ixnNWzPnWA2YLj5GnZuKGJjK4EoRWsv3FJUoiBmUhKelLldb1dqCSiSjN4s5UwOtx55RLDEh0rj4GswVk4QaL74lmilmismeV+AxhQVdX8PVxz9bu0VW+wio/lo5QmfawWCeNLhuu0p0lys6pOvJhN/267+MsWhd3RYBvWIp6Mogug5P7nLQdeSdCgxVMVn1HOGZZ5ATTs9WDuWvvM1667MkEvtm2Ow==||U2FsdGVkX1+oPC1pq0yGIQoqTUJ8//k3BU81G6FLMlVijZH1e68HsOW0I2GI4aPzgeDcnoZvNO0MhGGTD+Nu8C1KviY3/a0MQhT+jGNofmA=\nUSUtJc13WJ1GjpEDFNHYeSsh1P7zRE5h+vdMN7KXcKDXAKi4gr3ebWUEHP3QjbcTeC3+mnn786sNVsERPLE67iqmgLdeXPjGIoScidvINw2x975diSP2r3kZkceqcfs48q3I6zXPaK1BJK/Yyin/7zboatOn+Abs+yAFZvDoLgga1nHRrtNgtaK+OXRJnCs519NsZuzqFSI2WuCYzaVkrO1hJqzgDsrxxue/NKmLtncLcWnFwNVZ2SDWdxgk4xGOi0GJmXUv3kn1fRau35FXF6zf0kPbilcWkGgweVpdDnBor1fjwvNLQDJpBT/Rav42SDKO7BRfWgjEKNY+lihQsA==\n====END LICENSE KEY====',
  innerHeight: 100,
  plugins: [
    TimelinePointer({}), // timeline pointer must go first before selection and resizing
    Selection({ cells: false }),
    ItemResizing({
      events: {
        onStart({ items }) {
          console.log('Resizing start', items.after);
          return items.after;
        },
        onResize({ items, vido }) {
          const filtered = items.after
            .map((item, index) => {
              if (!isItemResizable(item)) {
                return items.before[index];
              }
              return item;
            })
            .map((item, index) => limitTime(item, items.before[index]))
            .map((item) => snapToTimeSeparately(item, vido));
          return filtered;
        },
        onEnd({ items }) {
          console.log('Resizing done', items.after);
          return items.after;
        },
      },
      snapToTime: {
        start({ startTime }) {
          // reset default period snapping behavior
          // if you want custom snapping for all items out of the box - you can do it here
          // like: return startTime.startOf('day').add(8,'hour');
          return startTime;
        },
        end({ endTime }) {
          // reset default period snapping behavior
          return endTime;
        },
      },
    }),
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
});

// for testing
globalThis.state = state;

// Mount the component
const app = GSTC({
  element: document.getElementById('gstc'),
  state,
});

//for testing
globalThis.gstc = app;
