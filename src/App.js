import React, { useState } from 'react';
import styled from 'styled-components';
import Goals from './components/Goals';
import TodoList from './components/TodoList';
import DailySync from './components/DailySync';

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
`;

const MainSection = styled.div`
  flex: 1;
  padding: 20px;
`;

const App = () => {
  const [activeOption, setActiveOption] = useState('Goals');

  return (
    <Container>
      <Sidebar>
        <button onClick={() => setActiveOption('Goals')}>Goals</button>
        <button onClick={() => setActiveOption('TodoList')}>TodoList</button>
        <button onClick={() => setActiveOption('DailySync')}>DailySync</button>
      </Sidebar>

      <MainSection>
        {activeOption === 'Goals' && <Goals />}
        {activeOption === 'TodoList' && <TodoList />}
        {activeOption === 'DailySync' && <DailySync />}
      </MainSection>
    </Container>
  );
};

export default App;
