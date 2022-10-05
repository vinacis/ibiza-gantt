import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
// import GSTC from '../../dist/gstc.wasm.esm.min.js';
import { Plugin as CalendarScroll } from '../../dist/plugins/calendar-scroll.esm.min.js';
import { Plugin as DependencyLines } from '../../dist/plugins/dependency-lines.esm.min.js';
import { Plugin as Selection } from '../../dist/plugins/selection.esm.min.js';
import { Plugin as TimelinePointer } from '../../dist/plugins/timeline-pointer.esm.min.js';

const GSTCID = GSTC.api.GSTCID;

const rowsFromDB = [
  {
    id: 'R01',
    label: 'R1',
    expanded: true,
  },
  {
    id: 'R01_01',
    label: 'R1-1',
    parentId: 'R01',
    expanded: true,
  },
  {
    id: 'R01_01_01',
    label: 'R1-1-1',
    parentId: 'R01_01',
    expanded: true,
  },
  {
    id: 'R01_01_01_1549',
    label: 'R1-1-1-1',
    parentId: 'R01_01_01',
    expanded: true,
  },
  {
    id: 'R01_01_01_1552',
    label: 'R1-1-1-1',
    parentId: 'R01_01_01',
    expanded: true,
  },
  {
    id: 'R01_01_01_1557',
    label: 'R1-1-1-1',
    parentId: 'R01_01_01',
    expanded: true,
  },
  {
    id: 'R01_01_01_1560',
    label: 'R1-1-1-1',
    parentId: 'R01_01_01',
    expanded: true,
  },
  {
    id: 'R01_01_02_1550',
    label: 'R1-1-1-2',
    parentId: 'R01_01_01',
    expanded: true,
  },
  {
    id: 'R01_01_02_1555',
    label: 'R1-1-1-2',
    parentId: 'R01_01_01',
    expanded: true,
  },
  {
    id: 'R01_01_02_1558',
    label: 'R1-1-1-2',
    parentId: 'R01_01_01',
    expanded: true,
  },
  {
    id: 'R01_01_02_1561',
    label: 'R1-1-1-2',
    parentId: 'R01_01_01',
    expanded: true,
  },
];

