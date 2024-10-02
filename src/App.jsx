import React, { useState } from 'react';
import { Button, Container, Grid2 } from '@mui/material';
import EasyLevel from './EasyLevel';
import MediumLevel from './MediumLevel';
import HardLevel from './HardLevel';
// import ''

const App = () => {
  const [level, setLevel] = useState('easy');

  return (
    // <Container>
    //   <h1>Select Difficulty Level</h1>
    //   <div style={{ marginBottom: '20px' }}>
    //     <Button
    //       variant="contained"
    //       color={level === 'easy' ? 'primary' : 'default'}
    //       onClick={() => setLevel('easy')}
    //       style={{ marginRight: '10px' }}
    //     >
    //       Easy
    //     </Button>
    //     <Button
    //       variant="contained"
    //       color={level === 'medium' ? 'primary' : 'default'}
    //       onClick={() => setLevel('medium')}
    //       style={{ marginRight: '10px' }}
    //     >
    //       Medium
    //     </Button>
    //     <Button
    //       variant="contained"
    //       color={level === 'hard' ? 'primary' : 'default'}
    //       onClick={() => setLevel('hard')}
    //     >
    //       Hard
    //     </Button>
    //   </div>

    //   {level === 'easy' && <EasyLevel />}
    //   {level === 'medium' && <MediumLevel />}
    //   {level === 'hard' && <HardLevel />}
    // </Container>

    <Container>
      <h1 style={{ display:'flex' , justifyContent:'center' , alignItems:'center'}}> Select Difficulty Level</h1>
      <Grid2 container justifyContent="center" alignItems="center" style={{ marginBottom: '20px' }}>
        <Grid2 item>
          <Button
            variant="contained"
            color={level === 'easy' ? 'primary' : 'default'}
            onClick={() => setLevel('easy')}
            style={{ marginRight: '10px' }}
          >
            Easy
          </Button>
        </Grid2>
        <Grid2 item>
          <Button
            variant="contained"
            color={level === 'medium' ? 'primary' : 'default'}
            onClick={() => setLevel('medium')}
            style={{ marginRight: '10px' }}
          >
            Medium
          </Button>
        </Grid2>
        <Grid2 item>
          <Button
            variant="contained"
            color={level === 'hard' ? 'primary' : 'default'}
            onClick={() => setLevel('hard')}
          >
            Hard
          </Button>
        </Grid2>
      </Grid2>

      {level === 'easy' && <EasyLevel />}
      {level === 'medium' && <MediumLevel />}
      {level === 'hard' && <HardLevel />}
    </Container>

  );
};

export default App;
