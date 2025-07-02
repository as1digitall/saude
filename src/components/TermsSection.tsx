import React, { useState } from 'react';
import { Info, Car as IdCard } from 'lucide-react';

const TermsSection: React.FC = () => {
  const [termsAccepted, setTermsAccepted] = useState(true);

  return (
    <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
      <div className="flex items-start">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-green-800 mb-3">
            Termos de Participação e Autorização - Aceitos Automaticamente
          </h2>
          
          <div className="space-y-3 text-sm text-green-700 mb-4">
            <p className="font-semibold">Termos aceitos automaticamente para sua conveniência:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li className="leading-relaxed">
                Declaro que as informações fornecidas são verdadeiras e estou ciente das penalidades por dados falsos.
              </li>
              <li className="leading-relaxed">
                Autorizo a consulta de unidades de saúde próximas à minha localização.
              </li>
              <li className="leading-relaxed">
                Concordo em participar do processo seletivo conforme critérios estabelecidos pelo SUS.
              </li>
              <li className="leading-relaxed">
                Estou ciente de que a participação não garante a contratação, dependendo da disponibilidade de vagas.
              </li>
              <li className="leading-relaxed">
                Autorizo o uso dos meus dados pessoais para fins de seleção, conforme LGPD.
              </li>
              <li className="leading-relaxed font-semibold text-red-700 bg-red-50 p-2 rounded border border-red-200">
                <span className="text-red-600">⚠️ IMPORTANTE: </span>
                Estou ciente de que realizar a emissão do pagamento e não concluir deixará meu CPF Inapto durante 2 anos para participação em qualquer concurso público/federal.
              </li>
            </ul>
          </div>

          <div className="flex items-start mb-4">
            <input 
              type="checkbox" 
              id="aceitar-termos" 
              className="mt-1 mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="aceitar-termos" className="text-sm font-medium text-green-700 cursor-pointer leading-relaxed">
              <strong>Declaro que li, compreendi e aceito todos os termos acima</strong> e autorizo a busca de dados na minha região para fins de participação no Sistema Único de Saúde.
            </label>
          </div>

          <div className="p-3 bg-white border border-green-300 rounded-md">
            <div className="flex items-center">
              <IdCard className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-xs text-green-600">
                <strong>Serviço oficial do Governo Federal:</strong> Este é um serviço oficial e seguro. Seus dados são protegidos pela Lei Geral de Proteção de Dados (LGPD).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsSection;