const userid = localStorage.getItem('id') || 'jieun0906';
localStorage.setItem("idNum",  21)

function saveDiary(userId, title, date, bestPlayer, pitcher, location, gameRes, content, image) {
    const diary = {
        id : Number(Number(localStorage.getItem("idNum")) + 1),
        userId: userId,
        title: title,
        date: date,
        bestPlayer: bestPlayer,
        startingPitcher: pitcher,
        location: location,
        result: gameRes,
        content: content,
        image: image
    };

    localStorage.setItem("idNum",  Number(localStorage.getItem("idNum")) + 1)

    // 저장된 일기 목록을 가져오기
    let diaries = JSON.parse(localStorage.getItem('diaries')) || [];

    // 새로운 일기를 추가
    diaries.push(diary);

    // 다시 localStorage에 저장
    localStorage.setItem('diaries', JSON.stringify(diaries));

    return diary;
}

function submit(event) {
    event.preventDefault();

    const userId = userid;
    const title = document.getElementById('title').value;
    const date = document.getElementById('date-text').value;
    const bestPlayer = document.getElementById('best-player-text').value;
    const pitcher = document.getElementById('pitcher').value;
    const location = document.getElementById('stadium-select').value;
    const gameRes = document.getElementById('win-lose-select').value;
    const content = document.getElementById('content').value;

    console.log(userId, title, date, bestPlayer, pitcher, location, gameRes, content)

    // 이미지 파일 읽기
    const imageInput = document.getElementById('image');
    let image = null;
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            image = e.target.result;
            const result = saveDiary(userId, title, date, bestPlayer, pitcher, location, gameRes, content, image);
            if (result) {
                alert('일기가 성공적으로 저장되었습니다.');
                // window.location.href = 'diarylist.html';
            } else {
                alert('일기 저장에 실패하였습니다. 다시 시도해 주세요.');
            }
        };
        reader.readAsDataURL(file);
    } else {
        // 이미지가 선택되지 않은 경우
        const result = saveDiary(userId, title, date, bestPlayer, pitcher, location, gameRes, content, null);
        if (result) {
            alert('일기가 성공적으로 저장되었습니다.');
            // window.location.href = 'diarylist.html';
        } else {
            alert('일기 저장에 실패하였습니다. 다시 시도해 주세요.');
        }
    }

    if (!title || !date || !bestPlayer || !pitcher || !location || !gameRes || !content) {
        alert('빈칸이 있는지 확인해 주세요.');
        return;
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
