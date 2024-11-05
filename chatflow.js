// metafold-chatbot.js - Complete implementation for Webflow

// Include all the code from the previous responses here - BusinessEmailValidator, MetafoldContactForm, 
// CONVERSATION_FLOWS, and the main chatbot class.

// Main initialization code for Webflow
document.addEventListener('DOMContentLoaded', function() {
  // Create chatbot container and add to body
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'metafold-chatbot-container';
  document.body.appendChild(chatbotContainer);
  
  // Initialize chatbot
  const chatbot = new MetafoldChatbot({
    webhookUrl: 'YOUR_MAKE_WEBHOOK_URL',
    container: chatbotContainer
  });
});

// Styles to add to the Custom Code section
const chatbotStyles = `
  #metafold-chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
  }

  .chat-toggle {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: #2563eb;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .chat-toggle:hover {
    background: #1d4ed8;
  }

  .chat-window {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 380px;
    height: 600px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chat-header {
    padding: 16px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .chat-header h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }

  .message {
    margin-bottom: 12px;
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.4;
  }

  .message.bot {
    background: #f1f5f9;
    color: #334155;
    margin-right: auto;
    border-bottom-left-radius: 4px;
  }

  .message.user {
    background: #2563eb;
    color: white;
    margin-left: auto;
    border-bottom-right-radius: 4px;
  }

  .chat-input {
    padding: 16px;
    border-top: 1px solid #e2e8f0;
  }

  .options-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .option-button {
    padding: 10px 14px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-size: 14px;
    color: #334155;
    transition: all 0.2s;
  }

  .option-button:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  .contact-form {
    padding: 16px;
  }

  .form-field {
    margin-bottom: 16px;
  }

  .form-field label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    color: #475569;
  }

  .form-field input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
  }

  .form-field input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  .error-message {
    color: #dc2626;
    font-size: 12px;
    margin-top: 4px;
  }

  .submit-button {
    width: 100%;
    padding: 10px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-button:hover {
    background: #1d4ed8;
  }

  .hidden {
    display: none;
  }
`;