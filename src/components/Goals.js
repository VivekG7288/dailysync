import React, { useState } from 'react';
import styled from 'styled-components';

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoalInput = styled.input`
  margin-bottom: 10px;
`;

const GoalList = styled.ul`
  list-style: none;
  padding: 0;
`;

const GoalItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const GoalCheckbox = styled.input`
  margin-right: 5px;
`;

const Goals = () => {
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    setGoals([...goals, { content: goal, id: Date.now(), completed: false }]);
    setGoal('');
  };

  const toggleGoalStatus = (goalId) => {
    setGoals((prevGoals) =>
      prevGoals.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g))
    );
  };

  return (
    <GoalsContainer>
      <h2>Monthly Goals</h2>
      <GoalInput
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Add a new goal"
      />
      <button onClick={addGoal}>Add Goal</button>

      <GoalList>
        {goals.map((g) => (
          <GoalItem key={g.id}>
            <GoalCheckbox type="checkbox" checked={g.completed} onChange={() => toggleGoalStatus(g.id)} />
            {g.content}
          </GoalItem>
        ))}
      </GoalList>
    </GoalsContainer>
  );
};

export default Goals;
