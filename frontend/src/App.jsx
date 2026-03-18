import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import './App.css'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'

function App() {
  const [emailContent, setEMailContent] = useState('');
  const [tone, SetTone] = useState('');

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Typography variant='h3' component="h1" gutterBottom>
          Email Reply Generator
        </Typography>

        <Box sx={{mx: 3}}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="Original Email Content"
            value={emailContent || ''}
            onChange={(e) => setEMailContent(e.target.value)}
          />


          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label="Tone (Optional)"
              onChange={(e) => SetTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
              <MenuItem value="Friendly">Friendly</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
    </>
  )
}

export default App
