# 파이썬(Python)으로 내 메모 데이터 다루기

## 1️⃣ 파이썬 환경 준비 및 라이브러리 설치

### 파이썬 폴더로 이동
```bash
cd ../python_study
```

### 파이썬 가상환경 켜기 (윈도우 기준)
```bash
.\venv\Scripts\activate
```
> 💡 터미널 입력창 왼쪽에 `(venv)`라는 글자가 나타났다면 가상환경이 잘 켜진 것입니다.

### 필수 패키지 설치
가상환경이 켜진 상태에서, 파이썬용 Supabase 통신 패키지와 환경변수 읽기 패키지를 설치합니다.

```bash
pip install supabase python-dotenv
```

---

## 2️⃣ 파이썬용 환경변수(.env) 만들기

`python_study` 폴더 안에 새 파일 `.env`를 만들고 아래 내용을 추가합니다.
> ℹ️ 파이썬은 `REACT_APP_` 이라는 접두사가 필요 없습니다.

```env
SUPABASE_URL=https://fjapwqhezsuyuwohgjvg.supabase.co
SUPABASE_KEY=복사해둔_sb_publishable_...긴_문자열
```

---

## 3️⃣ 데이터 분석 파이썬 스크립트 작성

`python_study` 폴더 안에 `analyzer.py` 파일을 새로 만들고 아래 코드를 복사해 넣습니다.

```python
import os
from dotenv import load_dotenv
from supabase import create_client

# 1. .env 파일에서 URL과 KEY 읽어오기
load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

# 2. Supabase 연결하기
supabase = create_client(url, key)

# 3. 데이터베이스에서 메모 읽어오기 (Select)
print("🚀 데이터베이스에서 메모를 불러오는 중...\n")
response = supabase.table('memos').select('*').execute()
memos = response.data

# 4. 가져온 데이터 분석하기
print(f"✅ 총 작성된 메모 수: {len(memos)}개")

if len(memos) > 0:
    print("-" * 30)
    for i, memo in enumerate(memos):
        content = memo['content']
        text_length = len(content) # 글자 수 세기
        
        print(f"[{i+1}번 메모] {content}")
        print(f" ➔ 글자 수: {text_length}자")
    print("-" * 30)
else:
    print("작성된 메모가 없습니다. 리액트 화면에서 메모를 먼저 추가해보세요!")
```

---

## 4️⃣ 파이썬 코드 실행해보기

```bash
python analyzer.py
```
