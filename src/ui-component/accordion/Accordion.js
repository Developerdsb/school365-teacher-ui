import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Grid } from '@mui/material';

const AccordionStyle = styled(Accordion)(({ theme, isIncorrect, hasNoBorder }) => ({
  border: hasNoBorder ? '1px solid' : '1px solid transparent',
  borderColor: isIncorrect ? '#FF0000' : theme.palette.secondary.dark,
  marginBottom: '10px',
  borderRadius: '10px',
  '&.Mui-expanded': {
    borderColor: 'transparent' // Set border color to transparent when expanded
  },
  '&:first-child': {
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
  },
  '&:last-child': {
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px'
  },
  '&:before': {
    position: 'unset'
  }
}));

function Accordions({ list, handleChangeRadio, isSelectedRadio }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {list.map((listItem) => {
        console.log('iitttteeeemmssssssss', listItem, listItem.answers);
        const hasNoBorder = !listItem.isCorrect && listItem.answers.some((answer) => answer.rightAnswer && !answer.selected);
        return (
          <AccordionStyle
            key={listItem.id}
            expanded={expanded === listItem.id}
            onChange={handleChange(listItem.id)}
            isIncorrect={!listItem.isCorrect}
            hasNoBorder={hasNoBorder}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id={listItem.id}>
              <Typography sx={{ width: '5%', flexShrink: 0 }}>{listItem.id}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{listItem.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {listItem.answers.map((answer, index) => {
                return (
                  <Grid
                    display={'flex'}
                    alignItems={'center'}
                    style={{
                      marginBottom: '16px',
                      borderRadius: '10px'
                    }}
                    key={index}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      value={answer.answer}
                      name={answer.answer}
                      onChange={handleChangeRadio}
                      style={{
                        boxShadow: 'none',
                        height: '20px',
                        width: '20px'
                      }}
                      checked={isSelectedRadio === answer.answer}
                      id={answer.id}
                    />
                    <Typography
                      style={{
                        color:
                          !listItem.isCorrect && answer.rightAnswer
                            ? theme.palette.secondary.dark
                            : answer.selected
                            ? theme.palette.error.main
                            : ''
                      }}
                    >
                      {answer.answer}
                    </Typography>
                  </Grid>
                );
              })}
              <Grid display={'flex'} justifyContent={'flex-end'}>
                <Button>Help</Button>
              </Grid>
            </AccordionDetails>
          </AccordionStyle>
        );
      })}
    </div>
  );
}

Accordions.propTypes = {
  list: PropTypes.array,
  handleChangeRadio: PropTypes.func,
  isSelectedRadio: PropTypes.string
};
export default Accordions;
