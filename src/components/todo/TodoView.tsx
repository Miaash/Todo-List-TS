import { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebaseConfig';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { todoType } from '../../types/\btypes';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const TodoView = ({ userUid }: { userUid: string }) => {
  const date = new Date().toLocaleDateString();
  const [todoItems, setTodoItems] = useState<todoType[]>([]);

  useEffect(() => {
    // onSnapshot메서드는 데이터에 crud이벤트가 감지 되었을 때 실행함.
    // 데이터의 변화를 실시간으로 알려주는 리스너
    // forEach방식보다 더 적게 리렌더링함,
    // 실시간으로 데이터가 변동된 사항을 보여줌
    onSnapshot(
      firestore.collection(`${userUid}`).orderBy('isChecked'),
      (snapshot: QuerySnapshot<DocumentData>) => {
        setTodoItems(
          snapshot.docs &&
            snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            })
        );
      }
    );
  }, [todoItems, userUid]);

  return (
    <MainWrapper>
      <TitleBox> Todo List </TitleBox>
      <DateBox>오늘은 {date} 입니다.</DateBox>
      <TodoBox>
        {todoItems && todoItems.length ? (
          <>
            {todoItems?.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </>
        ) : (
          <TextBox>Todo를 추가해보세요!</TextBox>
        )}
      </TodoBox>
    </MainWrapper>
  );
};

export default TodoView;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
`;

const TitleBox = styled.p`
  font-size: 30px;
  margin-top: 50px;
  font-weight: 600;
`;

const DateBox = styled.p`
  margin-top: 5px;
  font-size: 20px;
  color: #15b887;
`;

const TodoBox = styled.div`
  width: 100%;
`;

const TextBox = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  color: gray;
`;
