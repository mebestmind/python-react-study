import os
from dotenv import load_dotenv
from supabase import create_client

# 1. .env 파일에서 URL과 KEY 읽어오기
load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

print("URL 확인:", url)
print("KEY 확인:", key)

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