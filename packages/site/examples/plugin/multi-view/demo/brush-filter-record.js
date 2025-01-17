import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { G2, Mix } from '@ant-design/charts';

const DemoMix = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  // 定义新的交互
  G2.registerInteraction('other-visible', {
    showEnable: [
      {
        trigger: 'plot:mouseenter',
        action: 'cursor:crosshair',
      },
      {
        trigger: 'mask:mouseenter',
        action: 'cursor:move',
      },
      {
        trigger: 'plot:mouseleave',
        action: 'cursor:default',
      },
      {
        trigger: 'mask:mouseleave',
        action: 'cursor:crosshair',
      },
    ],
    start: [
      {
        trigger: 'plot:mousedown',

        isEnable(context) {
          return !context.isInShape('mask');
        },

        action: ['rect-mask:start', 'rect-mask:show'],
      },
      {
        trigger: 'mask:dragstart',
        action: 'rect-mask:moveStart',
      },
    ],
    processing: [
      {
        trigger: 'plot:mousemove',
        action: 'rect-mask:resize',
      },
      {
        trigger: 'mask:drag',

        isEnable(context) {
          return context.isInPlot();
        },

        action: 'rect-mask:move',
      },
      {
        trigger: 'mask:change',
        action: 'element-sibling-filter-record:filter',
      },
    ],
    end: [
      {
        trigger: 'plot:mouseup',
        action: 'rect-mask:end',
      },
      {
        trigger: 'mask:dragend',
        action: 'rect-mask:moveEnd',
      },
    ],
    rollback: [
      {
        trigger: 'dblclick',
        action: ['rect-mask:hide', 'element-sibling-filter-record:reset'],
      },
    ],
  });
  const subData = data.slice(0, 400);
  const config = {
    tooltip: false,
    views: [
      {
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 0.5,
            y: 1,
          },
        },
        padding: [10, 20, 40, 50],
        data: subData,
        meta: {
          price: {
            nice: true,
          },
        },
        axes: {},
        geometries: [
          {
            type: 'point',
            xField: 'carat',
            yField: 'price',
            mapping: {},
          },
        ],
        interactions: [
          {
            type: 'other-visible',
          },
        ],
      },
      {
        region: {
          start: {
            x: 0.5,
            y: 0,
          },
          end: {
            x: 1,
            y: 1,
          },
        },
        padding: [10, 20, 40, 50],
        data: subData,
        meta: {
          x: {
            nice: true,
          },
        },
        axes: {
          x: {
            min: 0,
            tickCount: 5,
          },
        },
        geometries: [
          {
            type: 'point',
            xField: 'depth',
            yField: 'x',
            mapping: {
              shape: 'circle',
            },
          },
        ],
      },
    ],
  };

  return <Mix {...config} />;
};

ReactDOM.render(<DemoMix />, document.getElementById('container'));
