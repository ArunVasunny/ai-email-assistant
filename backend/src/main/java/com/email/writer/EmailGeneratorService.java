package com.email.writer;

import org.springframework.stereotype.Component;

@Component
public class EmailGeneratorService {

    public String generateEmailReply(EmailRequest emailRequest) 
    {    
        String prompt = buildPrompt(emailRequest);
        
        String requestBody = String.format("""
                {
                    "contents": [
                    {
                        "parts": [
                        {
                            "text": "%s"
                        }
                        ]
                    }
                    ]
                }""", prompt);

        return " ";
    }

    private String buildPrompt(EmailRequest emailRequest)
    {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email: ");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty())
        {
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
        }
        prompt.append("Original Email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}

