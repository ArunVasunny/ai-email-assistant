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
import axios, { Axios } from 'axios'


function App() {
  const [emailContent, setEMailContent] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedReply, setGeneratedReply] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try
    {
      const response = await axios.post("http://localhost:8080/api/email/generate",{
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
      
    } 
    catch (error) 
    {
      console.log(error)
    }
    finally
    {
      setLoading(false)
    }
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 2 }}>

      {/* TITLE */}
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

        {/* INPUT AREA WITH REPLY TONES */}
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

          {/* GENERATE BTN */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button  
              variant="contained" 
              onClick={handleSubmit}
              disabled={!emailContent || loading}> {loading ? <CircularProgress size={24}/> : "Generate Reply"}
            </Button>
          </Box>

          {/* GENERATED REPLY FIELD WITH COPY */}
          <TextField
            sx={ {mt: 2} }
            fullWidth
            multiline
            label="Generated Reply"
            rows={10}
            variant='outlined'
            value={generatedReply || ''}
            inputProps={{readOnly: true}}
          />

          {/* COPY BUTTON */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              variant="outlined" 
              disabled={!generatedReply}
              onClick={() => navigator.clipboard.writeText(generatedReply)}>
              Copy to Clipboard 
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default App
