import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
// import GSTC from '../../dist/gstc.wasm.esm.min.js';
import { Plugin as TimelinePointer } from '../../dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from '../../dist/plugins/selection.esm.min.js';
import { Plugin as ItemMovement } from '../../dist/plugins/item-movement.esm.min.js';
import { Plugin as ItemResizing } from '../../dist/plugins/item-resizing.esm.min.js';

const GSTCID = GSTC.api.GSTCID;
const iterations = 50;
const addDays = 30;

const rows = {};
for (let i = 0; i < iterations; i++) {
  const id = GSTCID(String(i));
  rows[id] = {
    id,
    name: `John ${i}`,
    surname: `Doe ${i}`,
    progress: Math.floor(Math.random() * 100),
  };
}

const colors = ['#E74C3C', '#DA3C78', '#7E349D', '#0077C0', '#07ABA0', '#0EAC51', '#F1892D'];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const startDate = GSTC.api.date('2020-02-01');
const startTime = startDate.valueOf();
const endDate = GSTC.api.date('2020-03-31').endOf('day');

const items = {};
for (let i = 0; i < iterations; i++) {
  let rowId = GSTCID(i);
  let id = GSTCID(i);
  let startDayjs = GSTC.api
    .date(startTime)
    .startOf('day')
    .add(Math.floor(Math.random() * addDays), 'day');
  let end = startDayjs
    .clone()
    .add(Math.floor(Math.random() * 20) + 4, 'day')
    .endOf('day')
    .valueOf();
  if (end > endDate.valueOf()) end = endDate.valueOf();
  items[id] = {
    id,
    label: `John Doe ${i}`,
    progress: Math.round(Math.random() * 100),
    style: { background: getRandomColor() },
    time: {
      start: startDayjs.startOf('day').valueOf(),
      end,
    },
    rowId,
  };
}

const columnsFromDB = [
  {
    id: 'id',
    label: 'ID',
    hidden: false,
    data: ({ row }) => GSTC.api.sourceID(row.id), // show original id (not internal GSTCID)
    sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)), // sort by id converted to number
    width: 80,
    header: {
      content: 'ID',
    },
  },
  {
    id: 'name',
    data: 'name',
    sortable: 'name',
    width: 230,
    hidden: false,
    header: {
      content: 'Name',
    },
  },
  {
    id: 'surname',
    data: 'surname',
    sortable: 'surname',
    width: 230,
    hidden: false,
    header: {
      content: 'Surname',
    },
  },
  {
    id: 'progress',
    data: 'progress',
    sortable: 'progress',
    hidden: false,
    width: 50,
    header: {
      content: '%',
    },
  },
];

document.getElementById('id').addEventListener('change', (ev) => {
  state.update(`config.list.columns.data.gstcid-id.hidden`, !ev.target.checked);
});

document.getElementById('name').addEventListener('change', (ev) => {
  state.update(`config.list.columns.data.gstcid-name.hidden`, !ev.target.checked);
});

document.getElementById('surname').addEventListener('change', (ev) => {
  state.update(`config.list.columns.data.gstcid-surname.hidden`, !ev.target.checked);
});

document.getElementById('progress').addEventListener('change', (ev) => {
  state.update(`config.list.columns.data.gstcid-progress.hidden`, !ev.target.checked);
});

// Configuration object
const config = {
  // for free key for your domain please visit https://gstc.neuronet.io/free-key
  // if you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing

  licenseKey:
    '====BEGIN LICENSE KEY====\nWzVvPXMTi17W2tBoYgAjCRurYwmoilqPzew4PDApYkcrtu42uptbQiJmuZgy6iHyj9ZapfNupQZx0PO2tAMKmShNts7ZWT+N4N+lBkYCOsgc9nZG5ERYe25ixnNWzPnWA2YLj5GnZuKGJjK4EoRWsv3FJUoiBmUhKelLldb1dqCSiSjN4s5UwOtx55RLDEh0rj4GswVk4QaL74lmilmismeV+AxhQVdX8PVxz9bu0VW+wio/lo5QmfawWCeNLhuu0p0lys6pOvJhN/267+MsWhd3RYBvWIp6Mogug5P7nLQdeSdCgxVMVn1HOGZZ5ATTs9WDuWvvM1667MkEvtm2Ow==||U2FsdGVkX1+oPC1pq0yGIQoqTUJ8//k3BU81G6FLMlVijZH1e68HsOW0I2GI4aPzgeDcnoZvNO0MhGGTD+Nu8C1KviY3/a0MQhT+jGNofmA=\nUSUtJc13WJ1GjpEDFNHYeSsh1P7zRE5h+vdMN7KXcKDXAKi4gr3ebWUEHP3QjbcTeC3+mnn786sNVsERPLE67iqmgLdeXPjGIoScidvINw2x975diSP2r3kZkceqcfs48q3I6zXPaK1BJK/Yyin/7zboatOn+Abs+yAFZvDoLgga1nHRrtNgtaK+OXRJnCs519NsZuzqFSI2WuCYzaVkrO1hJqzgDsrxxue/NKmLtncLcWnFwNVZ2SDWdxgk4xGOi0GJmXUv3kn1fRau35FXF6zf0kPbilcWkGgweVpdDnBor1fjwvNLQDJpBT/Rav42SDKO7BRfWgjEKNY+lihQsA==\n====END LICENSE KEY====',

  plugins: [
    TimelinePointer(), // timeline pointer must go first before selection, resizing and movement
    Selection(),
    ItemResizing(), // resizing must go before movement
    ItemMovement(),
  ],
  list: {
    columns: {
      data: GSTC.api.fromArray(columnsFromDB),
    },
    rows,
    toggle: {
      display: false,
    },
  },
  chart: {
    items,
  },
  scroll: {
    horizontal: {
      precise: true,
    },
    vertical: {
      precise: true,
    },
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
