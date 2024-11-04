// 게시물 저장 함수
function savePost(title, content) {
    // 저장된 게시물 목록 가져오기
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // 새로운 게시물 객체 생성
    const post = {
        id: posts.length + 1, // 게시물 ID (중복 방지를 위해 현재 게시물 수 + 1)
        title: title,
        content: content
    };

    // 새로운 게시물 추가
    posts.push(post);

    // localStorage에 저장
    localStorage.setItem('posts', JSON.stringify(posts));

    return post;
}

// 제출 이벤트 핸들러
function submit(event) {
    event.preventDefault(); // 폼 기본 제출 방지

    // 입력 값 가져오기
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // 빈 칸 체크
    if (!title || !content) {
        alert('제목과 내용을 입력해 주세요.');
        return;
    }

    // 게시물 저장
    const result = savePost(title, content);
    if (result) {
        alert('게시물이 성공적으로 저장되었습니다.');
        window.location.href = 'diarylist.html'; // 게시물 목록 페이지로 이동
    } else {
        alert('게시물 저장에 실패하였습니다. 다시 시도해 주세요.');
    }
}

// 이벤트 리스너 추가
document.getElementById('write-form').addEventListener('submit', submit);
