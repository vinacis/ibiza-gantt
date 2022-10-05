import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
// import GSTC from '../../dist/gstc.wasm.esm.min.js';
import { Plugin as Selection } from '../../dist/plugins/selection.esm.min.js';
import { Plugin as TimelinePointer } from '../../dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as ItemMovement } from '../../dist/plugins/item-movement.esm.min.js';
import { Plugin as ItemResizing } from '../../dist/plugins/item-resizing.esm.min.js';

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
      start: GSTC.api.date('2020-02-01').startOf('day').valueOf(),
      end: GSTC.api.date('2020-02-06').endOf('day').valueOf(),
    },
  },
  {
    id: '2',
    label: 'Item 2',
    rowId: '1',
    time: {
      start: GSTC.api.date('2020-03-01').startOf('day').valueOf(),
      end: GSTC.api.date('2020-03-15').endOf('day').valueOf(),
    },
  },
  {
    id: '3',
    label: 'Item 3',
    rowId: '2',
    time: {
      start: GSTC.api.date('2020-02-15').startOf('day').valueOf(),
      end: GSTC.api.date('2020-02-20').endOf('day').valueOf(),
    },
  },
  {
    id: '4',
    label: 'Item 4',
    rowId: '2',
    time: {
      start: GSTC.api.date('2020-04-15').startOf('day').valueOf(),
      end: GSTC.api.date('2020-04-20').endOf('day').valueOf(),
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

/**
 * @type {import("../../dist/gstc").ChartCalendarLevel}
 */
const months = [
  {
    zoomTo: 100, // we want to display this format for all zoom levels until 100
    period: 'month',
    periodIncrement: 1,
    format({ timeStart }) {
      return timeStart.format('MMMM YYYY'); // full list of formats: https://day.js.org/docs/en/display/format
    },
  },
];

/**
 * @type {import("../../dist/gstc").ChartCalendarLevel}
 */
const days = [
  {
    zoomTo: 100, // we want to display this format for all zoom levels until 100
    period: 'day',
    periodIncrement({ currentDates, date }) {
      if (!currentDates.length) return Math.ceil(date.endOf('month').date() / 2);
      const lastDate = currentDates[currentDates.length - 1];
      if (lastDate.leftGlobalDate.date() === 1) {
        // we are in the middle of the month
        return Math.floor(lastDate.leftGlobalDate.endOf('month').date() / 2);
      }
      // we are at the beginning - so we can take previous date and add month to get current month
      return Math.ceil(lastDate.leftGlobalDate.add(1, 'month').endOf('month').date() / 2);
    },
    main: true,
    format({ timeStart, timeEnd }) {
      return timeStart.format('DD') + ' - ' + timeEnd.format('DD');
    },
  },
];

// Configuration object
/**
 * @type {import("../../dist/gstc").Config}
 */
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
    calendarLevels: [months, days],
    time: {
      zoom: 24,
      from: GSTC.api.date('2020-01-01').valueOf(),
      to: GSTC.api.date('2020-01-01').endOf('year').valueOf(),
    },
  },
  plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
};

// Generate GSTC state from configuration object
const state = GSTC.api.stateFromConfig(config);

// for testing
globalThis.state = state;

const element = document.getElementById('gstc');
element.addEventListener('gstc-loaded', () => {
  console.log('loaded');
});

// Mount the component
const app = GSTC({
  element,
  state,
});

//for testing
globalThis.gstc = app;
