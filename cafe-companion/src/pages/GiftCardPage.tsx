import { useState } from 'react';

interface GiftCardTemplate {
  id: string;
  name: string;
  image: string;
  description: string;
}

const giftCardTemplates: GiftCardTemplate[] = [
  {
    id: 'birthday',
    name: 'Birthday',
    image: '/gift-cards/birthday.jpg',
    description: 'Perfect for celebrating birthdays with a coffee treat.'
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    image: '/gift-cards/thank-you.jpg',
    description: 'Show your appreciation with a coffee gift.'
  },
  {
    id: 'congratulations',
    name: 'Congratulations',
    image: '/gift-cards/congratulations.jpg',
    description: 'Celebrate achievements with a special coffee reward.'
  },
  {
    id: 'holiday',
    name: 'Holiday',
    image: '/gift-cards/holiday.jpg',
    description: 'Spread holiday cheer with the gift of coffee.'
  },
  {
    id: 'just-because',
    name: 'Just Because',
    image: '/gift-cards/just-because.jpg',
    description: 'Sometimes coffee is the perfect gift for no reason at all.'
  },
  {
    id: 'custom',
    name: 'Custom Design',
    image: '/gift-cards/custom.jpg',
    description: 'Create your own personalized gift card design.'
  }
];

const GiftCardPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<GiftCardTemplate | null>(null);
  const [amount, setAmount] = useState<number>(25);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  
  const handleTemplateSelect = (template: GiftCardTemplate) => {
    setSelectedTemplate(template);
  };
  
  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };
  
  const handleNextStep = () => {
    if (step === 1 && selectedTemplate) {
      setStep(2);
    } else if (step === 2 && amount > 0) {
      setStep(3);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the gift card data to a backend
    alert('Gift card sent successfully!');
    
    // Reset form
    setSelectedTemplate(null);
    setAmount(25);
    setRecipientName('');
    setRecipientEmail('');
    setSenderName('');
    setMessage('');
    setStep(1);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Send a Gift Card</h1>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Progress Steps */}
        <div className="flex border-b">
          <div 
            className={`flex-1 py-4 px-6 text-center ${
              step === 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            1. Choose Design
          </div>
          <div 
            className={`flex-1 py-4 px-6 text-center ${
              step === 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            2. Select Amount
          </div>
          <div 
            className={`flex-1 py-4 px-6 text-center ${
              step === 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            3. Recipient Details
          </div>
        </div>
        
        <div className="p-6">
          {/* Step 1: Choose Template */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose a Gift Card Design</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {giftCardTemplates.map(template => (
                  <div 
                    key={template.id}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id 
                        ? 'border-primary ring-2 ring-primary/30' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="h-32 bg-gray-200 relative">
                      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                        {template.name}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleNextStep}
                  disabled={!selectedTemplate}
                  className={`px-6 py-2 rounded-md ${
                    selectedTemplate 
                      ? 'bg-primary text-white hover:bg-accent' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Select Amount */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Gift Card Amount</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[10, 25, 50, 75, 100, 'Custom'].map((value) => (
                  <button
                    key={value.toString()}
                    className={`py-3 border rounded-md ${
                      (typeof value === 'number' && amount === value) || 
                      (typeof value === 'string' && typeof amount === 'string')
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      if (typeof value === 'number') {
                        handleAmountChange(value);
                      } else {
                        // Handle custom amount
                        const customAmount = prompt('Enter custom amount (5-200):');
                        if (customAmount) {
                          const parsedAmount = parseInt(customAmount);
                          if (!isNaN(parsedAmount) && parsedAmount >= 5 && parsedAmount <= 200) {
                            handleAmountChange(parsedAmount);
                          }
                        }
                      }
                    }}
                  >
                    {typeof value === 'number' ? `$${value}` : value}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-accent"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Recipient Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-4">Recipient Details</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient's Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient's Email
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={4}
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-accent"
                >
                  Send Gift Card
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Gift Card Preview */}
      {selectedTemplate && (
        <div className="mt-12 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Gift Card Preview</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                {selectedTemplate.name} Gift Card Design
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-primary">{selectedTemplate.name} Gift Card</h3>
                <span className="font-bold text-accent">${amount}</span>
              </div>
              
              {recipientName && (
                <p className="text-sm text-gray-600">To: {recipientName}</p>
              )}
              
              {senderName && (
                <p className="text-sm text-gray-600">From: {senderName}</p>
              )}
              
              {message && (
                <div className="mt-3 p-3 bg-gray-50 rounded text-sm italic">
                  "{message}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftCardPage;
