import GSTC from '../../dist/gstc.esm.min.js';
// or when you encounter problems with wasm loader
// import GSTC from '../../dist/gstc.wasm.esm.min.js';
import { Plugin as TimelinePointer } from '../../dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from '../../dist/plugins/selection.esm.min.js';
import { Plugin as ItemMovement } from '../../dist/plugins/item-movement.esm.min.js';
import { Plugin as ItemResizing } from '../../dist/plugins/item-resizing.esm.min.js';

let iterations = 500;

let gstc, state;

const fromDate = GSTC.api.date().startOf('month');

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

let secondLevel = null;
function chartCalendarTemplate({ className, styleMap, components, actions, slots, html, vido, props }) {
  return slots.html(
    'outer',
    html`
      <div class=${className} data-actions=${actions()} style=${styleMap.directive()}>
        ${slots.html(
          'inner',
          components.length
            ? components.map((component, level) => {
                if (level === 1) {
                  secondLevel = component;
                  return html`<div>Dates moved to the bottom</div>`;
                }
                return component && component.length
                  ? html`
                      <div class=${className + '-dates ' + className + `-dates--level-${level}`}>
                        ${slots.html(
                          'content',
                          component.map((m) => m.html())
                        )}
                      </div>
                    `
                  : null;
              })
            : null
        )}
      </div>
    `
  );
}

const topContentStyle = new GSTC.api.vido.StyleMap({
  top: '72px',
  position: 'absolute',
  width: '100%',
  display: 'flex',
  background: '#f9fafb',
  height: '50px',
});
function chartTemplate({
  className,
  onWheel,
  ChartCalendar,
  ChartTimeline,
  ScrollBarVertical,
  calculatedZoomMode,
  ScrollBarHorizontal,
  actions,
  slots,
  html,
  vido,
  props,
}) {
  const headerHeight = vido.state.get('config.headerHeight');
  topContentStyle.style.top = headerHeight + 'px';
  const time = state.get('$data.chart.time');
  const mainLevel = time.levels[time.level];
  return slots.html(
    'outer',
    html`
      <div class=${className} data-actions=${actions()} @wheel=${onWheel}>
        <div class="chart-top-content" style="${topContentStyle.directive()}">
          ${mainLevel
            ? mainLevel.map(
                (date) =>
                  html`<div
                    style="width: ${date.currentView
                      .width}px; border-right:1px solid #d5d9dc; overflow:hidden;text-align:center;color:#747a81;border-top:1px solid #d5d9dc;padding-top:10px"
                  >
                    ${date.leftGlobalDate.format('DD')}<br />
                    content
                  </div>`
              )
            : null}
        </div>
        ${slots.html(
          'content',
          html`
            ${ChartCalendar.html()}${ChartTimeline.html()}${ScrollBarVertical.html()}
            <div class="second-level-copy">${secondLevel ? secondLevel.map((date) => date.html()) : null}</div>
            ${calculatedZoomMode ? null : ScrollBarHorizontal.html()}
          `
        )}
      </div>
    `
  );
}

function listTemplate({ className, styleMap, list, listColumns, actions, slots, html, cache, vido, props }) {
  const headerHeight = vido.state.get('config.headerHeight');
  return slots.html(
    'outer',
    cache(
      list.columns.percent > 0
        ? html`
            <div class=${className} data-actions=${actions()} style=${styleMap.directive()}>
              <div
                class="list-top-content"
                style="top: ${headerHeight}px;width:100%;position:absolute;text-align:center;margin:auto;height:50px;"
              >
                top content
              </div>
              ${slots.html(
                'content',
                listColumns.map((c) => c.html())
              )}
              <div
                class="list-bottom-content"
                style="bottom:0px;width:100%;position:absolute;text-align:center;margin: auto;height:65px"
              >
                bottom content
              </div>
            </div>
          `
        : ''
    )
  );
}

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
  additionalSpace: {
    top: 50,
    bottom: 65,
  },
  templates: {
    'chart-calendar': chartCalendarTemplate,
    chart: chartTemplate,
    list: listTemplate,
  },
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
      return config;
    });
    hideLoadingScreen();
  }, 0);
}

update(500);

//@ts-ignore
globalThis.state = state;
//@ts-ignore
globalThis.gstc = gstc;
