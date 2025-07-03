import React, { useEffect, useState } from 'react';

interface HeaderProps {
  onGoToLogin?: () => void;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ onGoToLogin, userName }) => {
  const [displayName, setDisplayName] = useState('Entrar');

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        if (userData && userData.nome) {
          const firstName = userData.nome.split(' ')[0];
          setDisplayName(firstName);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    } else if (userName) {
      const firstName = userName.split(' ')[0];
      setDisplayName(firstName);
    }
  }, [userName]);

  // Função global para atualizar o botão de login
  useEffect(() => {
    (window as any).updateHeaderLoginButton = (fullName: string) => {
      if (fullName && fullName.trim() !== '') {
        const firstName = fullName.split(' ')[0];
        setDisplayName(firstName);
        
        // Store user data in localStorage for persistence
        const userData = { nome: fullName };
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    };

    return () => {
      delete (window as any).updateHeaderLoginButton;
    };
  }, []);

  const handleLoginClick = () => {
    if (onGoToLogin) {
      onGoToLogin();
    }
  };

  return (
    <header className="bg-white shadow-sm relative">
      {/* Top Header */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="https://i.ibb.co/21f7m7H0/govbr.webp" 
              alt="gov.br" 
              className="h-8"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden items-center">
              <span className="text-blue-800 font-bold text-2xl">g</span>
              <span className="text-yellow-500 font-bold text-2xl">o</span>
              <span className="text-blue-500 font-bold text-2xl">v</span>
              <span className="text-yellow-500 font-bold text-2xl">.</span>
              <span className="text-blue-800 font-bold text-2xl">b</span>
              <span className="text-red-500 font-bold text-2xl">r</span>
            </div>
          </a>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-800 mx-3 w-5 h-5">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
          <div className="w-px h-6 bg-blue-800 mx-3"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-800 mx-3 w-5 h-5">
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-800 mx-3 w-5 h-5">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M3 9h18"></path>
            <path d="M3 15h18"></path>
            <path d="M9 3v18"></path>
            <path d="M15 3v18"></path>
          </svg>
          <button 
            onClick={handleLoginClick}
            id="login-button" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center transition-colors"
          >
            <span id="login-text">{displayName}</span>
          </button>
        </div>
      </div>

      {/* Sub Header */}
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
  );
};

export default Header;