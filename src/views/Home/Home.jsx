import { useEffect, useState } from 'react';
import { getDailyTip, getDailyRecipe } from '../../services/GPTService';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Home = () => {
  const [dailyTip, setDailyTip] = useState(null);
  const [dailyRecipe, setDailyRecipe] = useState(null);

  useEffect(() => {
    Promise.all([getDailyTip(), getDailyRecipe()])
      .then((res) => {
        console.log(res);
        setDailyTip(res[0].message);
        setDailyRecipe(res[1].message);
      })
      .catch((err) => {
        console.log(err);
        setDailyTip('No daily tip today, just go to the gym! 🏃🏻');
        setDailyRecipe('No daily recipe today, just eat healthy! 🥗');
      });
  }, []);

  return (
    <div className="Home">
      <h1 className="text-center mt-5">Gymhack Homepage</h1>
      <img
        src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/1199_gym_logo-05.png"
        alt="gymhack logo"
        width="200"
        className="round mx-auto d-block"
      />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className='daily-tip card p-3 mb-3 mx-3 col-12'>
            <h2 className="text-center">Daily Tip</h2>
            <div>{dailyTip ? dailyTip : (
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <CircularProgress color="inherit" />
              </Box>
            )}</div>
          </div>

          <div className='daily-recipe card p-3 mb-3 mx-3 col-12'>
            <h2 className="text-center">Daily Recipe</h2>
            {dailyRecipe
              ? (
                <div className='overflow-auto' style={{ height: "250px" }}>
                  {dailyRecipe.split('\n').map((line, index) => <div key={index}>{line}<br/></div>)}
                </div>
              )
              : (
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                  <CircularProgress color="inherit" />
                </Box>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
