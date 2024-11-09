async function findPw(id, phone) {
    const users = JSON.parse(localStorage.getItem('users')) || []; // 로컬 스토리지에서 사용자 데이터 가져오기
    const defaultUser = fetch(url).then(res => res.json())
    console.log(users, defaultUser)

    const totalUser = [...users, ...defaultUser]
    const user = totalUser.find(user => user.id === id && user.phone === phone);
    if (user) {
        return { success: true, user: { pw: user.pw } }; // 비밀번호 찾기 성공
    } else {
        return { success: false }; // 비밀번호 찾기 실패
    }
}

async function submit(event) {
    event.preventDefault();

    const userid = document.getElementById('id').value;
    const userphone = document.getElementById('phone').value;

    if (!userid || !userphone) {
        alert('아이디 또는 전화번호를 입력해 주세요.');
        return;
    }

    const result = await findPw(userid, userphone);
    if (result && result.success) {
        alert(`${userid} 님의 비밀번호는 ${result.user.pw} 입니다.`);
        setTimeout(() => {
            window.location.href = 'login.html'; // 성공 시 이동할 페이지
        }, 3000);
    } else {
        alert('아이디 찾기에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
