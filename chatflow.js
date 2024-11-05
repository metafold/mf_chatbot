// metafold-chatbot.js
class BusinessEmailValidator {
  constructor() {
    this.blockedDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
      'aol.com', 'icloud.com', 'mail.com', 'protonmail.com',
      'zoho.com', 'yandex.com', 'gmx.com', 'live.com',
      'inbox.com', 'me.com', 'msn.com', 'googlemail.com',
      'yahoo.co.uk', 'yahoo.fr', 'yahoo.co.jp', 'qq.com',
      '163.com', 'proton.me'
    ];

    this.academicDomains = ['.edu', '.ac.uk', '.edu.au'];
  }

  isBusinessEmail(email) {
    try {
      if (!this.isValidEmailFormat(email)) {
        return {
          isValid: false,
          message: 'Please enter a valid email address'
        };
      }

      const domain = email.split('@')[1].toLowerCase();

      if (this.blockedDomains.includes(domain)) {
        return {
          isValid: false,
          message: 'Please use your business email address'
        };
      }

      if (this.academicDomains.some(acadDomain => domain.endsWith(acadDomain))) {
        return {
          isValid: true,
          message: 'Academic email accepted'
        };
      }

      return {
        isValid: true,
        message: 'Valid business email'
      };
    } catch (error) {
      return {
        isValid: false,
        message: 'Invalid email format'
      };
    }
  }

  isValidEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

class MetafoldChatbot {
  constructor() {
    this.webhookUrl = 'YOUR_MAKE_WEBHOOK_URL'; // Replace with your Make.com webhook URL
    this.state = {
      isOpen: false,
      messages: [],
      currentStep: 'initial',
      collectedData: {}
    };
    this.emailValidator = new BusinessEmailValidator();
    this.initialize();
  }

  initialize() {
    this.createChatbotUI();
    this.addEventListeners();
  }

