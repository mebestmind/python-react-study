import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

// DB에서 가져올 데이터의 타입을 정의합니다.
interface MemoItem {
  id: number;
  created_at: string;
  content: string;
}

function App() {
  const [memos, setMemos] = useState<MemoItem[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // [기능 1] 앱이 처음 실행될 때 Supabase에서 데이터 불러오기
  const fetchMemos = async () => {
    const { data, error } = await supabase
      .from('memos')
      .select('*')
      .order('created_at', { ascending: true }); // 만든 날짜 순으로 정렬

    if (error) {
      console.error('데이터를 가져오는 중 에러 발생:', error.message);
    } else if (data) {
      setMemos(data);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  // [기능 2] 등록 버튼을 눌렀을 때 Supabase에 데이터 저장하기
  const handleAddMemo = async () => {
    if (inputText.trim() === '') return;

    const { data, error } = await supabase
      .from('memos')
      .insert([{ content: inputText }])
      .select(); // 저장된 데이터를 다시 받아옴

    if (error) {
      console.error('데이터 저장 중 에러 발생:', error.message);
    } else if (data) {
      // 성공하면 화면 리스트 갱신
      setMemos([...memos, data[0]]);
      setInputText('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>📝 나만의 스마트 메모장 (Supabase 연동)</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메모를 입력하고 DB에 저장하세요..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button onClick={handleAddMemo} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          등록
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {memos.map((item) => (
          <li
            key={item.id}
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              marginBottom: '8px',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;