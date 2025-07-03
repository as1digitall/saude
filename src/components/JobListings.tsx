import React, { useState } from 'react';
import { 
  Heart, 
  FileText, 
  Calendar, 
  MapPin, 
  Clock, 
  AlertCircle,
  GraduationCap,
  CheckCircle,
  XCircle
} from 'lucide-react';
import JobSelection from './JobSelection';

interface JobListingsProps {
  cepData: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
  };
  onStartRegistration: (job: any, cepData: any) => void;
}

interface Job {
  id: string;
  title: string;
  description: string;
  salary: string;
  workload: string;
  modality: string;
  available: boolean;
}

const JobListings: React.FC<JobListingsProps> = ({ cepData, onStartRegistration }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Técnico em Enfermagem',
      description: 'Assistência direta ao paciente em unidades de saúde do SUS.',
      salary: 'R$ 2.850,00 - R$ 4.800,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '2',
      title: 'Técnico em Radiologia',
      description: 'Operação de equipamentos de radiologia e exames de imagem.',
      salary: 'R$ 3.200,00 - R$ 5.400,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '3',
      title: 'Técnico em Laboratório',
      description: 'Realização de exames laboratoriais e análises clínicas.',
      salary: 'R$ 2.900,00 - R$ 4.900,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '4',
      title: 'Técnico em Farmácia',
      description: 'Dispensação de medicamentos e controle farmacêutico.',
      salary: 'R$ 2.700,00 - R$ 4.600,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '5',
      title: 'Técnico em Saúde Bucal',
      description: 'Assistência em procedimentos odontológicos nas UBS.',
      salary: 'R$ 2.600,00 - R$ 4.400,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '6',
      title: 'Técnico em Nutrição',
      description: 'Apoio nas atividades de nutrição e alimentação hospitalar.',
      salary: 'R$ 2.500,00 - R$ 4.200,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '7',
      title: 'Técnico em Fisioterapia',
      description: 'Apoio em procedimentos fisioterápicos e reabilitação.',
      salary: 'R$ 2.800,00 - R$ 4.700,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '8',
      title: 'Técnico em Segurança do Trabalho',
      description: 'Implementação de normas de segurança em unidades de saúde.',
      salary: 'R$ 3.500,00 - R$ 5.800,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '9',
      title: 'Técnico em Informática',
      description: 'Suporte técnico em sistemas de saúde e equipamentos.',
      salary: 'R$ 3.000,00 - R$ 5.200,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '10',
      title: 'Técnico em Manutenção',
      description: 'Manutenção de equipamentos médicos e hospitalares.',
      salary: 'R$ 3.100,00 - R$ 5.300,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '11',
      title: 'Técnico em Eletrônica Médica',
      description: 'Manutenção e calibração de equipamentos médicos.',
      salary: 'R$ 3.300,00 - R$ 5.600,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '12',
      title: 'Técnico em Hemoterapia',
      description: 'Trabalho em bancos de sangue e hemocentros.',
      salary: 'R$ 3.400,00 - R$ 5.700,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: false
    },
    {
      id: '13',
      title: 'Auxiliar de Enfermagem',
      description: 'Apoio aos técnicos e enfermeiros nas atividades de cuidado ao paciente.',
      salary: 'R$ 1.800,00 - R$ 3.200,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '14',
      title: 'Auxiliar de Farmácia',
      description: 'Apoio nas atividades farmacêuticas e controle de estoque.',
      salary: 'R$ 1.600,00 - R$ 2.900,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '15',
      title: 'Auxiliar de Saúde Bucal',
      description: 'Apoio aos dentistas e técnicos em saúde bucal.',
      salary: 'R$ 1.500,00 - R$ 2.700,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '16',
      title: 'Auxiliar de Laboratório',
      description: 'Apoio na coleta e preparação de amostras laboratoriais.',
      salary: 'R$ 1.700,00 - R$ 3.000,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '17',
      title: 'Auxiliar de Radiologia',
      description: 'Apoio na preparação de pacientes para exames de imagem.',
      salary: 'R$ 1.900,00 - R$ 3.300,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '18',
      title: 'Auxiliar Administrativo',
      description: 'Apoio administrativo nas unidades de saúde do SUS.',
      salary: 'R$ 1.400,00 - R$ 2.600,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '19',
      title: 'Recepcionista',
      description: 'Atendimento ao público nas unidades de saúde.',
      salary: 'R$ 1.200,00 - R$ 2.300,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '20',
      title: 'Auxiliar de Almoxarifado',
      description: 'Controle de materiais médicos e medicamentos.',
      salary: 'R$ 1.300,00 - R$ 2.400,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '21',
      title: 'Auxiliar de Arquivo Médico',
      description: 'Organização e controle de prontuários e documentos médicos.',
      salary: 'R$ 1.400,00 - R$ 2.500,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '22',
      title: 'Operador de Telemarketing em Saúde',
      description: 'Atendimento telefônico e agendamento de consultas.',
      salary: 'R$ 1.100,00 - R$ 2.200,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '23',
      title: 'Auxiliar de Recursos Humanos',
      description: 'Apoio administrativo na área de recursos humanos.',
      salary: 'R$ 1.600,00 - R$ 2.800,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '24',
      title: 'Agente Comunitário de Saúde',
      description: 'Acompanhamento e orientação das famílias na comunidade.',
      salary: 'R$ 1.824,00 - R$ 3.100,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '25',
      title: 'Agente de Combate às Endemias',
      description: 'Prevenção e controle de doenças endêmicas.',
      salary: 'R$ 1.900,00 - R$ 3.200,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '26',
      title: 'Agente de Vigilância Sanitária',
      description: 'Fiscalização e controle sanitário de estabelecimentos.',
      salary: 'R$ 2.200,00 - R$ 3.800,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '27',
      title: 'Motorista de Ambulância',
      description: 'Condução de ambulâncias e transporte de pacientes.',
      salary: 'R$ 2.400,00 - R$ 4.000,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '28',
      title: 'Condutor de Veículos de Emergência',
      description: 'Condução de veículos do SAMU e emergências médicas.',
      salary: 'R$ 2.600,00 - R$ 4.300,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '29',
      title: 'Auxiliar de Cozinha Hospitalar',
      description: 'Preparo de refeições em hospitais e unidades de saúde.',
      salary: 'R$ 1.000,00 - R$ 2.000,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '30',
      title: 'Auxiliar de Limpeza Hospitalar',
      description: 'Limpeza e desinfecção de ambientes hospitalares.',
      salary: 'R$ 900,00 - R$ 1.800,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '31',
      title: 'Auxiliar de Lavanderia Hospitalar',
      description: 'Processamento de roupas hospitalares e materiais têxteis.',
      salary: 'R$ 1.100,00 - R$ 2.100,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '32',
      title: 'Auxiliar de Esterilização',
      description: 'Esterilização de materiais e instrumentos médicos.',
      salary: 'R$ 1.500,00 - R$ 2.700,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '33',
      title: 'Porteiro/Vigilante',
      description: 'Controle de acesso e segurança das unidades de saúde.',
      salary: 'R$ 1.200,00 - R$ 2.300,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '34',
      title: 'Operador de Equipamentos Médicos',
      description: 'Operação de equipamentos médicos especializados.',
      salary: 'R$ 2.800,00 - R$ 4.600,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '35',
      title: 'Técnico em Prótese Dentária',
      description: 'Confecção e reparo de próteses dentárias.',
      salary: 'R$ 2.900,00 - R$ 4.800,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: false
    },
    {
      id: '36',
      title: 'Auxiliar de Necropsia',
      description: 'Apoio em procedimentos de necropsia e medicina legal.',
      salary: 'R$ 2.200,00 - R$ 3.700,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '37',
      title: 'Técnico em Órteses e Próteses',
      description: 'Confecção e adaptação de órteses e próteses.',
      salary: 'R$ 3.200,00 - R$ 5.400,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '38',
      title: 'Operador de Central de Materiais',
      description: 'Gestão e controle de materiais médico-hospitalares.',
      salary: 'R$ 2.000,00 - R$ 3.500,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '39',
      title: 'Auxiliar de Saúde Mental',
      description: 'Apoio em atividades de saúde mental e psicossocial.',
      salary: 'R$ 1.800,00 - R$ 3.100,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '40',
      title: 'Técnico em Imobilização Ortopédica',
      description: 'Aplicação de gessos e imobilizações ortopédicas.',
      salary: 'R$ 2.300,00 - R$ 3.900,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '41',
      title: 'Operador de Câmara Hiperbárica',
      description: 'Operação de equipamentos de oxigenoterapia hiperbárica.',
      salary: 'R$ 3.800,00 - R$ 6.200,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: false
    },
    {
      id: '42',
      title: 'Técnico em Diálise',
      description: 'Operação de equipamentos de hemodiálise e diálise peritoneal.',
      salary: 'R$ 3.600,00 - R$ 5.900,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    },
    {
      id: '43',
      title: 'Auxiliar de Terapia Ocupacional',
      description: 'Apoio em atividades de reabilitação e terapia ocupacional.',
      salary: 'R$ 1.900,00 - R$ 3.300,00',
      workload: '40h semanais',
      modality: 'Presencial',
      available: true
    }
  ];

  const availableJobs = jobs.filter(job => job.available);
  const totalJobs = jobs.length;

  const handleJobSelect = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      // Scroll suavemente para a seção de inscrição
      setTimeout(() => {
        const element = document.getElementById('botao-inscricao');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleStartRegistration = () => {
    if (selectedJob) {
      onStartRegistration(selectedJob, cepData);
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-green-800">
        Resultados da Busca - Sistema Único de Saúde (SUS)
      </h1>

      <div className="border-t border-b border-gray-300 py-3 mb-6">
        <div className="text-gray-700 text-sm space-y-1">
          <p>Publicado em 15/01/2025 14h30</p>
          <p>Atualizado em 15/01/2025 16h45</p>
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

      {/* Requisitos e Capacitação */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
          <GraduationCap className="w-6 h-6 mr-2" />
          Requisitos e Capacitação Profissional
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Escolaridade Exigida
            </h3>
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                <strong>Ensino Médio Completo</strong>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <strong>Certificado reconhecido pelo SUS</strong>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                <strong>Idade mínima: 18 anos</strong>
              </div>
            </div>
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-xs text-green-600">
                📚 Todos os cargos listados são acessíveis para candidatos com ensino médio completo.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Capacitação Profissional
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <strong>Treinamento de até 90 dias</strong>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                <strong>Capacitação específica para cada cargo</strong>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                <strong>Acompanhamento de profissionais experientes</strong>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-600">
                🎯 O treinamento é fornecido pelo SUS após aprovação no concurso, preparando você para exercer a função com excelência.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">✨ Vantagens do Programa de Capacitação:</h4>
          <div className="grid md:grid-cols-3 gap-2 text-sm text-yellow-700">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Remuneração durante o treinamento
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Certificação profissional
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Plano de carreira estruturado
            </div>
          </div>
        </div>
      </div>

      {/* Região Confirmada */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Consulta de Disponibilidade - Região Confirmada
        </h2>
        
        <div className="bg-white p-4 rounded border border-gray-200 mb-4">
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">CEP:</p>
              <p className="font-medium text-gray-800">{cepData.cep}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Logradouro:</p>
              <p className="font-medium text-gray-800">{cepData.logradouro}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Bairro:</p>
              <p className="font-medium text-gray-800">{cepData.bairro}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Localidade:</p>
              <p className="font-medium text-gray-800">{cepData.localidade}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Estado (UF):</p>
              <p className="font-medium text-gray-800">{cepData.uf}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Código da Região (IBGE):</p>
              <p className="font-medium text-blue-600">{cepData.ibge}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status:</p>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                DISPONÍVEL
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 flex items-center">
          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
          Vagas disponíveis para a região consultada. Selecione o cargo de interesse para prosseguir.
        </p>
      </div>

      {/* Instrução para Seleção */}
      <div className="bg-gray-50 border border-gray-300 rounded p-4 mb-6">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-green-600 mr-3" />
          <h3 className="text-lg font-medium text-gray-800">Selecione um cargo para prosseguir</h3>
        </div>
        <p className="text-sm text-gray-600 mt-2 ml-8">
          Escolha o cargo de seu interesse na lista abaixo. <strong>Todos os cargos exigem apenas ensino médio completo</strong> e incluem treinamento de até 90 dias.
        </p>
      </div>

      {/* Lista de Cargos */}
      <div className="bg-white border border-gray-300 rounded p-6 mb-8">
        <h3 className="text-xl font-medium text-gray-800 mb-6 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Cargos Disponíveis para sua Região ({totalJobs} vagas)
        </h3>
        
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`border rounded p-4 cursor-pointer transition-all duration-200 ${
                job.available
                  ? 'bg-gray-50 border-gray-300 hover:border-green-600'
                  : 'bg-red-50 border-red-300 opacity-75'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start justify-between">
                <div className="flex-1 mb-4 sm:mb-0">
                  <div className="flex items-center mb-2">
                    <h4 className="text-lg font-medium text-gray-800">• {job.title}</h4>
                    {!job.available && (
                      <span className="ml-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        ESGOTADO
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Remuneração:</span>
                      <p className="font-medium text-green-600">{job.salary}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Carga Horária:</span>
                      <p className="font-semibold">{job.workload}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Modalidade:</span>
                      <p className="font-semibold">{job.modality}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-center text-xs text-blue-700">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span><strong>Requisito:</strong> Ensino Médio Completo</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span><strong>Treinamento:</strong> Até 90 dias</span>
                    </div>
                  </div>
                  
                  {!job.available && (
                    <p className="text-red-600 text-sm mt-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      Vagas esgotadas.
                    </p>
                  )}
                </div>
                
                <div className="ml-0 sm:ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleJobSelect(job.id)}
                    disabled={!job.available}
                    className={`px-4 py-2 rounded font-medium transition-colors duration-200 w-full sm:w-auto ${
                      job.available
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {job.available ? 'Selecionar Cargo' : 'Indisponível'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Cargo Selecionado */}
      <JobSelection selectedJob={selectedJob} onStartRegistration={handleStartRegistration} />
    </main>
  );
};

export default JobListings;