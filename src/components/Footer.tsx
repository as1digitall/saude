import React, { useState } from 'react';
import { ExternalLink, ChevronDown, Cookie } from 'lucide-react';

const Footer: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuItems = [
    { label: 'SUS', href: 'https://www.gov.br/sus/pt-br', external: true },
    { label: 'EDUCAÇÃO BÁSICA', collapsible: true },
    { label: 'ENSINO SUPERIOR', collapsible: true },
    { label: 'PROGRAMAS EDUCACIONAIS', collapsible: true },
    { label: 'ACESSO À INFORMAÇÃO', href: 'https://www.gov.br/acessoainformacao/pt-br', external: true, collapsible: true },
    { label: 'PORTAL DO PROFESSOR', collapsible: true },
    { label: 'CANAIS DE ATENDIMENTO', collapsible: true },
    { label: 'POLÍTICAS EDUCACIONAIS', collapsible: true },
  ];

  return (
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
            {menuItems.map((item, index) => (
              <li key={index} className={index > 0 ? "border-t border-gray-600" : ""}>
                <div className="py-3">
                  <div className="flex justify-between items-center">
                    <a
                      href={item.href || '#'}
                      className="text-sm hover:text-gray-300 transition-colors flex items-center"
                      target={item.external ? "_blank" : "_self"}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                      {item.external && <ExternalLink className="w-3 h-3 ml-1" />}
                    </a>
                    {item.collapsible && (
                      <button
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label={`Expandir seção ${item.label}`}
                        onClick={() => toggleSection(item.label)}
                      >
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform ${
                            expandedSections.includes(item.label) ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex items-center">
          <button className="flex items-center hover:text-gray-300 transition-colors" aria-label="Redefinir configurações de cookies">
            <Cookie className="w-5 h-5 mr-2" />
            <span className="text-sm">Redefinir Cookies</span>
          </button>
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
  );
};

export default Footer;