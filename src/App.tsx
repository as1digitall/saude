import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ExamInfo from './components/ExamInfo';
import TermsSection from './components/TermsSection';
import CepLookup from './components/CepLookup';
import Footer from './components/Footer';
import RegistrationForm from './components/RegistrationForm';
import VerificationPage from './components/VerificationPage';
import FinalVerificationPage from './components/FinalVerificationPage';
import ReceiptPage from './components/ReceiptPage';
import PaymentPage from './components/PaymentPage';
import LoginPage from './components/LoginPage';
import Upsell1 from './components/Upsell1';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'registration' | 'verification' | 'final-verification' | 'receipt' | 'payment' | 'login'>('home');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [cepData, setCepData] = useState<any>(null);
  const [cpfData, setCpfData] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);
  const location = useLocation();

  // Load user data from localStorage on app initialization
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('userData'); // Remove corrupted data
      }
    }
  }, []);

  // Scroll para o topo sempre que a página mudar
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentPage, location.pathname]);

  const handleStartRegistration = (job: any, cep: any) => {
    setSelectedJob(job);
    setCepData(cep);
    setCurrentPage('registration');
  };

  const handleContinueToVerification = (cpf: string) => {
    setCpfData(cpf);
    setCurrentPage('verification');
  };

  const handleContinueToFinalVerification = () => {
    setCurrentPage('final-verification');
  };

  const handleContinueToReceipt = () => {
    setCurrentPage('receipt');
  };

  const handleContinueToPayment = () => {
    setCurrentPage('payment');
  };

  const handleGoToLogin = () => {
    setCurrentPage('login');
  };

  const handleLoginSuccess = (user: any) => {
    setUserData(user);
    setCpfData(user.cpf);
    
    // Store user data in localStorage for persistence
    localStorage.setItem('userData', JSON.stringify(user));
    
    setCurrentPage('home');
  };

  return (
    <Routes>
      <Route path="/upsell1" element={<Upsell1 />} />
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/payment" element={<PaymentPage selectedJob={selectedJob} cepData={cepData} cpfData={cpfData} />} />
      <Route path="/receipt" element={<ReceiptPage selectedJob={selectedJob} cepData={cepData} cpfData={cpfData} onContinueToPayment={handleContinueToPayment} />} />
      <Route path="/final-verification" element={<FinalVerificationPage selectedJob={selectedJob} cepData={cepData} cpfData={cpfData} onContinue={handleContinueToReceipt} />} />
      <Route path="/verification" element={<VerificationPage selectedJob={selectedJob} cepData={cepData} cpfData={cpfData} onContinue={handleContinueToFinalVerification} />} />
      <Route path="/registration" element={<RegistrationForm selectedJob={selectedJob} cepData={cepData} onContinue={handleContinueToVerification} />} />
      <Route path="/" element={
        <>
          {currentPage === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}
          {currentPage === 'payment' && <PaymentPage selectedJob={selectedJob} cepData={cepData} cpfData={cpfData} />}
          {currentPage === 'receipt' && <ReceiptPage selectedJob={selectedJob} cepData={cepData} cpfData={cpfData} onContinueToPayment={handleContinueToPayment} />}
          {currentPage === 'final-verification' && <FinalVerificationPage selectedJob={selectedJob} cepData={cepData} cpfData={cpfData} onContinue={handleContinueToReceipt} />}
          {currentPage === 'verification' && <VerificationPage selectedJob={selectedJob} cepData={cepData} cpfData={cpfData} onContinue={handleContinueToFinalVerification} />}
          {currentPage === 'registration' && <RegistrationForm selectedJob={selectedJob} cepData={cepData} onContinue={handleContinueToVerification} />}
          {currentPage === 'home' && (
            <div className="min-h-screen bg-white flex flex-col">
              <Header onGoToLogin={handleGoToLogin} userName={userData?.nome} />
              
              <main className="flex-1">
                <div className="px-4 py-6 max-w-4xl mx-auto">
                  {/* Page Title */}
                  <h1 className="text-3xl font-semibold mb-4 text-green-800">
                    Cadastro - Sistema Único de Saúde (SUS)
                  </h1>

                  {/* User Welcome Message */}
                  {userData && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <h2 className="text-lg font-semibold text-green-800 mb-2">
                        Bem-vindo, {userData.nome.split(' ')[0]}!
                      </h2>
                      <p className="text-green-700 text-sm">
                        Você está logado com sucesso. Agora você pode prosseguir com sua inscrição no SUS.
                      </p>
                    </div>
                  )}

                  {/* Exam Information Section */}
                  <ExamInfo />

                  {/* Terms and Conditions */}
                  <TermsSection />

                  {/* CEP Lookup Section */}
                  <CepLookup onStartRegistration={handleStartRegistration} />
                </div>
              </main>

              <Footer />
            </div>
          )}
        </>
      } />
    </Routes>
  );
}

export default App;