async function signup(_id, pw, name, phonenum, team) {
    const users = JSON.parse(localStorage.getItem('users')) || []; // 로컬 스토리지에서 사용자 데이터 가져오기

    // 사용자 중복 확인
    const existingUser = users.find(user => user.id === _id);
    if (existingUser) {
        alert('이미 사용 중인 아이디입니다.');
        return;
    }

    // 사용자 추가
    const newUser = { id: _id, pw: pw, name: name, phone: phonenum, userteam: team };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // 업데이트된 사용자 데이터 저장

    return { success: true }; // 회원가입 성공
}

async function submit(event) {
    event.preventDefault();

    const userid = document.getElementById('id').value;
    const userpw = document.getElementById('pw').value;
    const userpwck = document.getElementById('pwck').value;
    const username = document.getElementById('name').value;
    const userphone = document.getElementById('phone').value;
    const userteam = document.getElementById('team-select').value;

    if (!userid || !userpw || !userpwck || !username || !userphone || !userteam) {
        alert('빈칸이 있는 지 확인해 주세요.');
        return;
    }

    if (userpw !== userpwck) {
        alert('비밀번호를 확인해 주세요.');
        return;
    }

    const result = await signup(userid, userpw, username, userphone, userteam);
    if (result && result.success) {
        alert('회원가입 성공');
        window.location.href = '    .html'; // 로그인 성공 시 이동할 페이지
    } else {
        alert('회원가입에 실패하였습니다. 다시 시도해 주세요.');
    }
}

document.getElementById('submitButton').addEventListener('click', submit);
