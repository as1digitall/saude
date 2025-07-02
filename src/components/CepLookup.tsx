import React, { useState } from 'react';
import { MapPin, Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import JobListings from './JobListings';

interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

interface HealthUnit {
  name: string;
  address: string;
  distance: string;
  availability: 'available' | 'limited' | 'full';
}

interface CepLookupProps {
  onStartRegistration: (job: any, cepData: any) => void;
}

const CepLookup: React.FC<CepLookupProps> = ({ onStartRegistration }) => {
  const [cep, setCep] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cepData, setCepData] = useState<CepData | null>(null);
  const [healthUnits, setHealthUnits] = useState<HealthUnit[]>([]);
  const [error, setError] = useState<string>('');
  const [showJobListings, setShowJobListings] = useState(false);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    }
    setCep(value);
    
    // Limpar dados anteriores quando o usuário começar a digitar um novo CEP
    if (cepData) {
      setCepData(null);
      setHealthUnits([]);
      setError('');
      setShowJobListings(false);
    }
  };

  const fetchCepData = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, '');
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }
      
      return data;
    } catch (error) {
      throw new Error('Erro ao consultar CEP. Verifique se o CEP está correto.');
    }
  };

  const generateMockHealthUnits = (city: string, state: string): HealthUnit[] => {
    const units = [
      {
        name: `UBS Central ${city}`,
        address: `Rua Principal, 123 - Centro, ${city} - ${state}`,
        distance: '0.8 km',
        availability: 'available' as const
      },
      {
        name: `Hospital Municipal ${city}`,
        address: `Av. da Saúde, 456 - Centro, ${city} - ${state}`,
        distance: '1.2 km',
        availability: 'limited' as const
      },
      {
        name: `UBS Bairro Novo`,
        address: `Rua das Flores, 789 - Bairro Novo, ${city} - ${state}`,
        distance: '2.1 km',
        availability: 'available' as const
      },
      {
        name: `Clínica da Família ${city}`,
        address: `Rua do Bem-Estar, 321 - Vila Esperança, ${city} - ${state}`,
        distance: '2.8 km',
        availability: 'full' as const
      }
    ];
    
    return units;
  };

  const handleSearch = async () => {
    if (cep.length < 8) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const data = await fetchCepData(cep);
      setCepData(data);
      
      // Simular busca de unidades de saúde próximas
      const units = generateMockHealthUnits(data.localidade, data.uf);
      setHealthUnits(units);
      
      // Redirecionar automaticamente para a página de vagas após encontrar o CEP
      setTimeout(() => {
        setShowJobListings(true);
      }, 1500); // Reduzido de 1000ms para 1500ms para dar tempo de ver a confirmação
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setCepData(null);
      setHealthUnits([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'limited':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'full':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Vagas Disponíveis';
      case 'limited':
        return 'Vagas Limitadas';
      case 'full':
        return 'Lista de Espera';
      default:
        return 'Consultar';
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available':
        return <CheckCircle className="w-4 h-4" />;
      case 'limited':
        return <AlertCircle className="w-4 h-4" />;
      case 'full':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Se deve mostrar a página de vagas, renderizar o componente JobListings
  if (showJobListings && cepData) {
    return <JobListings cepData={cepData} onStartRegistration={onStartRegistration} />;
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 transition-all duration-300">
      <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2" />
        Consulte a Disponibilidade na sua Região
      </h2>
      
      <p className="text-gray-700 mb-6 leading-relaxed">
        Para se cadastrar, você precisa verificar a disponibilidade de vagas nas unidades do SUS próximas à sua localização. 
        Digite seu CEP abaixo para encontrarmos as unidades de saúde em sua região.
      </p>

      <div className="max-w-md mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-2">
              CEP
            </label>
            <input
              type="text"
              id="cep"
              name="cep"
              placeholder="00000-000"
              inputMode="numeric"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition-colors"
              value={cep}
              onChange={handleCepChange}
              maxLength={9}
              style={{ fontSize: '16px' }}
            />
          </div>
          <div className="sm:self-end">
            <button
              onClick={handleSearch}
              disabled={cep.length < 8 || isLoading}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {cepData && !showJobListings && (
        <div className="mb-6 p-4 bg-white border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Endereço Encontrado - Redirecionando...
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>CEP:</strong> {cepData.cep}</p>
            {cepData.logradouro && <p><strong>Logradouro:</strong> {cepData.logradouro}</p>}
            {cepData.bairro && <p><strong>Bairro:</strong> {cepData.bairro}</p>}
            <p><strong>Cidade:</strong> {cepData.localidade} - {cepData.uf}</p>
          </div>
          <div className="mt-3 flex items-center text-blue-600">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            <span className="text-sm">Redirecionando para consulta de disponibilidade...</span>
          </div>
        </div>
      )}

      {healthUnits.length > 0 && !showJobListings && (
        <div className="space-y-4">
          <h3 className="font-semibold text-green-800 mb-4">
            Unidades de Saúde Próximas ({healthUnits.length} encontradas)
          </h3>
          
          <div className="grid gap-4">
            {healthUnits.map((unit, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{unit.name}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(unit.availability)}`}>
                    {getAvailabilityIcon(unit.availability)}
                    <span className="ml-1">{getAvailabilityText(unit.availability)}</span>
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{unit.address}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">📍 {unit.distance}</span>
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                    Ver detalhes →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-2">💡 Próximos Passos:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Escolha a unidade de saúde mais conveniente para você</li>
                  <li>Verifique a disponibilidade de vagas antes de se deslocar</li>
                  <li>Leve seus documentos pessoais e comprovante de residência</li>
                  <li>O cadastro pode ser feito presencialmente na unidade escolhida</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CepLookup;