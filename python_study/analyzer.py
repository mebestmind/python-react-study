import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

print("🚀 데이터베이스에서 메모 분석을 시작합니다...\n")
response = supabase.table('memos').select('*').execute()
memos = response.data

for memo in memos:
    memo_id = memo['id']
    content = memo['content']
    
    # 1. 글자 수 분석
    length = len(content) 
    
    # 2. 분석 결과(글자 수)를 다시 DB에 업데이트 (text_length 컬럼에 저장)
    supabase.table('memos').update({"text_length": length}).eq("id", memo_id).execute()
    
    print(f"[{memo_id}번 메모] 업데이트 완료: {length}자")

print("\n✅ 분석 및 DB 업데이트가 완료되었습니다!")