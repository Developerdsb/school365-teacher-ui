import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

export const StyledPaper = styled(Paper)({
  width: '85%',
  height: 'auto',
  padding: 9,
  borderRadius: '13px',
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: '#F3F3F3'
});

export const StyledIconStack = styled(Stack)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  display: 'none' // Initially hide the icon stack
});

export const StyledImageStack = styled(Stack)({
  position: 'relative',
  zIndex: 1,
  '&:hover img': {
    filter: 'brightness(80%)' // Apply backdrop filter with a darker effect on hover
  }
});

export const StyledIconButton = styled(IconButton)({
  color: 'black', // Set icon color to black
  // Add click event handler to open modal
  '&:hover': {
    cursor: 'pointer' // Change cursor to pointer on hover
  }
});
