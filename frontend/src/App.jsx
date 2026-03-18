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
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

function App() {
  const [emailContent, setEMailContent] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 2 }}>

      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 600, mt: 4 }}
      >
        Email Reply Generator
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ textAlign: 'center', color: 'text.secondary', mb: 3 }}
      >
        Generate smart replies instantly using AI
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
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
              <MenuItem value="Friendly">Friendly</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button sx={{ mt: 2 }} 
              variant="contained" 
              onClick={handleSubmit}
              disabled={!emailContent || loading}> {loading ? <CircularProgress size={24}/> : "Generate Reply"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default App
