import Chart from 'chart.js/auto';




const MonthChart = () => {


    fetch('https://huangpeixin.github.io/demo/data/strava-activities.json')
        .then(response =>  response.json())
        .then(data => {
            initCyclingChart(data)
        })

    function initCyclingChart (cyclingData) {

        // Parse and process data
        const parsedData = cyclingData.map(entry => ({
            date: new Date(entry.start_time),
            distance: entry.distance_raw/1000,
        }));

        // Group data by month
        const groupedData = parsedData.reduce((acc, entry) => {
            const month = entry.date.getMonth() + 1;
            const year = entry.date.getFullYear();
            const day = entry.date.getDate();
            const key = `${year}-${month<10?'0':''}${month}`;

            // init
            acc[key] = acc[key] || { day, totalDistance: 0, dueDistance: 0 };

            // reduce
            acc[key].totalDistance += entry.distance;
            if (day <= new Date().getDate()) {
                acc[key].dueDistance += entry.distance;
            }
            return acc;
        }, {});
        console.info(groupedData)

        // Prepare data for chart  
        const labels = Object.keys(groupedData).map(key => key).sort().slice(-6);
        const barData = labels.map(key => groupedData[key].totalDistance);
        const lineData = labels.map((key, index) => ({
            x: key.substring(5),
            y: groupedData[key].dueDistance,
        }));
        console.info(labels.map(i => i.substring(5)))
        // Create bar and line charts 
        const ctx = document.getElementById('cyclingChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.map(i => i.substring(5)),
                datasets: [{
                    label: '里程',
                    data: barData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    barThickness: 10, // 调整条形的宽度
                }, {
                    label: '往月同期',
                    data: lineData,
                    type: 'line',
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    lineTension: 0.1,
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        labels: labels.map(i => i.substring(5)),
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 100, // 设置刻度的步长
                            maxTicksLimit: 100 // 设置最大刻度数量
                        },
                    }
                }
            }
        });
    }

    return (
        <canvas id="cyclingChart"></canvas>
    )
};

export default MonthChart;
