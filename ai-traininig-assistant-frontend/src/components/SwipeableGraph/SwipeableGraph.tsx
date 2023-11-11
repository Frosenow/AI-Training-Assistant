import { useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { Collapse, Slider, Stack } from '@mui/material';
import { LineProgressionGraph } from './LineProgressionGraph';
import { ProgressionTable } from '../ProgressionTable/ProgressionTable';
import { PrettoSlider } from './styles/styles';

export default function SwipeableGraph({ plottingData }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [predictionSpan, setPredictionSpan] = useState<number>(0);
  const maxSteps = plottingData.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{plottingData[activeStep].exerciseName}</Typography>
      </Paper>
      <Stack>
        <LineProgressionGraph
          progressionData={plottingData[activeStep]}
          predictionSpan={predictionSpan}
        />
        <ProgressionTable progressionData={plottingData[activeStep]} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 1,
          }}
        >
          <Button
            color="success"
            variant="contained"
            size="small"
            aria-label="expand row"
            onClick={() => {
              if (open) {
                setPredictionSpan(0);
              }
              setOpen(!open);
            }}
          >
            Predict Progress
          </Button>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ width: '50%', mt: 2 }}
          >
            <Typography id="non-linear-slider" gutterBottom align="center">
              Days ahead: {predictionSpan}
            </Typography>
            <PrettoSlider
              value={predictionSpan}
              onChange={(_: Event, newValue: number | number[]) =>
                setPredictionSpan(newValue)
              }
              disabled={false}
              max={30}
              min={0}
              step={1}
              size="medium"
              valueLabelDisplay="on"
            />
          </Collapse>
        </Box>
      </Stack>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
