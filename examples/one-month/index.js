import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
//import GSTC from '../../dist/gstc.wasm.esm.min.js';
import { Plugin as TimelinePointer } from '../../dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from '../../dist/plugins/selection.esm.min.js';
import { Plugin as ItemMovement } from '../../dist/plugins/item-movement.esm.min.js';
import { Plugin as ItemResizing } from '../../dist/plugins/item-resizing.esm.min.js';
import { Plugin as CalendarScroll } from '../../dist/plugins/calendar-scroll.esm.min.js';
import { Plugin as HighlightWeekends } from '../../dist/plugins/highlight-weekends.esm.min.js';
import { Plugin as ProgressBar } from '../../dist/plugins/progress-bar.esm.min.js';
import { Plugin as TimeBookmarks } from '../../dist/plugins/time-bookmarks.esm.min.js';
import { Plugin as DependencyLines } from '../../dist/plugins/dependency-lines.esm.min.js';

const iterations = 100;
const GSTCID = GSTC.api.GSTCID;

function getRandomFaceImage() {
  return `./faces/face-${Math.ceil(Math.random() * 50)}.jpg`;
}

const colors = ['#E74C3C', '#DA3C78', '#7E349D', '#0077C0', '#07ABA0', '#0EAC51', '#F1892D'];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
globalThis.GSTC = GSTC;

const startDate = GSTC.api.date('2020-01-01').startOf('month');
const endDate = startDate.clone().endOf('month');
const startTime = startDate.valueOf();

/**
 * @type {import('../../dist/gstc').Rows}
 */
const rows = {};
for (let i = 0; i < iterations; i++) {
  const withParent = i > 0 && i % 2 === 0;
  const id = GSTCID(String(i));
  rows[id] = {
    id,
    label: `John Doe ${i}`,
    parentId: withParent ? GSTCID(String(i - 1)) : undefined,
    expanded: false,
    img: getRandomFaceImage(),
    progress: Math.floor(Math.random() * 100),
  };
}

rows[GSTCID('11')].label = 'NESTED TREE HERE';
rows[GSTCID('12')].parentId = GSTCID('11');
rows[GSTCID('13')].parentId = GSTCID('12');
rows[GSTCID('14')].parentId = GSTCID('13');

/**
 * @type {import('../../dist/gstc').Items}
 */
const items = {};
for (let i = 0; i < iterations; i++) {
  let rowId = GSTCID(i.toString());
  let id = GSTCID(i.toString());
  let startDayjs = GSTC.api
    .date(startTime)
    .startOf('month')
    .add(Math.floor(Math.random() * 30), 'day');
  items[id] = {
    id,
    label: `John Doe ${i}`,
    progress: Math.round(Math.random() * 100),
    style: { background: getRandomColor() },
    time: {
      start: startDayjs.startOf('day').valueOf(),
      end: startDayjs
        .clone()
        .add(Math.floor(Math.random() * 20) + 4, 'day')
        .endOf('day')
        .valueOf(),
    },
    rowId,
    img: getRandomFaceImage(),
    description: 'Lorem ipsum dolor sit amet',
  };
}

items[GSTCID('0')].linkedWith = [GSTCID('1')];
items[GSTCID('0')].label = 'Task 0 linked with 1';
items[GSTCID('0')].type = 'task';
items[GSTCID('1')].label = 'Task 1 linked with 0';
items[GSTCID('1')].type = 'task';
items[GSTCID('1')].time = { ...items[GSTCID('0')].time };

items[GSTCID('0')].style = { background: colors[3] };
items[GSTCID('1')].style = { background: colors[3] };

items[GSTCID('3')].dependant = [GSTCID('5')];
items[GSTCID('3')].time.start = GSTC.api.date(startTime).add(4, 'day').startOf('day').add(5, 'day').valueOf();
items[GSTCID('3')].time.end = GSTC.api.date(items[GSTCID('3')].time.start).endOf('day').add(5, 'day').valueOf();

items[GSTCID('5')].time.start = GSTC.api.date(items[GSTCID('3')].time.end).startOf('day').add(5, 'day').valueOf();
items[GSTCID('5')].time.end = GSTC.api.date(items[GSTCID('5')].time.start).endOf('day').add(2, 'day').valueOf();
items[GSTCID('5')].dependant = [GSTCID('7'), GSTCID('9')];

items[GSTCID('7')].time.start = GSTC.api.date(items[GSTCID('5')].time.end).startOf('day').add(3, 'day').valueOf();
items[GSTCID('7')].time.end = GSTC.api.date(items[GSTCID('7')].time.start).endOf('day').add(2, 'day').valueOf();
items[GSTCID('9')].time.start = GSTC.api.date(items[GSTCID('5')].time.end).startOf('day').add(2, 'day').valueOf();
items[GSTCID('9')].time.end = GSTC.api.date(items[GSTCID('9')].time.start).endOf('day').add(3, 'day').valueOf();

