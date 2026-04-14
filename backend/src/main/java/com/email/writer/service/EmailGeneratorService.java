package com.email.writer.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;

import com.email.writer.dto.EmailRequest;


@Component
public class EmailGeneratorService {

    private final ChatClient chatClient;

    public EmailGeneratorService(ChatClient.Builder builder)
    {
        this.chatClient = builder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest) 
    {    
        try {
            String prompt = buildPrompt(emailRequest);
            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
        } catch (Exception e) {
            return "AI service is currently busy. Please try again in a few seconds.";
        }
    }

    private String buildPrompt(EmailRequest emailRequest)
    {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email but don't give subject. ");
        prompt.append("Write only one direct reply, no multiple options. ");
        prompt.append("Do not use any symbols like **, --, or ---. ");
        prompt.append("Only use placeholders like [Your Name] or [Date] where the information is genuinely unknown and required. ");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty())
        {
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
        }
        prompt.append("Original Email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}

