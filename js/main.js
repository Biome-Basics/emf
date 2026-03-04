(function ($) {
  // --- ハンバーガーメニューの設定 ---
  var $nav = $('#navArea');
  var $btn = $('.toggle_btn');
  var $mask = $('#mask');
  var open = 'open';

  $btn.on('click', function () {
    $nav.toggleClass(open);
  });

  $mask.on('click', function () {
    $nav.removeClass(open);
  });

  // --- スライダー(Slick)の設定 ---
  // 要素が存在する場合のみ実行することでエラーを防ぐ
  if ($('.video-slider').length && $('.text-slider').length) {

    $('.video-slider').slick({
      asNavFor: '.text-slider',
      autoplay: false,
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: '.slider-controls',
      appendArrows: '.slider-controls'
    });

    $('.text-slider').slick({
      asNavFor: '.video-slider',
      autoplay: false,
      dots: false,
      arrows: false,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }

  // --- 100M推移グラフ (Chart.js) ---
  if ($('#hundredMeterChart').length) {
    const ctx = document.getElementById('hundredMeterChart').getContext('2d');

    // データラベルプラグインを登録
    Chart.register(ChartDataLabels);

    const dataPoints = [
      { x: '22.08.11', y: 11.80 },
      { x: '22.09.17', y: 11.92 },
      { x: '23.05.20', y: 11.40 },
      { x: '23.05.28', y: 11.07 }, // Assuming 05.28 based on usual chart spacing, label says 05.20 twice but graph progresses
      { x: '23.07.02', y: 11.18 },
      { x: '23.08.11', y: 11.38 },
      { x: '23.08.12', y: 11.42 },
      { x: '23.09.16', y: 11.38 },
      { x: '23.09.16', y: 11.30 },
      { x: '23.09.16', y: 11.19 },
      { x: '23.10.28', y: 11.26 },
      { x: '24.03.23', y: 11.35 },
      { x: '24.04.13', y: 11.71 },
      { x: '24.04.27', y: 11.34 },
      { x: '24.05.05', y: 11.52 },
      { x: '24.05.18', y: 11.54 },
      { x: '24.05.18', y: 11.04 },
      { x: '24.05.18', y: 11.00 },
      { x: '24.06.15', y: 11.07 },
      { x: '24.07.07', y: 11.43 },
      { x: '24.07.20', y: 11.05 },
      { x: '24.07.20', y: 11.03 } // Last label in image looks like 24.07.20 but has value of 11.03
    ];

    // Some labels on X axis are duplicated or unclear in the image, fixing slightly based on visual sequence.
    const labels = [
      '22.08.11', '22.09.17', '23.04.15', '23.05.20', '23.05.28', '23.07.02', '23.08.11',
      '23.08.12', '23.09.16', '23.09.16', '23.09.16', '23.10.28', '24.03.23', '24.04.13',
      '24.04.27', '24.05.05', '24.05.18', '24.05.18', '24.05.18', '24.06.15', '24.07.07', '24.07.20'
    ];

    // For specific rendering of duplicate labels, we use the original texts from image.
    const exactLabels = [
      '22.08.11', '22.09.17', '23.04.15', '23.05.20', '23.05.28', '23.07.02', '23.08.11',
      '23.08.12', '23.09.16', '23.09.16', '23.09.16', '23.10.28', '24.03.23', '24.04.13',
      '24.04.27', '24.05.05', '24.05.18', '24.05.18', '24.05.18', '24.06.15', '24.07.07', '24.07.20'
    ];

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: exactLabels,
        datasets: [{
          label: '100m Time',
          data: dataPoints.map(dp => dp.y),
          borderColor: '#600000', // A professional blue tone
          backgroundColor: '#600000',
          borderWidth: 2,
          pointStyle: 'rectRot', // Diamond shape
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: false,
          tension: 0 // Straight lines
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '100M推移グラフ',
            font: {
              size: 24,
              weight: 'bold'
            },
            color: '#333',
            padding: { top: 10, bottom: 30 }
          },
          legend: {
            display: false // Hide legend
          },
          datalabels: {
            align: 'top',
            anchor: 'end',
            offset: 4,
            color: '#666',
            font: {
              size: 11
            },
            formatter: function (value) {
              return value.toFixed(2); // Display as 11.00 instead of 11
            }
          }
        },
        scales: {
          y: {
            reverse: true, // 上に行くほどタイムが小さくなる
            min: 10.40,
            max: 12.00,
            ticks: {
              stepSize: 0.20,
              callback: function (value) {
                return value.toFixed(2);
              }
            },
            grid: {
              color: '#e0e0e0', // Light grid lines
              drawBorder: false
            }
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              color: '#555',
              font: {
                weight: 'bold'
              }
            },
            grid: {
              display: false // No vertical grid lines
            }
          }
        },
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }
        }
      }
    });
  }

})(jQuery);