const columns = {
  data: {
    [GSTCID('id')]: {
      id: GSTCID('id'),
      data: ({ row }) => GSTC.api.sourceID(row.id),
      width: 80,
      sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)),
      header: {
        content: 'ID',
      },
    },
    [GSTCID('label')]: {
      id: GSTCID('label'),
      data: 'label',
      sortable: 'label',
      expander: true,
      isHTML: false,
      width: 315,
      header: {
        content: 'Label',
      },
    },
    [GSTCID('progress')]: {
      id: GSTCID('progress'),
      data({ row, vido }) {
        return vido.html`<div style="text-align:center">${row.progress}</div>`;
      },
      width: 100,
      sortable: 'progress',
      header: {
        content: 'Progress',
      },
    },
  },
};

const bookmarks = {
  '1-st': {
    time: GSTC.api.date(startTime).add(2, 'day').startOf('day').valueOf(),
    color: '#3498DB',
    label: '1-st',
  },
};

for (let i = 1; i < 10; i++) {
  const id = `bookmark-${i}`;
  const time = GSTC.api
    .date(startTime)
    .add(i * 4, 'day')
    .startOf('day');
  bookmarks[id] = {
    time: time.valueOf(),
    label: `Bookmark ${time.format('YYYY-MM-DD')}`,
  };
}

function itemSlot(vido, props) {
  const { html, onChange, update } = vido;

  let imageSrc = '';
  let description = '';
  onChange((newProps) => {
    props = newProps;
    if (!props || !props.item) return;
    imageSrc = props.item.img;
    description = props.item.description;
    update();
  });

  return (content) => {
    if (!props || !props.item) return content;
    return html`<div
        class="item-image"
        style="background:url(${imageSrc}),transparent;flex-shrink:0;border-radius:100%;width:34px;height:34px;vertical-align: middle;background-size: 100%;margin: 4px 11px 0px 0px;"
      ></div>
      <div class="item-text">
        <div class="item-label">${content}</div>
        <div class="item-description" style="font-size:11px;margin-top:2px;color:#fffffff0;line-height:1em;">
          ${description}
        </div>
      </div>`;
  };
}

function rowSlot(vido, props) {
  const { html, onChange, update, api } = vido;

  let img = '';
  onChange((newProps) => {
    props = newProps;
    if (!props || !props.row) return;
    img = props.row.img;
    update();
  });

  return (content) => {
    if (!props || !props.column) return;
    return api.sourceID(props.column.id) === 'label'
      ? html`<div class="row-content-wrapper" style="display:flex">
          <div class="row-content" style="flex-grow:1;">${content}</div>
          <div
            class="row-image"
            style="background:url(${img}),transparent;border-radius:100%;width:34px;height:34px;vertical-align: middle;background-size: 100%;margin: auto 10px;flex-shrink:0;"
          ></div>
        </div>`
      : content;
  };
}

function mainOuterSlot(vido, props) {
  const { onChange, api, update, html, state, getElement } = vido;

  onChange((changedProps) => {
    // if current element is reused to display other item data just update your data so when you click you will display right alert
    props = changedProps;
  });

  let year = api.time.date(startTime).year();
  let month = api.time.date(startTime).month();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let loading = '';
  let overlay = '';

  function updateTime() {
    if (loading) return;
    const startTime = api.time
      .date(`${year}-${month + 1}-01`)
      .startOf('month')
      .valueOf();
    const endTime = api.time
      .date(`${year}-${month + 1}-01`)
      .endOf('month')
      .valueOf();
    loading = 'LOADING... You can load items from backend now.';
    overlay = 'overlay';
    setTimeout(() => {
      // if you have items you can change view
      state.update('config.chart.time', (time) => {
        time.from = startTime;
        time.to = endTime;
        console.log(`${year}-${month + 1}-01`, `${year}-${month + 1}-01`);
        return time;
      });
      loading = '';
      overlay = '';
    }, 250);
  }

  let listenerAdded = false;
  function getEl(element) {
    if (listenerAdded) return;
    element.addEventListener('change', (ev) => {
      if (month !== ev.target.value) {
        month = Number(ev.target.value);
        updateTime();
        update();
      }
    });
    listenerAdded = true;
  }

  function setPrevYear() {
    if (loading) return;
    year -= 1;
    updateTime();
    update();
  }

  function setNextYear() {
    if (loading) return;
    year += 1;
    updateTime();
    update();
  }

  function setPrevMonth() {
    if (loading) return;
    month -= 1;
    if (month < 0) {
      month = 11;
      year--;
    }
    updateTime();
    update();
  }

  function setNextMonth() {
    if (loading) return;
    month += 1;
    if (month > 11) {
      month = 0;
      year++;
    }
    updateTime();
    update();
  }

  function toggleHideWeekends(ev) {
    hideWeekends = ev.target.checked;
    gstc.api.time.recalculateTime();
  }

  // return render function
  return (content) =>
    html`<div class="tool-shelf" style="margin:20px;">
      Year: <button style="margin-left:20px;" @click=${setPrevYear}><</button><input type="number" .value=${year}><button style="margin-right:20px;" @click=${setNextYear}>></button>
      Month: <button id="btn-prev-month" style="margin-left:20px;" @click=${setPrevMonth}><</button><select get-element=${getElement(
      getEl
    )}>${months.map(
      (monthText, index) => html`<option value=${index} ?selected=${index === month}>${monthText}</option>`
    )}</option></select><button id="btn-next-month" style="margin-right:20px;" @click=${setNextMonth}>></button>
    <input type="checkbox" id="hide-weekends" @change=${toggleHideWeekends} /> <label for="hide-weekends">Hide weekends</label>
    </div>${content}<div class=${overlay}>${loading}</div>`;
}

