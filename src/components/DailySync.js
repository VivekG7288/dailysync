import React, { useState } from 'react';
import styled from 'styled-components';

const DailySyncContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DailySyncTextArea = styled.textarea`
  margin-bottom: 10px;
  width: 80%;
  height: 100px;
`;

const DailySyncComp = () => {
  const [dailyNote, setDailyNote] = useState('');
  const [notes, setNotes] = useState([]);

  const saveNote = () => {
    if (dailyNote.trim() !== '') {
      setNotes([...notes, { content: dailyNote, id: Date.now() }]);
      setDailyNote('');
    }
  };

  const downloadNotes = () => {
    const combinedNotes = notes.map((note) => `Note ${note.id}:\n${note.content}\n\n`).join('\n');
    const blob = new Blob([combinedNotes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DailySyncNotes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DailySyncContainer>
      <h2>Daily Sync</h2>
      <DailySyncTextArea
        value={dailyNote}
        onChange={(e) => setDailyNote(e.target.value)}
        placeholder="Type your daily standup notes..."
      />
      <button onClick={saveNote}>Save Note</button>
      <button onClick={downloadNotes}>Download Notes</button>
    </DailySyncContainer>
  );
};

export default DailySyncComp;
