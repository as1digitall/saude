import React from 'react';
import { CheckCircle, GraduationCap, Clock, MapPin } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  description: string;
  salary: string;
  workload: string;
  modality: string;
  available: boolean;
}

interface JobSelectionProps {
  selectedJob: Job | null;
  onStartRegistration: () => void;
}

const JobSelection: React.FC<JobSelectionProps> = ({ selectedJob, onStartRegistration }) => {
  if (!selectedJob) return null;

  return (
    <div id="botao-inscricao" className="text-center py-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 max-w-xl mx-auto">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Cargo Selecionado</h3>
        <p className="text-gray-700 mb-4 text-xl font-medium">{selectedJob.title}</p>
        
        <div className="bg-white p-4 rounded border border-green-200 mb-4">
          <p className="text-sm text-gray-600 mb-1">Remuneração prevista para sua região:</p>
          <p className="text-lg font-semibold text-green-700">{selectedJob.salary}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-50 p-2 rounded border border-blue-200">
            <div className="flex items-center text-blue-700">
              <GraduationCap className="w-3 h-3 mr-1" />
              <span className="font-medium">Ensino Médio</span>
            </div>
          </div>
          <div className="bg-purple-50 p-2 rounded border border-purple-200">
            <div className="flex items-center text-purple-700">
              <Clock className="w-3 h-3 mr-1" />
              <span className="font-medium">Treinamento 90 dias</span>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onStartRegistration}
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-12 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-lg flex items-center mx-auto"
      >
        <CheckCircle className="w-5 h-5 mr-3" />
        INICIAR INSCRIÇÃO
        <MapPin className="w-5 h-5 ml-3" />
      </button>
    </div>
  );
};

export default JobSelection;