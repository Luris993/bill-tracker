const labels = [
    'Zakupy spożywcze',
    'Rozrywka i sport',
    'Rachunki stałe',
    'Ubrania',
    'Pozostałe wydatki',
  ];

  

  const data = {
    labels: labels,
    datasets: [{
      label: 'Tabela wydatków',
      backgroundColor: [
        'rgb(247, 247, 2)',
        'rgb(35, 247, 2)',
        'rgb(2, 75, 247',
        'rgb(247, 2, 26)',
        'rgb(227, 2, 247',
      ],
      data: [sumShopping, sumEntertainment ,sumBills ,sumClothes, sumOther],
    }]
  };

  

  const config = {
    type: 'doughnut',
    data: data,
    options: {
        
        scales: {
        },
        plugins: { 
          legend: {
            position: 'right',
            labels: {
              color: '#030e12',
              padding: 16,
              font: {
                family: 'Roboto',
              },
            },
          },
          tooltip: {
            displayColors: false,
            bodyFont: {
              size: 14,
              family: 'Robot',
            },
            footerFont: {
              size: 12,
              family: 'Robot',
            },
            callbacks: {
              footer: (ttItem) => {
                let sum = 0;
                let dataArr = ttItem[0].dataset.data;
                dataArr.map(data => {
                  sum += Number(data);
                });
                let percentage = (ttItem[0].parsed * 100 / sum).toFixed(1);
                return  `Procent: ${percentage} %`;
              },
              label: (context) => {
                return `${context.label}: ${context.raw} zł`
              }
            }
          }
        },
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  function addData() {
    myChart.data.datasets.forEach((dataset) => {
        dataset.data = [sumShopping, sumEntertainment ,sumBills ,sumClothes, sumOther];
    });
    myChart.update();
}