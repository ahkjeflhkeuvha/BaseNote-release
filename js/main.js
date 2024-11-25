const userid = localStorage.getItem('id') || 'jieun0906';
const stadiumTeam = {
    "기아 타이거즈" : "광주 KIA 챔피언스필드",
    "두산 베어스" : "서울종합운동장 야구장",
    "엘지 트윈스" : "서울종합운동장 야구장",
    "KT 위즈" : "수원 케이티 위즈 파크",
    "SSG 랜더스" : "인천 SSG 랜더스필드",
    "NC 다이노스" : "창원 NC 파크",
    "롯데 자이언츠" : "부산 사직 야구장",
    "삼성 라이온즈" : "대구 삼성 라이온즈 파크",
    "한화 이글스" : "대전 한화생명 이글스파크",
    "키움 히어로즈" : "고척 스카이돔"
}

async function locate(event) {
    console.log(userid);
    window.location.href = 'basenote.html';
}

document.addEventListener('DOMContentLoaded', () => {
    async function loadPercent() {
        try {
            // 일기 목록 데이터를 가져옵니다
            const response = await fetch('diaries.json');
            const data = await response.json();
            const localData = localStorage.getItem('diaries');
            const localDiaries = localData ? JSON.parse(localData) : [];

            const allDiaries = [...localDiaries, ...data];

            // Retrieve user information from local storage
            const userid = localStorage.getItem('id') || 'jieun0906';
            const users = await fetch('clientInfo.json')
            const userData = await users.json()
            const localUsers = localStorage.getItem('users')
            const localUser = localUsers ? JSON.parse(localUsers) : []
            const allUser = [...userData, ...localUser ]
            console.log(allUser)
            const userTeam = allUser.find(user => user.id === userid).userteam || '기아 타이거즈'
            console.log(userTeam)
            const userHome = stadiumTeam[userTeam]
            console.log(userTeam, userHome)

            // Initialize counters
            let winCount = 0, noneCount = 0, loseCount = 0, home = 0, ex = 0, team = 0;

            // Iterate through each diary entry
            allDiaries.forEach((diary) => {
                if(diary.userId === userid){
                    const result = diary.result;  // 승, 무, 패 result
                    const stadium = diary.location;  // 경기장 location
                    console.log(stadium, userHome)
                    // Increment win/none/lose counters based on result
                    if (result === "승") winCount++;
                    else if (result === "패") loseCount++;
                    else if (result === "무") noneCount++;

                    if(stadium === userHome) team++
                    else if(stadium === "집관") home++
                    else ex++
                }
            });

            const homeDiv = document.querySelector('.home > p')
            const exDiv = document.querySelector('.ex > p')
            const teamDiv = document.querySelector('.team > p')

            homeDiv.textContent = home + "번"
            exDiv.textContent = ex + "번"
            teamDiv.textContent = team + "번"

            // 총 경기 수 계산
            const totalCount = winCount + noneCount + loseCount;

            // 승, 무, 패 비율 계산
            const winPercentage = ((winCount / totalCount) * 100).toFixed(2);
            const nonePercentage = ((noneCount / totalCount) * 100).toFixed(2);
            const losePercentage = ((loseCount / totalCount) * 100).toFixed(2);

            const typeDiv = document.querySelector('.type > p')

            if(winPercentage > nonePercentage + losePercentage) {
                typeDiv.textContent = "당신은 승리요정!"
            } else if(nonePercentage > winPercentage + losePercentage) {
                typeDiv.textContent = "당신은 동점요정!"
            } else {
                typeDiv.textContent = "당신은 액땜요정!"
            }

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
                    responsive: true, // 반응형으로 그래프 조정
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
                                size: 16  // 레이블 크기 조정
                            },
                            formatter: (value, context) => {
                                // 각 데이터에 맞는 승률을 표시
                                if (context.dataset.label === '승') {
                                    if(winPercentage < 0.1) return ''
                                    return '승 ' + winPercentage + '%';
                                } else if (context.dataset.label === '무') {
                                    if(nonePercentage  < 0.1) return ''
                                    return '무 ' + nonePercentage + '%';
                                } else if (context.dataset.label === '패') {
                                    if(losePercentage  < 0.1) return ''
                                    return '패 ' + losePercentage + '%';
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
