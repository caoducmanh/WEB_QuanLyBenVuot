import { useState } from 'react';
import Button from '@mui/material/Button';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import Icon from '@mui/material/Icon';

function App() {
  return (
    <>
      <div>Hello world</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <AccessAlarmIcon color="success" />
    </>
  );
}

export default App;
