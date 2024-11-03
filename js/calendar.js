const calendarHeader = document.getElementById('calendar-header');
const calendarTitle = calendarHeader.getElementsByTagName('h1')[0];
const calendarContainer = document.querySelector('#calendar-container');

const prevMonthButton = document.getElementById('prev-month');
prevMonthButton.addEventListener('click', () => changeMonth(-1));

const nextMonthButton = document.getElementById('next-month');
nextMonthButton.onclick = () => changeMonth(1);

// 현재 날짜 구하기
var currentDate = new Date();

const userid = localStorage.getItem('id') || 'jieun0906';

// DB에서 저장된 날짜를 가져오는 함수
const fetchSavedDates = async () => {
    try {
        const response = await fetch('diaries.json'); // API 경로에 맞게 수정
        if (!response.ok) throw new Error('데이터 가져오기 실패');
        const savedDates = await response.json();
        console.log(savedDates)
        return savedDates; // DB에서 가져온 날짜 배열 반환
    } catch (error) {
        console.error(error);
        return { diaries: [] }; // 에러 발생 시 빈 배열 반환
    }
};

// click event 발생했을 때, 해야할 일 정하자
const changeMonth = async (diff) => {
    currentDate.setMonth(currentDate.getMonth() + diff);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    calendarTitle.innerText = `${year}년 ${month + 1}월`;

    // 달력 새로 그리자
    await setCalendar(currentDate); // await 추가
}

const setCalendar = async (date) => {
    const savedDates = await fetchSavedDates(); // 저장된 날짜 가져오기
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDate = new Date(year, month + 1, 0);
    const lastDateDate = lastDate.getDate();
    const lastDay = lastDate.getDay();

    const weekNames = "일월화수목금토";
    const weekNamesArray = weekNames.split("");
    let weekNameString = "";

    weekNamesArray.forEach((val) => {
        weekNameString += `<div class="item week-name">${val}</div>\n`;
    });

    calendarContainer.innerHTML = weekNameString;

    const localData = localStorage.getItem('diaries');
    const localDiaries = localData ? JSON.parse(localData) : [];

    const allDiaries = [...localDiaries, ...savedDates]; // JSON 구조에 맞게 수정
    console.log(allDiaries)
    let savedAllDiaries = new Map();
    allDiaries.forEach((val) => {
        savedAllDiaries.set(val["date"], val["result"]);
    });

    // 이전 달의 뒷날짜 표시
    const prevMonthLastDate = new Date(year, month, 0);
    const prevMonthLastDateDate = prevMonthLastDate.getDate();
    const firstDay = new Date(year, month, 1).getDay();

    for (let date = prevMonthLastDateDate - firstDay + 1; date <= prevMonthLastDateDate; date++) {
        let currentMonthDateDiv = document.createElement("div");
        currentMonthDateDiv.className = "item other-month";
        currentMonthDateDiv.textContent = date;
        calendarContainer.appendChild(currentMonthDateDiv);
    }

    // 이번 달의 모든 날짜 표시
    for (let date = 1; date <= lastDateDate; date++) {
        let currentMonthDateDiv = document.createElement("div");
        currentMonthDateDiv.className = "item";

        const realMonth = month + 1;
        const realDate = date;
        const dateString = `${year}-${realMonth.toString().padStart(2, '0')}-${realDate.toString().padStart(2, '0')}`; // "YYYY-MM-DD" 형식

        if (savedAllDiaries.has(dateString) && savedAllDiaries.get(dateString) === "Win") {
            let winEmoji = document.createElement('img');
            winEmoji.src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Blowing%20a%20Kiss.png";
            winEmoji.alt = "Win Emoji";
            winEmoji.width = 25; // 이미지 크기 설정
            winEmoji.height = 25;
            currentMonthDateDiv.appendChild(winEmoji);
        } else if (savedAllDiaries.has(dateString) && savedAllDiaries.get(dateString) === "Lose") {
            let winEmoji = document.createElement('img');
            winEmoji.src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Anxious%20Face%20with%20Sweat.png";
            winEmoji.alt = "Lose Emoji";
            winEmoji.width = 25; // 이미지 크기 설정
            winEmoji.height = 25;
            currentMonthDateDiv.appendChild(winEmoji);
        } else if (savedAllDiaries.has(dateString) && savedAllDiaries.get(dateString) === "무") {
            let winEmoji = document.createElement('img');
            winEmoji.src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Astonished%20Face.png";
            winEmoji.alt = "Lose Emoji";
            winEmoji.width = 25; // 이미지 크기 설정
            winEmoji.height = 25;
            currentMonthDateDiv.appendChild(winEmoji);
        } else {
            const dateText = document.createTextNode(date);
            currentMonthDateDiv.appendChild(dateText);     
        }
        calendarContainer.appendChild(currentMonthDateDiv);        
    }

    // 다음 달의 앞날짜 표시
    for (let date = 1; date <= (6 - lastDay); date++) {
        let currentMonthDateDiv = document.createElement("div");
        currentMonthDateDiv.className = "item other-month";
        currentMonthDateDiv.textContent = date;
        calendarContainer.appendChild(currentMonthDateDiv);
    }
};


setCalendar(currentDate);
changeMonth(0);
