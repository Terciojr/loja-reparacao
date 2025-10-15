import React, { useState } from 'react';
import Navbar from '../components/cliente/Navbar';
import Footer from '../components/cliente/Footer';

// --- Ícones SVG ---
const LocationMarkerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PaperClipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>;

const Contato: React.FC = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [fotos, setFotos] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const novosArquivos = Array.from(e.target.files);
      if (fotos.length + novosArquivos.length > 3) {
        alert('Você pode enviar no máximo 3 fotos.');
        return;
      }
      setFotos(prevFotos => [...prevFotos, ...novosArquivos]);
    }
  };

  const handleRemoveFoto = (index: number) => {
    setFotos(prevFotos => prevFotos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar o formulário com as fotos
    console.log('Formulário enviado:', { ...formData, fotos });
    alert('Mensagem enviada com sucesso!');
    setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
    setFotos([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Peça um Orçamento</h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">Envie os detalhes do seu problema e, se possível, anexe fotos do aparelho.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Detalhes do Contato</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos do formulário */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nome">Nome Completo *</label>
                  <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Seu Melhor Email *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="telefone">Telefone (Opcional)</label>
                  <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mensagem">Descreva o Problema *</label>
                  <textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required></textarea>
                </div>

                {/* Upload de Fotos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fotos do Aparelho (Opcional, máx. 3)</label>
                  <div className="mt-2 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Carregar arquivos</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleFileChange} disabled={fotos.length >= 3} />
                        </label>
                        <p className="pl-1">ou arraste e solte</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Previews das Fotos */}
                {fotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {fotos.map((foto, index) => (
                      <div key={index} className="relative">
                        <img src={URL.createObjectURL(foto)} alt={`Preview ${index + 1}`} className="h-24 w-full object-cover rounded-md" />
                        <button onClick={() => handleRemoveFoto(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs leading-none">✕</button>
                      </div>
                    ))}
                  </div>
                )}

                <button type="submit" className="w-full flex items-center justify-center bg-blue-600 text-white p-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <PaperClipIcon />
                  Enviar Solicitação
                </button>
              </form>
            </div>

            {/* Informações de Contato (lado direito) */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossos Contatos</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4"><div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><LocationMarkerIcon /></div><div><h3 className="text-lg font-semibold text-gray-800">Endereço</h3><p className="text-gray-600">Av. 25 de Setembro, 1234<br />Maputo, Moçambique</p></div></div>
                  <div className="flex items-start gap-4"><div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><PhoneIcon /></div><div><h3 className="text-lg font-semibold text-gray-800">Telefone</h3><p className="text-gray-600">+258 84 123 4567<br />+258 82 876 5432</p></div></div>
                  <div className="flex items-start gap-4"><div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><MailIcon /></div><div><h3 className="text-lg font-semibold text-gray-800">Email</h3><p className="text-gray-600">contato@loja.co.mz<br />suporte@loja.co.mz</p></div></div>
                  <div className="flex items-start gap-4"><div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><ClockIcon /></div><div><h3 className="text-lg font-semibold text-gray-800">Horário</h3><p className="text-gray-600">Segunda a Sexta: 9h às 18h<br />Sábado: 9h às 13h</p></div></div>
                </div>
              </div>
              <div id="mapa" className="bg-gray-200 h-64 rounded-2xl shadow-lg overflow-hidden"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.939533395237!2d32.59333931502461!3d-25.93699598355768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee699e0f6bbed29%3A0x4b52143a5a6a617c!2sAv.%2025%20de%20Setembro%2C%20Maputo%2C%20Mo%C3%A7ambique!5e0!3m2!1spt-PT!2spt!4v1678886400000!5m2!1spt-PT!2spt" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de Localização"></iframe></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;