let hideWeekends = false;
function onLevelDates({ dates, level, format }) {
  if (format.period !== 'day') return dates;
  if (!hideWeekends) return dates;
  return dates.filter((date) => date.leftGlobalDate.day() !== 0 && date.leftGlobalDate.day() !== 6);
}

const config = {
  licenseKey:
    '====BEGIN LICENSE KEY====\nWzVvPXMTi17W2tBoYgAjCRurYwmoilqPzew4PDApYkcrtu42uptbQiJmuZgy6iHyj9ZapfNupQZx0PO2tAMKmShNts7ZWT+N4N+lBkYCOsgc9nZG5ERYe25ixnNWzPnWA2YLj5GnZuKGJjK4EoRWsv3FJUoiBmUhKelLldb1dqCSiSjN4s5UwOtx55RLDEh0rj4GswVk4QaL74lmilmismeV+AxhQVdX8PVxz9bu0VW+wio/lo5QmfawWCeNLhuu0p0lys6pOvJhN/267+MsWhd3RYBvWIp6Mogug5P7nLQdeSdCgxVMVn1HOGZZ5ATTs9WDuWvvM1667MkEvtm2Ow==||U2FsdGVkX1+oPC1pq0yGIQoqTUJ8//k3BU81G6FLMlVijZH1e68HsOW0I2GI4aPzgeDcnoZvNO0MhGGTD+Nu8C1KviY3/a0MQhT+jGNofmA=\nUSUtJc13WJ1GjpEDFNHYeSsh1P7zRE5h+vdMN7KXcKDXAKi4gr3ebWUEHP3QjbcTeC3+mnn786sNVsERPLE67iqmgLdeXPjGIoScidvINw2x975diSP2r3kZkceqcfs48q3I6zXPaK1BJK/Yyin/7zboatOn+Abs+yAFZvDoLgga1nHRrtNgtaK+OXRJnCs519NsZuzqFSI2WuCYzaVkrO1hJqzgDsrxxue/NKmLtncLcWnFwNVZ2SDWdxgk4xGOi0GJmXUv3kn1fRau35FXF6zf0kPbilcWkGgweVpdDnBor1fjwvNLQDJpBT/Rav42SDKO7BRfWgjEKNY+lihQsA==\n====END LICENSE KEY====',
  innerHeight: 800,
  plugins: [
    HighlightWeekends(),
    TimelinePointer(), // timeline pointer must go first before selection, resizing and movement
    Selection(),
    ItemResizing(), // resizing must fo before movement
    ItemMovement(),
    CalendarScroll(),
    ProgressBar(),
    TimeBookmarks({
      bookmarks,
    }),
    DependencyLines({
      onLine: [
        (line) => {
          line.type = GSTC.api.sourceID(line.fromItem.id) === '3' ? 'smooth' : 'square';
          return line;
        },
      ],
    }),
  ],
  list: {
    row: {
      height: 58,
    },
    rows,
    columns,
  },
  chart: {
    time: {
      calculatedZoomMode: true,
      from: startDate.valueOf(),
      to: endDate.valueOf(),
      onLevelDates: [onLevelDates],
    },
    item: {
      height: 50,
    },
    items,
  },
  scroll: {
    vertical: { precise: true },
  },
  slots: {
    'chart-timeline-items-row-item': { content: [itemSlot] },
    'list-column-row': { content: [rowSlot] },
    main: { outer: [mainOuterSlot] },
  },
};

let gstc;
let state = GSTC.api.stateFromConfig(config);
(async function mountGSTC() {
  const element = document.getElementById('gstc');

  gstc = GSTC({
    // @ts-ignore
    element,
    state,
  });

  //@ts-ignore
  globalThis.state = state;
  //@ts-ignore
  globalThis.gstc = gstc;
})();