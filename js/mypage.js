document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage에서 사용자 정보 가져오기
    const userid = localStorage.getItem('id') || 'jieun0906';
    const userpw = localStorage.getItem('pw');
    const username = localStorage.getItem('name');
    const userphone = localStorage.getItem('phonenum');
    const userteam = localStorage.getItem('team');
    const userimg = localStorage.getItem('image'); // 'img'를 'image'로 수정하여 일관성 유지

    // DOM 요소 가져오기
    const userimgImg = document.getElementById('userImg');
    const useridP = document.getElementById('userid');
    const userphoneP = document.getElementById('phonenum');
    const userpwP = document.getElementById('password');
    const userteamP = document.getElementById('team');

    // 전화번호 및 비밀번호 마스킹 처리
    const fixedPhone = maskPhoneNumber(userphone);
    const fixedPw = maskPw(userpw);

    // 사용자 정보 표시
    useridP.innerText = userid;
    userphoneP.innerHTML = fixedPhone;
    userpwP.innerHTML = fixedPw;
    userteamP.innerHTML = userteam;

    // 이미지 설정
    userimgImg.src = userimg === undefined ? userimg : "images/logo.jpg"; // userimg가 null일 경우 기본 이미지 사용

    // 전화번호 마스킹 함수
    function maskPhoneNumber(userphone) {
        if (!userphone) return ''; // 전화번호가 없을 경우 빈 문자열 반환

        let phoneStr = userphone.toString();
        let maskedPart = phoneStr.slice(4, 8).replace(/\d/g, '*');
        let maskedPhone = phoneStr.slice(0, 4) + maskedPart + phoneStr.slice(8);
        let formattedPhone = maskedPhone.slice(0, 3) + '-' + maskedPhone.slice(3, 7) + '-' + maskedPhone.slice(7);

        return formattedPhone;
    }

    // 비밀번호 마스킹 함수
    function maskPw(userpw) {
        if (!userpw) return ''; // 비밀번호가 없을 경우 빈 문자열 반환

        return '*'.repeat(userpw.length); // 비밀번호 길이에 맞춰 '*' 반복
    }
});
