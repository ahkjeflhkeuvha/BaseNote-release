// 게시글을 로드하는 함수
function loadPosts() {
    const postList = document.getElementById('post-list');

    // localStorage에서 데이터 가져오기
    let localPosts = JSON.parse(localStorage.getItem('posts')) || [];

    // post.json 파일에서 데이터 가져오기
    fetch('post.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            return response.json();
        })
        .then(jsonPosts => {
            // JSON 게시물과 localStorage 게시물을 합칩니다.
            const allPosts = [...localPosts, ...jsonPosts];

            // 모든 게시물을 리스트에 추가
            allPosts.forEach(post => {
                const postItem = document.createElement('div');
                postItem.className = 'post-item';
                postItem.textContent = post.title;
                postItem.onclick = () => openPopup(post);
                postList.appendChild(postItem);
            });
        })
        .catch(error => {
            console.error('게시글 로드 중 오류 발생:', error);
        });
}

// 팝업 열기
function openPopup(post) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');

    // 팝업 내용을 div 형식으로 구성
    popupContent.innerHTML = `
        <div class="popup-header">
            <h3>${post.title}</h3>
        </div>
        <div class="popup-body">
            <p>${post.content}</p>
        </div>
    `;
    popup.style.display = 'flex';
}

// 팝업 닫기
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

// 페이지가 로드되면 게시글 목록을 표시
window.onload = loadPosts;

const plusBut = document.getElementsByClassName('plus-button')[0];
plusBut.addEventListener('click', () => {
    window.location.href = 'upload.html';
});
