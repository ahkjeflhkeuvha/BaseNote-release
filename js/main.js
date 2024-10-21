const userid = localStorage.getItem('id');

async function locate(event) {
    console.log(userid);
    window.location.href = 'basenote.html';
}

document.addEventListener('DOMContentLoaded', () => {
    async function loadPercent() {
        try {
            // 일기 목록 데이터를 가져옵니다
            const response = await fetch(`http://localhost:3000/diaries/basenote/${userid}`);
            const data = await response.json();
            const diaries = data["diaries"];
            
            // 승, 무, 패 개수 계산
            let winCount = 0, noneCount = 0, loseCount = 0;
            
            diaries.forEach((diary) => {
                const result = diary.result;  // diary.result는 승, 무, 패 결과

                if (result === "승") winCount++;
                else if (result === "패") loseCount++;
                else if (result === "무") noneCount++;
            });

            // 총 경기 수 계산
            const totalCount = winCount + noneCount + loseCount;

            // 승, 무, 패 비율 계산
            const winPercentage = ((winCount / totalCount) * 100).toFixed(2);
            const nonePercentage = ((noneCount / totalCount) * 100).toFixed(2);
            const losePercentage = ((loseCount / totalCount) * 100).toFixed(2);

            // 차트에 사용할 데이터 생성
            const totalResults = {
                win: winCount,
                none: noneCount,
                lose: loseCount
            };

            // 차트 설정
            const ctx = document.getElementById('resultChart').getContext('2d');
            const resultChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [''],  // 하나의 막대에 승무패를 누적 표시
                    datasets: [
                        {
                            label: '승',
                            data: [totalResults.win],  // 승 데이터
                            backgroundColor: '#4CAF50',  // 초록색
                        },
                        {
                            label: '무',
                            data: [totalResults.none],  // 무 데이터
                            backgroundColor: '#FFC107',  // 노란색
                        },
                        {
                            label: '패',
                            data: [totalResults.lose],  // 패 데이터
                            backgroundColor: '#F44336',  // 빨간색
                        }
                    ]
                },
                options: {
                    indexAxis: 'y', // 막대를 가로로 변경
                    scales: {
                        x: {
                            stacked: true, // X축 스택 활성화
                            display: false // X축 숨김
                        },
                        y: {
                            stacked: true, // Y축 스택 활성화
                            display: false // Y축 숨김
                        }
                    },
                    plugins: {
                        legend: {
                            display: false, // 범례 숨김
                        },
                        tooltip: {
                            enabled: false // 툴팁 비활성화
                        },
                        datalabels: {
                            color: '#fff', // 값의 색상
                            anchor: 'center', // 값 위치
                            align: 'center', // 값 정렬
                            font: {
                                size: 50  // 레이블 크기 조정
                            },
                            formatter: (value, context) => {
                                // 각 데이터에 맞는 승률을 표시
                                if (context.dataset.label === '승') {
                                    return winPercentage + '%';
                                } else if (context.dataset.label === '무') {
                                    return nonePercentage + '%';
                                } else if (context.dataset.label === '패') {
                                    return losePercentage + '%';
                                }
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels] // datalabels 플러그인 사용
            });
        } catch (error) {
            console.error('Failed to load diaries:', error);
        }
    }

    loadPercent();
});

document.getElementById('basenote-a').addEventListener('click', locate);
