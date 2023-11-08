import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';

export default function NestedListItems({ exercises, muscleGroup }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="li"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText>
          <Typography fontWeight="bold">
            {muscleGroup}: {exercises.amount}
          </Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {exercises.exercisesInvolved.map((exercise) => (
            <ListItemText key={`${exercise}-${exercises.id}`}>
              <Typography variant="overline">{exercise}</Typography>
            </ListItemText>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