const itemsFromDB = [
  {
    id: 'T1',
    rowId: 'R01_01_01_1549',
    // label: 'ALP_IN_60_pST_安定性_箱詰め・仕込み_一時保管',
    label: 'T1',
    time: {
      start: GSTC.api.date('2022-06-23 08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-23 13:30:00').valueOf(),
    },
    dependant: [GSTCID('T2')],
  },
  {
    id: 'T2',
    rowId: 'R01_01_01_1549',
    label: 'T2',
    time: {
      start: GSTC.api.date('2022-06-23T17:30:00').valueOf(),
      end: GSTC.api.date('2022-06-23T21:30:00').valueOf(),
    },
    dependant: [GSTCID('T9')],
  },
  {
    id: 'T3',
    rowId: 'R01_01_01_1552',
    label: 'T3',
    time: {
      start: GSTC.api.date('2022-06-23T08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-23T13:30:00').valueOf(),
    },
    dependant: [GSTCID('T4')],
  },
  {
    id: 'T4',
    rowId: 'R01_01_01_1552',
    label: 'T4',
    time: {
      start: GSTC.api.date('2022-06-23T17:30:00').valueOf(),
      end: GSTC.api.date('2022-06-23T21:30:00').valueOf(),
    },
    dependant: [GSTCID('T12')],
  },
  {
    id: 'T5',
    rowId: 'R01_01_01_1557',
    label: 'T5',
    time: {
      start: GSTC.api.date('2022-06-23T08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-23T13:30:00').valueOf(),
    },
    dependant: [GSTCID('T6')],
  },
  {
    id: 'T6',
    rowId: 'R01_01_01_1557',
    label: 'T6',
    time: {
      start: GSTC.api.date('2022-06-23T17:30:00').valueOf(),
      end: GSTC.api.date('2022-06-23T21:30:00').valueOf(),
    },
    dependant: [GSTCID('T15')],
  },
  {
    id: 'T7',
    rowId: 'R01_01_01_1560',
    label: 'T7',
    time: {
      start: GSTC.api.date('2022-06-23T08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-23T13:30:00').valueOf(),
    },
    dependant: [GSTCID('T8')],
  },
  {
    id: 'T8',
    rowId: 'R01_01_01_1560',
    label: 'T8',
    time: {
      start: GSTC.api.date('2022-06-23T17:30:00').valueOf(),
      end: GSTC.api.date('2022-06-23T21:30:00').valueOf(),
    },
    dependant: [GSTCID('T18')],
  },
  {
    id: 'T9',
    rowId: 'R01_01_02_1550',
    label: 'T9',
    time: {
      start: GSTC.api.date('2022-06-24T08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-24T13:30:00').valueOf(),
    },
    dependant: [GSTCID('T10')],
  },
  {
    id: 'T10',
    rowId: 'R01_01_02_1550',
    label: 'T10',
    time: {
      start: GSTC.api.date('2022-06-24T17:30:00').valueOf(),
      end: GSTC.api.date('2022-06-25T01:30:00').valueOf(),
    },
    dependant: [GSTCID('T11')],
  },
  {
    id: 'T11',
    rowId: 'R01_01_02_1550',
    label: 'T11',
    time: {
      start: GSTC.api.date('2022-06-24T13:30:00').valueOf(),
      // start: GSTC.api.date('2022-06-24T13:30:01').valueOf(),
      end: GSTC.api.date('2022-06-24T21:30:00').valueOf(),
    },
    dependant: [],
  },
  {
    id: 'T12',
    rowId: 'R01_01_02_1555',
    label: 'T12',
    time: {
      start: GSTC.api.date('2022-06-23T13:30:00').valueOf(),
      end: GSTC.api.date('2022-06-25T08:30:00').valueOf(),
    },
    dependant: [GSTCID('T13')],
  },
  {
    id: 'T13',
    rowId: 'R01_01_02_1555',
    label: 'T13',
    time: {
      start: GSTC.api.date('2022-06-25T08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-25T16:30:00').valueOf(),
    },
    dependant: [GSTCID('T14')],
  },
  {
    id: 'T14',
    rowId: 'R01_01_02_1555',
    label: 'T14',
    time: {
      start: GSTC.api.date('2022-06-25T17:30:00').valueOf(),
      end: GSTC.api.date('2022-06-26T01:30:00').valueOf(),
    },
    dependant: [],
  },
  {
    id: 'T15',
    rowId: 'R01_01_02_1558',
    label: 'T15',
    time: {
      start: GSTC.api.date('2022-06-24T08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-24T08:30:00').valueOf(),
    },
    dependant: [GSTCID('T16')],
  },
  {
    id: 'T16',
    rowId: 'R01_01_02_1558',
    label: 'T16',
    time: {
      start: GSTC.api.date('2022-06-24T08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-24T16:30:00').valueOf(),
    },
    dependant: [GSTCID('T17')],
  },
  {
    id: 'T17',
    rowId: 'R01_01_02_1558',
    label: 'T17',
    time: {
      start: GSTC.api.date('2022-06-24T17:30:00').valueOf(),
      end: GSTC.api.date('2022-06-25T01:30:00').valueOf(),
    },
    dependant: [],
  },
  {
    id: 'T18',
    rowId: 'R01_01_02_1561',
    label: 'T18',
    time: {
      start: GSTC.api.date('2022-06-24T08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-24T08:30:00').valueOf(),
    },
    dependant: [GSTCID('T19')],
  },
  {
    id: 'T19',
    rowId: 'R01_01_02_1561',
    label: 'T19',
    time: {
      start: GSTC.api.date('2022-06-24T08:30:00').valueOf(),
      end: GSTC.api.date('2022-06-24T16:30:00').valueOf(),
    },
    dependant: [GSTCID('T20')],
  },
  {
    id: 'T20',
    rowId: 'R01_01_02_1561',
    label: 'T20',
    time: {
      start: GSTC.api.date('2022-06-24T17:30:00').valueOf(),
      end: GSTC.api.date('2022-06-25T01:30:00').valueOf(),
    },
    dependant: [],
  },
];

const columnsFromDB = [
  {
    id: 'id',
    data: 'id',
    sortable: 'id',
    width: 200,
    header: {
      content: 'ID',
    },
  },
  {
    id: 'label',
    data: 'label',
    sortable: 'label',
    expander: true,
    isHTML: false,
    width: 200,
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
  innerHeight: 800,
  list: {
    columns: {
      data: GSTC.api.fromArray(columnsFromDB),
    },
    rows: GSTC.api.fromArray(rowsFromDB),
  },
  chart: {
    items: GSTC.api.fromArray(itemsFromDB),
    time: {
      zoom: 18.5,
    },
  },
  plugins: [TimelinePointer(), Selection(), CalendarScroll(), DependencyLines()],
};

// Generate GSTC state from configuration object
const state = GSTC.api.stateFromConfig(config);

// for testing
globalThis.state = state;

const element = document.getElementById('gstc');
element.addEventListener('gstc-loaded', (ev) => {
  // @ts-ignore
  globalThis.dispatchEvent(new Event('gstc-loaded', ev.target));
});

// Mount the component
const app = (globalThis.gstc = GSTC({
  element,
  state,
}));
