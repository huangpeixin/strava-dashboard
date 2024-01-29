// CalendarHeatmap.js
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import dayjs from 'dayjs';





const CalendarHeatmap = () => {
    
    const cal = new CalHeatmap();
    const id = 'cal-heatmap-'+uuidv4();
    cal.on('fill', () => {
        var scrollContainer = document.getElementById("cal-heatmap-container");
        // 将滚动条滚动到最右侧
        scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    });
    cal.paint({
        itemSelector: '#'+id,
        domain: { type: 'month', },
        subDomain: { type: 'ghDay', sort: 'asc' },
        range: 6,
        theme: 'light',
        date: {
            locale: 'zh',
            start: dayjs().subtract(5, 'month'),
            highlight: [new Date()],
            timezone: 'Asia/Shanghai',
        },
        data: {
            source: 'https://huangpeixin.github.io/demo/data/strava-activities.json',
            type: 'json',
            x: 'start_time',
            // y: d => d.commute ? 0 : d.distance_raw / 1000,
            y: d => d.distance_raw / 1000,
        },
        scale: {
            color: {
                range: ['#ededed','#2E9774'],
                domain: [0, 60],
            },
        },
    }, [
        [Tooltip, {text: (a,b) => `${new Date(a).toLocaleDateString()} - ${Math.trunc(b)}km`}],
    ]);
    
    return (
        <div style={{width: '100%', overflowX: 'auto'}} id="cal-heatmap-container"><div id={id}></div></div>
    )
};

export default CalendarHeatmap;