  createChatbotUI() {
    const chatbotHTML = `
      <div id="metafold-chatbot" class="chatbot-container">
        <button id="chat-toggle" class="chat-toggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        <div id="chat-window" class="chat-window hidden">
          <div class="chat-header">
            <h4>How can we help?</h4>
            <button id="close-chat">×</button>
          </div>
          <div id="chat-messages" class="chat-messages"></div>
          <div id="chat-input" class="chat-input"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  addEventListeners() {
    document.getElementById('chat-toggle').addEventListener('click', () => {
      this.toggleChat();
    });

    document.getElementById('close-chat').addEventListener('click', () => {
      this.toggleChat();
    });
  }

  toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const isHidden = chatWindow.classList.contains('hidden');
    
    chatWindow.classList.toggle('hidden');
    
    if (isHidden && this.state.messages.length === 0) {
      this.startConversation();
    }
  }

  startConversation() {
    this.addMessage("👋 Hi there! I'm here to connect you with the right person on our technical team. What brings you here today?");
    this.showInitialOptions();
  }

  addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user' : 'bot');
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    this.state.messages.push({ text, isUser });
  }

  showInitialOptions() {
    const options = [
      "Looking to optimize product designs",
      "Interested in simulation capabilities",
      "Exploring geometry generation",
      "Developing CAD/CAE/CAM software",
      "Need computational design and engineering support",
      "Just browsing"
    ];
    this.showOptions(options, 'initial');
  }

  showOptions(options, step) {
    const inputContainer = document.getElementById('chat-input');
    inputContainer.innerHTML = '';
    
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    
    options.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('option-button');
      button.textContent = option;
      button.addEventListener('click', () => this.handleOptionSelection(option, step));
      optionsContainer.appendChild(button);
    });
    
    inputContainer.appendChild(optionsContainer);
  }

  handleOptionSelection(option, step) {
    this.addMessage(option, true);
    this.state.collectedData[step] = option;
    
    switch(step) {
      case 'initial':
        this.handleInitialStep(option);
        break;
      case 'industry':
        this.handleIndustryStep(option);
        break;
      case 'useCase':
        this.handleUseCaseStep(option);
        break;
      case 'technical':
        this.handleTechnicalStep(option);
        break;
      case 'timeline':
        this.handleTimelineStep(option);
        break;
    }
  }

  handleInitialStep(option) {
    if (option === "Just browsing") {
      this.addMessage("That's fine! Feel free to explore our site. Would you like to learn more about our capabilities?");
      this.showOptions([
        "Learn about specific capabilities",
        "Keep browsing",
        "Start over"
      ], 'browsing');
    } else {
      this.addMessage("Great! To better understand your needs, which industry best describes your work?");
      this.showIndustryOptions();
    }
  }

  showIndustryOptions() {
    const options = [
      "Healthcare & Medical Devices",
      "Biotech & Life Sciences",
      "Consumer Products",
      "Advanced Manufacturing",
      "Aerospace & Defense",
      "Software",
      "Other"
    ];
    this.showOptions(options, 'industry');
  }

  handleIndustryStep(industry) {
    this.addMessage(this.getUseCaseQuestion(industry));
    this.showUseCaseOptions(industry);
  }

  getUseCaseQuestion(industry) {
    const questions = {
      "Healthcare & Medical Devices": "Are you working on any of these applications?",
      "Biotech & Life Sciences": "What type of biotech applications are you exploring?",
      "Consumer Products": "What type of consumer products are you developing?",
      "Advanced Manufacturing": "Which manufacturing applications interest you?",
      "Aerospace & Defense": "Which aerospace applications interest you?",
      "Software": "What kind of project are you working on?",
      "Other": "What type of applications are you exploring?"
    };
    return questions[industry] || "What type of applications are you exploring?";
  }

  showUseCaseOptions(industry) {
    const useCaseOptions = {
      "Healthcare & Medical Devices": [
        "Patient-specific devices",
        "Medical implants",
        "Dental applications",
        "Body fitment",
        "Other medical applications"
      ],
      "Biotech & Life Sciences": [
        "Cell scaffolds",
        "Bioreactor design",
        "Lab-grown meat structures",
        "Other biotech applications"
      ],
      "Consumer Products": [
        "Footwear",
        "Sports equipment",
        "Custom/personalized products",
        "Other consumer goods"
      ],
      "Advanced Manufacturing": [
        "Filtration systems",
        "Heat exchangers",
        "Lightweight components",
        "Sustainability",
        "Other industrial applications"
      ],
      "Aerospace & Defense": [
        "Filtration systems",
        "Heat exchangers",
        "Lightweight components",
        "Sustainability",
        "Other aerospace and defense applications"
      ],
      "Software": [
        "Web-based CAD/CAE/CAM software",
        "App for clinicians to configure medical device",
        "Mass customization app",
        "Visualization of high-volume geometric data",
        "AI-assisted manufacturability checking",
        "Dataset generation for ML",
        "Something else"
      ]
    };
    
    const options = useCaseOptions[industry] || ["Other applications"];
    this.showOptions(options, 'useCase');
  }

  handleUseCaseStep(useCase) {
    this.addMessage("Which capabilities are most important for your project?");
    this.showTechnicalOptions();
  }

  showTechnicalOptions() {
    const options = [
      "Fast geometry computation",
      "Simulation & analysis",
      "Scientific computing integration",
      "API access",
      "Not sure yet"
    ];
    this.showOptions(options, 'technical');
  }

  handleTechnicalStep(technical) {
    this.addMessage("When are you looking to implement a solution?");
    this.showTimelineOptions();
  }

  showTimelineOptions() {
    const options = [
      "Immediately",
      "Within 3 months",
      "Within 6 months",
      "Just researching for now"
    ];
    this.showOptions(options, 'timeline');
  }

  handleTimelineStep(timeline) {
    this.addMessage("Great! To connect you with the right person on our team, please share your contact information:");
    this.showContactForm();
  }

  showContactForm() {
    const formHTML = `
      <form id="contact-form" class="contact-form">
        <div class="form-field">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" required>
        </div>
        <div class="form-field">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" required>
        </div>
        <div class="form-field">
          <label for="email">Business Email</label>
          <input type="email" id="email" required>
          <div id="email-error" class="error-message hidden"></div>
        </div>
        <div class="form-field">
          <label for="company">Company</label>
          <input type="text" id="company" required>
        </div>
        <div class="form-field">
          <label for="jobTitle">Job Title</label>
          <input type="text" id="jobTitle" required>
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    `;
    
    const inputContainer = document.getElementById('chat-input');
    inputContainer.innerHTML = formHTML;
    
    document.getElementById('contact-form').addEventListener('submit', (e) => this.handleContactFormSubmit(e));
    document.getElementById('email').addEventListener('blur', (e) => this.validateEmail(e));
  }

  validateEmail(event) {
    const email = event.target.value;
    const result = this.emailValidator.isBusinessEmail(email);
    const errorDiv = document.getElementById('email-error');
    
    if (!result.isValid) {
      errorDiv.textContent = result.message;
      errorDiv.classList.remove('hidden');
      event.target.classList.add('invalid');
      return false;
    } else {
      errorDiv.classList.add('hidden');
      event.target.classList.remove('invalid');
      return true;
    }
  }

  async handleContactFormSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    if (!this.validateEmail({ target: document.getElementById('email') })) {
      return;
    }

    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: email,
      company: document.getElementById('company').value,
      jobTitle: document.getElementById('jobTitle').value
    };

    try {
      await this.submitToMake(formData);
      
      this.addMessage(`Thanks ${formData.firstName}! A member of our team will reach out within 1 business day.`);
      
      setTimeout(() => {
        this.addMessage("Would you like to:");
        this.showOptions([
          "Start a new conversation",
          "Close chat"
        ], 'closing');
      }, 1000);
    } catch (error) {
      this.addMessage("Sorry, there was an error submitting your information. Please try again later.");
    }
  }

  async submitToMake(formData) {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          ...this.state.collectedData,
          source: window.location.href,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return true;
    } catch (error) {
      console.error('Error submitting to Make:', error);
      throw error;
    }
  }
}

// Initialize chatbot when the page loads
document.addEventListener('DOMContentLoaded', function() {
  new MetafoldChatbot();
});