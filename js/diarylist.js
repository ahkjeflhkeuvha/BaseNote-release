
    const userid = localStorage.getItem('id');

    // 일기 목록을 가져오고 렌더링하는 함수
    async function loadDiaries() {
        try {
            // diaries.json에서 데이터 가져오기
            const response = await fetch('./diaries.json'); // 경로를 확인하세요
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonDiaries = await response.json();
    
            const localData = localStorage.getItem('diaries');
            const localDiaries = localData ? JSON.parse(localData) : [];
            console.log(localDiaries)
    
            // 기존 데이터와 새로 가져온 데이터를 합침
            const allDiaries = [...localDiaries, ...jsonDiaries];
            console.log(allDiaries);
    
            console.log(userid);
    
            // `userid`와 일치하는 다이어리만 필터링
            const userDiaries = allDiaries.filter(diary => diary.userId === userid);
    
            const diaryList = document.getElementById('diary-list');
            diaryList.innerHTML = ''; // 이전 다이어리 목록 초기화
    
            console.log(jsonDiaries, userDiaries, userid);
    
            // 필터링된 다이어리 목록을 렌더링
            userDiaries.forEach(diary => {
                const title = diary.content.substr(0, 10);
                const text = diary.content.substr(0, 80);
    
                const diaryElement = document.createElement('div');
                diaryElement.setAttribute("class", "diary-content");
                diaryElement.innerHTML = `
                    <img src="images/logo.jpg" alt="">
                    <h5>${title}</h5>
                    <div>
                        <p>${diary.date}</p>
                        <p>${diary.bestPlayer}</p>
                        <p>${diary.result}</p>
                        ${diary.result === '승' 
                            ? '<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Blowing%20a%20Kiss.png" alt="Face Blowing a Kiss" width="25" height="25" />'
                            : '<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Anxious%20Face%20with%20Sweat.png" alt="Anxious Face with Sweat" width="25" height="25" />'}
                    </div>
                    <p>${text}</p>
                    <button onclick="openPopup(${diary.id})">Read More</button>
                `;
                diaryList.appendChild(diaryElement);
            });
        } catch (error) {
            console.error('Failed to load diaries:', error); // 더 자세한 에러 메시지 출력
        }
    }
    
    loadDiaries();
    

    // 팝업을 여는 함수
    window.openPopup = async function(id) {
        console.log(id)
        try {
            // `localStorage`에서 저장된 다이어리 데이터를 가져옴
            const response = await fetch('./diaries.json'); // 경로를 확인하세요
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonDiaries = await response.json();
    
            const localData = localStorage.getItem('diaries');
            const localDiaries = localData ? JSON.parse(localData) : [];
    
            // 기존 데이터와 새로 가져온 데이터를 합침
            const allDiaries = [...localDiaries, ...jsonDiaries];
            const userDiaries = allDiaries.filter(diary => diary.id === id);

            console.log(userDiaries)

            const popupContent = document.getElementById('popup-content');
            popupContent.innerHTML = `
                <div class="popup-items">
                    <div id="date">
                        <p>날짜</p>
                        <p>${userDiaries[0].date}</p>
                    </div>
                    <div id="best-player">
                        <p>베스트 플레이어</p>
                        <p>${userDiaries[0].bestPlayer}</p>
                    </div>
                    <div id="pitcher">
                        <p>선발투수</p>
                        <p>${userDiaries[0].startingPitcher}</p>
                    </div>
                    <div id="stadium">
                        <p>경기장</p>
                        <p>${userDiaries[0].location}</p>
                    </div>
                    <div id="win-lose">
                        <p>승/패</p>
                        <p>${userDiaries[0].result}</p>
                    </div>
                </div>
                <div class="popup-title">
                    <p>제목</p>
                    <p>${userDiaries[0].title}</p>
                </div>
                <div class="popup-contents">
                    <p>일기</p>
                    <p>${userDiaries[0].content}</p>
                </div>
            `;

            const popup = document.getElementById('popup');
            popup.classList.add('active');
        } catch (error) {
            console.error('Failed to load diary:', error);
        }
    };

    window.closePopup = function() {
        const popup = document.getElementById('popup');
        popup.classList.remove('active');
    };

    const plusBut = document.getElementsByClassName('plus-button')[0];
    plusBut.addEventListener('click', () => {
        window.location.href = 'basenote.html';
    });