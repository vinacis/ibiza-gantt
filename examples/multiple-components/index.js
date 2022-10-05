import GSTC from '../../dist/gstc.wasm.esm.min.js';

const rowsFromDB1 = [
  {
    id: '1',
    label: '(1) Row 1',
  },
  {
    id: '2',
    label: '(1) Row 2',
  },
];

const itemsFromDB1 = [
  {
    id: '1',
    label: '(1) Item 1',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-01-01').startOf('day').add(12, 'hour').valueOf(),
      end: GSTC.api.date('2020-01-02').endOf('day').add(12, 'hour').valueOf(),
    },
  },
  {
    id: '2',
    label: '(1) Item 2',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-02-01').startOf('day').add(12, 'hour').valueOf(),
      end: GSTC.api.date('2020-02-02').endOf('day').add(12, 'hour').valueOf(),
    },
  },
  {
    id: '3',
    label: '(1) Item 3',
    rowId: '2',
    time: {
      start: GSTC.api.date('2020-01-15').startOf('day').add(12, 'hour').valueOf(),
      end: GSTC.api.date('2020-01-20').endOf('day').add(12, 'hour').valueOf(),
    },
  },
];

const columnsFromDB1 = [
  {
    id: 'id',
    label: '(1) ID',
    data: ({ row }) => GSTC.api.sourceID(row.id), // show original id (not internal GSTCID)
    sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)), // sort by id converted to number
    width: 80,
    header: {
      content: '(1) ID',
    },
  },
  {
    id: 'label',
    data: 'label',
    sortable: 'label',
    isHTML: false,
    width: 230,
    header: {
      content: '(1) Label',
    },
  },
];

// Configuration object
const config1 = {
  // for free key for your domain please visit https://gstc.neuronet.io/free-key
  // if you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing

  licenseKey:
    '====BEGIN LICENSE KEY====\nWzVvPXMTi17W2tBoYgAjCRurYwmoilqPzew4PDApYkcrtu42uptbQiJmuZgy6iHyj9ZapfNupQZx0PO2tAMKmShNts7ZWT+N4N+lBkYCOsgc9nZG5ERYe25ixnNWzPnWA2YLj5GnZuKGJjK4EoRWsv3FJUoiBmUhKelLldb1dqCSiSjN4s5UwOtx55RLDEh0rj4GswVk4QaL74lmilmismeV+AxhQVdX8PVxz9bu0VW+wio/lo5QmfawWCeNLhuu0p0lys6pOvJhN/267+MsWhd3RYBvWIp6Mogug5P7nLQdeSdCgxVMVn1HOGZZ5ATTs9WDuWvvM1667MkEvtm2Ow==||U2FsdGVkX1+oPC1pq0yGIQoqTUJ8//k3BU81G6FLMlVijZH1e68HsOW0I2GI4aPzgeDcnoZvNO0MhGGTD+Nu8C1KviY3/a0MQhT+jGNofmA=\nUSUtJc13WJ1GjpEDFNHYeSsh1P7zRE5h+vdMN7KXcKDXAKi4gr3ebWUEHP3QjbcTeC3+mnn786sNVsERPLE67iqmgLdeXPjGIoScidvINw2x975diSP2r3kZkceqcfs48q3I6zXPaK1BJK/Yyin/7zboatOn+Abs+yAFZvDoLgga1nHRrtNgtaK+OXRJnCs519NsZuzqFSI2WuCYzaVkrO1hJqzgDsrxxue/NKmLtncLcWnFwNVZ2SDWdxgk4xGOi0GJmXUv3kn1fRau35FXF6zf0kPbilcWkGgweVpdDnBor1fjwvNLQDJpBT/Rav42SDKO7BRfWgjEKNY+lihQsA==\n====END LICENSE KEY====',

  list: {
    columns: {
      data: GSTC.api.fromArray(columnsFromDB1),
    },
    rows: GSTC.api.fromArray(rowsFromDB1),
  },
  chart: {
    items: GSTC.api.fromArray(itemsFromDB1),
  },
};

// Generate GSTC state from configuration object
const state1 = GSTC.api.stateFromConfig(config1);

// for testing
globalThis.state1 = state1;

// Mount the component
const app1 = GSTC({
  element: document.getElementById('gstc1'),
  state: state1,
});

