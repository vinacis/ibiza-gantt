import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
// import GSTC from '../../dist/gstc.wasm.esm.min.js';

// @ts-ignore
GSTC.api.dayjs.extend(globalThis.dayjs_plugin_weekOfYear);
//@ts-ignore
GSTC.api.dayjs.extend(globalThis.dayjs_plugin_advancedFormat);

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
      start: GSTC.api.date('2020-01-01 00:00:00').valueOf(),
      end: GSTC.api.date('2020-01-01 00:00:00').endOf('hour').valueOf(),
    },
  },
  {
    id: '2',
    label: 'Item 2',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-01-01 08:00:00').startOf('hour').valueOf(),
      end: GSTC.api.date('2020-01-01 10:00:00').endOf('hour').valueOf(),
    },
  },
];

const columnsFromDB = [
  {
    id: 'id',
    label: 'ID',
    data: ({ row }) => Number(GSTC.api.sourceID(row.id)), // show original id
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
    width: 300,
    header: {
      content: 'Label',
    },
  },
];

const hours = [
  {
    zoomTo: 100, // we want to display this format for all zoom levels until 100
    period: 'hour',
    periodIncrement: 1,
    format({ timeStart }) {
      return timeStart.format('HH:mm DD MMMM YYYY'); // full list of formats: https://day.js.org/docs/en/display/format
    },
  },
];

const minutes = [
  {
    zoomTo: 100, // we want to display this format for all zoom levels until 100
    period: 'minute',
    periodIncrement: 15,
    main: true,
    format({ timeStart, vido }) {
      return vido.html`<div style="text-align:center;">${timeStart.format('HH:mm')}</div>`; // full list of formats: https://day.js.org/docs/en/display/format
    },
  },
];

// Configuration object
const config = {
  // for free key for your domain please visit https://gstc.neuronet.io/free-key
  // if you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing

  licenseKey:
    '====BEGIN LICENSE KEY====\nWzVvPXMTi17W2tBoYgAjCRurYwmoilqPzew4PDApYkcrtu42uptbQiJmuZgy6iHyj9ZapfNupQZx0PO2tAMKmShNts7ZWT+N4N+lBkYCOsgc9nZG5ERYe25ixnNWzPnWA2YLj5GnZuKGJjK4EoRWsv3FJUoiBmUhKelLldb1dqCSiSjN4s5UwOtx55RLDEh0rj4GswVk4QaL74lmilmismeV+AxhQVdX8PVxz9bu0VW+wio/lo5QmfawWCeNLhuu0p0lys6pOvJhN/267+MsWhd3RYBvWIp6Mogug5P7nLQdeSdCgxVMVn1HOGZZ5ATTs9WDuWvvM1667MkEvtm2Ow==||U2FsdGVkX1+oPC1pq0yGIQoqTUJ8//k3BU81G6FLMlVijZH1e68HsOW0I2GI4aPzgeDcnoZvNO0MhGGTD+Nu8C1KviY3/a0MQhT+jGNofmA=\nUSUtJc13WJ1GjpEDFNHYeSsh1P7zRE5h+vdMN7KXcKDXAKi4gr3ebWUEHP3QjbcTeC3+mnn786sNVsERPLE67iqmgLdeXPjGIoScidvINw2x975diSP2r3kZkceqcfs48q3I6zXPaK1BJK/Yyin/7zboatOn+Abs+yAFZvDoLgga1nHRrtNgtaK+OXRJnCs519NsZuzqFSI2WuCYzaVkrO1hJqzgDsrxxue/NKmLtncLcWnFwNVZ2SDWdxgk4xGOi0GJmXUv3kn1fRau35FXF6zf0kPbilcWkGgweVpdDnBor1fjwvNLQDJpBT/Rav42SDKO7BRfWgjEKNY+lihQsA==\n====END LICENSE KEY====',

  list: {
    columns: {
      data: GSTC.api.fromArray(columnsFromDB),
    },
    rows: GSTC.api.fromArray(rowsFromDB),
  },
  chart: {
    items: GSTC.api.fromArray(itemsFromDB),
    calendarLevels: [hours, minutes],
    time: {
      zoom: 13,
      from: GSTC.api.date('2020-01-01').startOf('month').valueOf(),
      to: GSTC.api.date('2020-01-01').endOf('month').valueOf(),
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
