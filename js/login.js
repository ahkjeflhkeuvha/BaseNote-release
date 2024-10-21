async function login(_id, pw) {
    const users = JSON.parse(localStorage.getItem('users')) || []; // 로컬 스토리지에서 사용자 데이터 가져오기
    console.log(users)

    const user = users.find(user => user.id === _id && user.pw === pw);
    if (user) {
        localStorage.setItem('id', _id)
        return { success: true, userinfo: user }; // 로그인 성공
    } else {
        return { success: false }; // 로그인 실패
    }
}

async function submit(event) {
    event.preventDefault();

    const userid = document.getElementById('id').value;
    const userpw = document.getElementById('pw').value;

    if (!userid || !userpw) {
        alert('아이디 또는 비밀번호를 입력해 주세요.');
        return;
    }

    const result = await login(userid, userpw);

    if (result && result.success) {
        alert('로그인 성공');
        localStorage.setItem('id', userid);
        localStorage.setItem('pw', userpw);
        localStorage.setItem('name', result.userinfo.name);
        localStorage.setItem('phonenum', result.userinfo.phone);
        localStorage.setItem('image', result.userinfo.image);
        localStorage.setItem('team', result.userinfo.userteam);

        window.location.href = 'main.html';
    } else {
        alert('로그인에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
