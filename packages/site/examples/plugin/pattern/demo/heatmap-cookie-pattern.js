import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Heatmap } from '@ant-design/charts';

const DemoHeatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const pattern = ({ value }, color) => {
    if (value >= 90) {
      return {
        type: 'square',
        cfg: {
          size: 2,
          padding: 1,
          fill: color,
          backgroundColor: '#44120c',
          fillOpacity: 0.9,
          isStagger: false,
          rotation: 45,
        },
      };
    } else if (70 <= value && value < 90) {
      return {
        type: 'square',
        cfg: {
          size: 10,
          padding: 1,
          fill: color,
          backgroundColor: '#44120c',
          fillOpacity: 0.9,
          isStagger: false,
          rotation: 45,
        },
      };
    }

    if (60 <= value && value < 70) {
      return {
        type: 'dot',
        cfg: {
          size: 2,
          padding: 5,
          lineWidth: 1,
          fill: 'transparent',
          stroke: '#44120c',
          strokeOpacity: 0.9,
        },
      };
    }

    return {
      type: 'line',
      cfg: {
        spacing: 10,
        lineWidth: 1,
        stroke: '#fff',
        strokeOpacity: 0.5,
      },
    };
  };

  const config = {
    data,
    xField: 'name',
    yField: 'country',
    colorField: 'value',
    color: '#edaa53',
    shape: 'circle',
    heatmapStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(0,0,0,0.3)',
    },
    pattern,
  };

  return <Heatmap {...config} />;
};

ReactDOM.render(<DemoHeatmap />, document.getElementById('container'));
