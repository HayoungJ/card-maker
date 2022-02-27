# Firebase 사용해보기
1. Firebase Auth를 이용한 로그인 기능 추가
2.  Firebase Realtime Database를 이용한 정보 저장
3.  Firebase Hosting를 이용한 배포

## 프로젝트 목표
1. 공식문서를 직접 읽고, 문서를 기반으로 Firebase 기능 적용해보기
2. local storage를 이용해 여러 개의 창에서 데이터 sync 유지하기

## 프로젝트 배포 링크
https://business-card-maker-ec599.web.app

## 프로젝트 기본 기능

### 회원가입 + 로그인
![image](https://user-images.githubusercontent.com/59152882/155871480-d29aa3ee-a595-4f0e-a16e-0253439d272d.png)
![image](https://user-images.githubusercontent.com/59152882/155871491-7d3a267b-c596-4ffa-904d-e2936666cbac.png)
![image](https://user-images.githubusercontent.com/59152882/155871517-b3eac997-3042-4551-9f06-6c2a5b99d95c.png)

> Firebase Auth에서 제공하는 기능을 통해 이메일+비밀번호, 구글 계정, 깃허브 계정으로 로그인 기능을 구현하였다. 구글, 깃허브의 경우 로그인 페이지에서 선택 시 가입과 로그인이 모두 가능하다. 이메일+비밀번호의 경우 회원가입 페이지에서 데이터 입력 후 가입 가능하다.

> 로그인 페이지에서는 [New User? Register Here] 버튼을 통해 회원가입 페이지로 이동할 수 있고, 회원가입 페이지에서는 [Already have an account?] 버튼을 통해 로그인 페이지로 이동할 수 있다. 만약 로그인 페이지나 회원가입 페이지에서 에러가 발생할 경우, 에러가 발생한 input이 강조되고 하단에 실패 사유가 표시된다.

### 카드 대시보드
![image](https://user-images.githubusercontent.com/59152882/155871778-16cc8b22-073c-446e-a1d2-bd157b930589.png)
![Hnet-image](https://user-images.githubusercontent.com/59152882/155871692-928c0c13-632f-461c-be87-abd39b554457.gif)

> 카드 대시보드에서는 카드 추가 및 기존에 등록해둔 카드들을 확인할 수 있다. [+] 버튼을 통해 카드를 추가하면, UI에 새 카드가 표시됨가 더불어 Firebase realtime database에 빈 정보값들을 가진 새로운 카드가 추가된다. 카드에 데이터를 입력하면, 해당 데이터가 local storage에 card 데이터가 반영되고, local storage card 데이터에 변동이 있을 시 state에서 따라 변경이 일어나 애플리케이션을 실행하고 있는 모든 창이 re-rendering 된다.

> 카드 이미지 업로드는 Cloudinary를 활용하였고, 사용자가 사진 업로드 시 자동으로 카드에 필요한 사이즈 + 모양(원형)을 맞추어 Cloudinary 서버에 업로드 되도록 하였다.

> 카드 우측 상단의 [x] 버튼을 클릭 해 카드 삭제가 가능하도록 구현하였다.

> 지금은 input이 변경될 때마다 local storage에 변경이 따라 일어나고 있는데, 기능을 실험해보기 위해 이렇게 구현을 하기는 했지만 UX적으로 의미있는 기능이 아님에도 과도한 부하를 발생하고 있다고 생각되어 후에는 다른 방식으로 수정할 생각이다.
