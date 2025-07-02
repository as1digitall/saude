import React from 'react';
import { 
  Heart, 
  FileText, 
  Calendar, 
  MapPin, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

const ExamInfo: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
        <Heart className="w-6 h-6 mr-2" />
        Informações do Processo Seletivo - SUS 2025
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Exam Format */}
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

          {/* Date and Time */}
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
          {/* Location */}
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Local da Prova
            </h3>
            <div className="space-y-2 text-sm text-green-700">
              <p className="font-medium">
                <strong>Unidade de Saúde mais próxima da sua residência</strong>
              </p>
            </div>
          </div>

          {/* Schedule */}
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

      {/* Important Notice */}
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
  );
};

export default ExamInfo;