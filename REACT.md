# 1단계: React로 메모 입력창과 리스트 만들기

frontend > src > App.tsx  내용 삭제후 아래 코드 저장

< ---- 
import React, { useState } from 'react';
import './App.css';

function App() {
  // 1. 메모들과 새로 입력할 텍스트를 저장할 '상태(State)' 정의
  const [memos, setMemos] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // 2. 등록 버튼을 눌렀을 때 실행될 함수
  const handleAddMemo = () => {
    if (inputText.trim() === '') return; // 빈 내용 입력 방지
    
    setMemos([...memos, inputText]); // 기존 메모 배열에 새 메모 추가
    setInputText(''); // 입력창 비우기
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>📝 나만의 스마트 메모장</h2>
      
      {/* 입력 영역 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메모를 입력하세요..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button onClick={handleAddMemo} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          등록
        </button>
      </div>

      {/* 리스트 출력 영역 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {memos.map((memo, index) => (
          <li
            key={index}
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              marginBottom: '8px',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            {memo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
----->

# 실행 
cd frontend
npm start

# 코드의 핵심 포인트 2가지
- useState (상태 관리): React에서는 화면에 보여줄 데이터를 그냥 변수가 아니라 useState라는 특별한 상자에 담아서 관리합니다. 이 상자 안의 값이 바뀌면, React가 알아서 화면을 실시간으로 다시 그려줍니다.
- map() 함수: 배열에 담긴 메모 개수만큼 반복해서 <li>(리스트 태그)를 화면에 뿌려주는 역할을 합니다.






# 2단계: Supabase 데이터베이스 세팅 및 연동

-------------------------------------------------------------
# 1. Supabase 프로젝트 및 테이블 생성

# Supabase 프로젝트 생성 ➔ 테이블 만들기 ➔ 리액트에 라이브러리 설치 ➔ 코드 연결

# table name : memos 
# column lists : id, create_at, content (text)  




# 2. 리액트 프로젝트 설정

# supabase library 설치 
cd frontend
npm install @supabase/supabase-js

# supabase 환경 변수(.env) 설정
frontend > .env 파일 생성후 API URL, KEY 등록

REACT_APP_SUPABASE_URL=여러분의_Project_URL  
REACT_APP_SUPABASE_ANON_KEY=여러분의_anon_public_key

# Supabase 클라이언트 생성
frontend > src > supabaseClient.ts 파일 생성
-- 리액트 어디서든 DB에 접근할 수 있도록 연동 코드를 작성

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


# 3. App.tsx 코드 수정 (DB 연동하기)

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


# server execution 
frontend > npm start 