# python-react-study
파이썬과 리액트 풀스택 학습 기록 및 예제 모음


# 1. 기본 기술 스택 (Tech Stack)
프론트엔드 (UI/화면): React (Node.js 환경 기반)

백엔드 및 데이터 처리: Python

데이터베이스 & 백엔드 서비스(BaaS): Supabase (DB, 인증, 스토리지 활용)

버전 관리 및 코드 저장소: Git & GitHub

# 2. 개발 도구 및 패키지 매니저 세팅
코드 에디터: VSCode (Visual Studio Code)

React(Node.js) 환경: * 패키지 매니저: npm 사용

실행 명령어: 터미널에서 npm install, npm start (또는 npm run dev) 등 사용

Python 환경: * 패키지 매니저: pip 사용

규칙: 파이썬 프로젝트를 할 때는 항상 가상환경(venv)을 만들어서 패키지가 꼬이지 않게 관리하기

# 3. 프로젝트 폴더 구조 규칙 (권장)
리액트(Node.js)와 파이썬을 함께 다루므로, 하나의 깃허브 저장소 안에서 폴더를 깔끔하게 나누어 관리합니다.

Plaintext

python-react-study/ (최상위 폴더)

 ├── frontend/      # React 관련 코드 모음 (Node.js 환경)
 
 ├── python_study/  # Python 데이터 처리, API, 알고리즘 연습 코드 모음
 
 ├── docs/          # 학습 노트, AI 프롬프트 템플릿 저장소
 
 └── README.md      # 이 저장소의 전체 설명서 및 학습 로그 기록
 
 
# 4. 깃허브(GitHub) 커밋 메세지 규칙
코드를 저장(Commit)할 때는 나중에 내가 다시 봐도 알아보기 쉽게 '머릿말'을 달아서 기록합니다.

feat: 새로운 기능 추가 (예: feat: React 로그인 화면 UI 구현)

fix: 버그 수정 (예: fix: Supabase 데이터 불러오기 에러 수정)

docs: 문서 작업 (예: docs: 개발 환경 문서 업데이트)

study: 학습 및 예제 코드 (예: study: 파이썬 기초 문법 예제 작성)

## 소스 업로드 방법

 # 1. 변경된 모든 폴더와 파일을 '준비 영역'에 올립니다. (.은 모든 파일을 뜻함)
git add .
   
  git config --global core.autocrlf true  (가끔 엔터키(줄바꿈)'를 인식하는 방식이 달라서 발생하는 오류 메세지가 나올때)
     ( 윈도우 환경에서 Git을 쓸 때 줄바꿈 문자를 자동으로 똑똑하게 변환해 달라는 설정 )

 git config --global user.email "내이메일@주소.com"  => 내 이메일 설정
 git config --global user.name "내이름"  => 내 이름 설정

# 2. 이번 변경사항이 무엇인지 기록(Commit)을 남깁니다.
git commit -m "feat: 프로젝트 기본 디렉토리 구조 및 환경 세팅 완료"

# 3. 내 컴퓨터의 기록을 깃허브(원격 저장소)로 전송(Push)합니다.
git push origin main


# 5. 깃허브 레파지토리 저장소 로컬로 복제 
 로컬의 디렉토리 생성위치에서 실행 
 잘못 생성된 디렉토리 통째로 강제 삭제 (윈도우/맥 공통) : rm -rf python-react-study
git clone https://github.com/본인의유저네임/리포지토리이름.git
cd 리포지토리이름

# 6. react 프로젝트 생성  (frontend 디렉토리 자동생성됨.)
npx create-react-app frontend --template typescript

# 7. 파이썬 프로젝트 생성
mkdir python_study
cd python_study
python -m venv venv






