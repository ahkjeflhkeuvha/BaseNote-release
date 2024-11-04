// 게시글 데이터를 로드하고 화면에 표시
const posts = [
    { id: 1, title: "첫 번째 게시글", content: "첫 번째 게시글 내용입니다." },
    { id: 2, title: "두 번째 게시글", content: "두 번째 게시글 내용입니다." },
    { id: 3, title: "세 번째 게시글", content: "세 번째 게시글 내용입니다." },
    { id: 4, title: "네 번째 게시글", content: "네 번째 게시글 내용입니다." }
];

function loadPosts() {
    const postList = document.getElementById('post-list');
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        postItem.textContent = post.title;
        postItem.onclick = () => openPopup(post);
        postList.appendChild(postItem);
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
