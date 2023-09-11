// Original labeling suggestions based on:
// http://trutzhaase.eu/wp/wp-content/uploads/The-2016-Pobal-HP-Deprivation-Index-Introduction-07.pdf
// ----------------------------------
// bin, description, color
// over 30, extremely affluent, dark blue
// 20 to 30, very affluent medium, blue
// 10 to 20, affluent, medium green
// 0 to 10, marginally above average, light green
// 0 to -10, marginally below average, light yellow
// -10 to -20, disadvantaged medium, yellow
// -20 to -30, very disadvantaged, orange
// below -30, extremely disadvantaged, red

export const choroplethScale = [
    {
        stop: -30,
        range: '-20 to -30',
        title: 'Very disadvantaged',
        color: '#AE3C1C' // 'red'
    },
    {
        stop: -20,
        range: '-10 to -20',
        title: 'Disadvantaged',
        color: '#E4A679' // 'orange'
    },
    {
        stop: -10,
        range: '0 to -10',
        title: 'Marginally below average',
        color: '#EFDFC6' // 'light orange'
    },
    {
        stop: 0,
        range: '0 to 10',
        title: 'Marginally above average',
        color: '#DADEC6' // 'light green'
    },
    {
        stop: 10,
        range: '10 to 20',
        title: 'Affluent',
        color: '#94B59E' // 'medium green'
    },
    {
        stop: 20,
        range: '20 to 30',
        title: 'Very affluent ',
        color: '#167456' // 'medium blue'
    },
];
