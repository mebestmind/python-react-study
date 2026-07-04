import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

interface MemoItem {
  id: number;
  created_at: string;
  content: string;
  text_length?: number; // 새로 추가! (파이썬이 안 돌았을 수도 있으니 ?(옵션) 처리)
}

function App() {
  const [memos, setMemos] = useState<MemoItem[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // 1. 메모 불러오기
  const fetchMemos = async () => {
    const { data, error } = await supabase.from('memos').select('*').order('created_at', { ascending: true });
    if (data) setMemos(data);
  };

  useEffect(() => { fetchMemos(); }, []);

  // 2. 메모 추가하기
  const handleAddMemo = async () => {
    if (inputText.trim() === '') return;
    const { data, error } = await supabase.from('memos').insert([{ content: inputText }]).select();
    if (data) {
      setMemos([...memos, data[0]]);
      setInputText('');
    }
  };

  // 3. ✨ [NEW] 메모 삭제하기 함수
  const handleDeleteMemo = async (id: number) => {
    // Supabase DB에서 해당 id 삭제
    const { error } = await supabase.from('memos').delete().eq('id', id);
    
    if (error) {
      console.error('삭제 중 에러 발생:', error.message);
    } else {
      // DB 삭제 성공 시, 리액트 화면에서도 해당 메모를 걸러냄(filter)
      setMemos(memos.filter(memo => memo.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>📝 나만의 스마트 메모장</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메모를 입력하세요..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button onClick={handleAddMemo} style={{ padding: '10px 20px', cursor: 'pointer' }}>등록</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {memos.map((item) => (
          <li key={item.id} style={{
            display: 'flex', // 가로 배치
            justifyContent: 'space-between', // 양끝 정렬
            padding: '12px',
            backgroundColor: '#f3f4f6',
            marginBottom: '8px',
            borderRadius: '4px',
            fontSize: '16px'
          }}>
            {/* ✨ [NEW] 삭제 버튼 UI 추가 */}
            {/* 👈 요 부분을 그 바로 아래에 추가하세요! */}
            {item.text_length && (
              <span style={{ fontSize: '14px', color: 'blue', marginLeft: '10px' }}>
                ({item.text_length}자)
              </span>
            )}            
            <button 
              onClick={() => handleDeleteMemo(item.id)}
              style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;