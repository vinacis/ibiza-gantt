import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
// import GSTC from '../../dist/gstc.wasm.esm.min.js';
import { Plugin as TimelinePointer } from '../../dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from '../../dist/plugins/selection.esm.min.js';
import { Plugin as ItemMovement } from '../../dist/plugins/item-movement.esm.min.js';
import { Plugin as ItemResizing } from '../../dist/plugins/item-resizing.esm.min.js';

import detectAdBlock from './prebid-ads.js';
detectAdBlock().then((enabled) => {
  if (globalThis.gstc && enabled) {
    const lithtml = globalThis.gstc.lithtml;
    const warning = lithtml.html`<div style="color:red;font-weight:bold;margin:10px;">You should disable the ad-blocking extension on this page as it can significantly slow down the DOM updates.</div>`;
    lithtml.render(warning, document.getElementById('warning'));
  }
});

let iterations = 1000;

let gstc, state;

const fromDate = GSTC.api.date().startOf('month');
let toDate = fromDate.add(30, 'day');

/**
 * @type {import("../../dist/gstc").Rows}
 */
let rows = {};
function generateNewRows() {
  rows = {};
  for (let i = 0; i < iterations; i++) {
    const id = GSTC.api.GSTCID(String(i));
    rows[id] = {
      id,
      label: `Row ${i + 1}`,
    };
  }
  return rows;
}

let dateIncrement = 0;

/**
 * @type {import("../../dist/gstc").Items}
 */
let items = {};
function generateNewItems() {
  let rowsIds = Object.keys(rows);
  items = {};
  for (let i = 0, len = rowsIds.length; i < len; i++) {
    let rowId = rowsIds[i /* % 2 === 0 ? i : i + 1*/];
    let id = GSTC.api.GSTCID(String(i));
    if (dateIncrement >= 30) dateIncrement = 0;
    const startTime = fromDate.add(dateIncrement, 'day').startOf('day').valueOf();
    const endTime = fromDate.add(dateIncrement, 'day').endOf('day').valueOf();
    items[id] = {
      id,
      rowId,
      label: `Item ${i + 1}`,
      time: {
        start: startTime,
        end: endTime,
      },
    };
    dateIncrement++;
  }
  return items;
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
      expander: false,
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
  autoInnerHeight: true,
  innerHeight: 500,
  plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
  list: {
    rows: {},
    columns,
  },
  chart: {
    items: {},
    time: {
      zoom: 19.4,
    },
  },
  // scroll: {
  //   horizontal: {
  //     precise: true,
  //   },
  //   vertical: {
  //     precise: true,
  //   },
  // },
};

state = GSTC.api.stateFromConfig(config);
const element = document.getElementById('gstc');

gstc = GSTC({
  element,
  state,
});

const genScreenStyle = document.getElementById('gen').style;

function showLoadingScreen() {
  genScreenStyle.display = 'block';
}

function hideLoadingScreen() {
  genScreenStyle.display = 'none';
}

function generate() {
  generateNewRows();
  generateNewItems();
}

// state.update('config', (config) => {
//   config.list.rows = data.rows;
//   config.chart.items = data.items;
//   return config;
// });

function update(count) {
  showLoadingScreen();
  setTimeout(() => {
    iterations = count;
    generate();
    state.update('config', (config) => {
      config.list.rows = rows;
      config.chart.items = items;
      // config.chart.time.from = fromDate.valueOf();
      // config.chart.time.to = toDate.valueOf();
      return config;
    });
    hideLoadingScreen();
  }, 0);
}

document.getElementById('1k').addEventListener('click', () => {
  update(1000);
});

document.getElementById('5k').addEventListener('click', () => {
  update(5000);
});

document.getElementById('10k').addEventListener('click', () => {
  update(10000);
});

document.getElementById('20k').addEventListener('click', () => {
  update(20000);
});

document.getElementById('30k').addEventListener('click', () => {
  update(30000);
});

document.getElementById('50k').addEventListener('click', () => {
  update(50000);
});
/*
document.getElementById('100k').addEventListener('click', () => {
  update(100000);
});
*/
//@ts-ignore
globalThis.state = state;
//@ts-ignore
globalThis.gstc = gstc;
