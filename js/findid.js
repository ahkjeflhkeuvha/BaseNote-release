async function findId(name, phone) {
    const users = JSON.parse(localStorage.getItem('users')) || []; // 로컬 스토리지에서 사용자 데이터 가져오기
    const defaultUser = fetch(url).then(res => res.json())
    console.log(users, defaultUser)

    const totalUser = [...users, ...defaultUser]
    const user = totalUser.find(user => user.name === name && user.phone === phone);
    if (user) {
        return { success: true, user: { _id: user.id } }; // 사용자가 찾은 경우
    } else {
        return { success: false, message: '사용자를 찾을 수 없습니다.' }; // 사용자가 없는 경우
    }
}

async function submit(event) {
    event.preventDefault();

    const username = document.getElementById('name').value;
    const userphone = document.getElementById('phone').value;

    if (!username || !userphone) {
        alert('이름 또는 전화번호를 입력해 주세요.');
        return;
    }

    const result = await findId(username, userphone);
    if (result && result.success) {
        alert(`${username} 님의 아이디는 ${result.user._id} 입니다.`);
        setTimeout(() => {
            window.location.href = 'main.html'; // 성공 시 이동할 페이지
        }, 3000);
    } else {
        alert(result.message || '아이디 찾기에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