//for testing
globalThis.gstc1 = app1;

// ------------ SECOND ONE ----------------

const rowsFromDB2 = [
  {
    id: '1',
    label: '(2) Row 1',
  },
  {
    id: '2',
    label: '(2) Row 2',
  },
];

const itemsFromDB2 = [
  {
    id: '1',
    label: '(2) Item 1',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-01-01').startOf('day').add(12, 'hour').valueOf(),
      end: GSTC.api.date('2020-01-02').endOf('day').add(12, 'hour').valueOf(),
    },
  },
  {
    id: '2',
    label: '(2) Item 2',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-02-01').startOf('day').add(12, 'hour').valueOf(),
      end: GSTC.api.date('2020-02-02').endOf('day').add(12, 'hour').valueOf(),
    },
  },
  {
    id: '3',
    label: '(2) Item 3',
    rowId: '2',
    time: {
      start: GSTC.api.date('2020-01-15').startOf('day').add(12, 'hour').valueOf(),
      end: GSTC.api.date('2020-01-20').endOf('day').add(12, 'hour').valueOf(),
    },
  },
];

const columnsFromDB2 = [
  {
    id: 'id',
    label: '(2) ID',
    data: ({ row }) => GSTC.api.sourceID(row.id), // show original id (not internal GSTCID)
    sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)), // sort by id converted to number
    width: 80,
    header: {
      content: '(2) ID',
    },
  },
  {
    id: 'label',
    data: 'label',
    sortable: 'label',
    isHTML: false,
    width: 230,
    header: {
      content: '(2) Label',
    },
  },
];

// Configuration object
const config2 = {
  // for free key for your domain please visit https://gstc.neuronet.io/free-key
  // if you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing

  licenseKey:
    '====BEGIN LICENSE KEY====\nWzVvPXMTi17W2tBoYgAjCRurYwmoilqPzew4PDApYkcrtu42uptbQiJmuZgy6iHyj9ZapfNupQZx0PO2tAMKmShNts7ZWT+N4N+lBkYCOsgc9nZG5ERYe25ixnNWzPnWA2YLj5GnZuKGJjK4EoRWsv3FJUoiBmUhKelLldb1dqCSiSjN4s5UwOtx55RLDEh0rj4GswVk4QaL74lmilmismeV+AxhQVdX8PVxz9bu0VW+wio/lo5QmfawWCeNLhuu0p0lys6pOvJhN/267+MsWhd3RYBvWIp6Mogug5P7nLQdeSdCgxVMVn1HOGZZ5ATTs9WDuWvvM1667MkEvtm2Ow==||U2FsdGVkX1+oPC1pq0yGIQoqTUJ8//k3BU81G6FLMlVijZH1e68HsOW0I2GI4aPzgeDcnoZvNO0MhGGTD+Nu8C1KviY3/a0MQhT+jGNofmA=\nUSUtJc13WJ1GjpEDFNHYeSsh1P7zRE5h+vdMN7KXcKDXAKi4gr3ebWUEHP3QjbcTeC3+mnn786sNVsERPLE67iqmgLdeXPjGIoScidvINw2x975diSP2r3kZkceqcfs48q3I6zXPaK1BJK/Yyin/7zboatOn+Abs+yAFZvDoLgga1nHRrtNgtaK+OXRJnCs519NsZuzqFSI2WuCYzaVkrO1hJqzgDsrxxue/NKmLtncLcWnFwNVZ2SDWdxgk4xGOi0GJmXUv3kn1fRau35FXF6zf0kPbilcWkGgweVpdDnBor1fjwvNLQDJpBT/Rav42SDKO7BRfWgjEKNY+lihQsA==\n====END LICENSE KEY====',

  list: {
    columns: {
      data: GSTC.api.fromArray(columnsFromDB2),
    },
    rows: GSTC.api.fromArray(rowsFromDB2),
  },
  chart: {
    items: GSTC.api.fromArray(itemsFromDB2),
  },
};

// Generate GSTC state from configuration object
const state2 = GSTC.api.stateFromConfig(config2);

// for testing
globalThis.state2 = state2;

// Mount the component
const app2 = GSTC({
  element: document.getElementById('gstc2'),
  state: state2,
});

//for testing
globalThis.gstc2 = app2;
