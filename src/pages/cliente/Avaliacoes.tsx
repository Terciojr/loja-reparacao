import React, { useState } from 'react';
import Navbar from '../components/cliente/Navbar';
import Footer from '../components/cliente/Footer';
import ReviewCard from '../components/cliente/ReviewCard';

// --- Ícone SVG ---
const StarIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Avaliacoes: React.FC = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      cliente: 'Júlio Muianga',
      nota: 5,
      comentario: 'Serviço excelente! Recuperaram todos os dados do meu celular que havia quebrado a tela. Super recomendo!',
      data: new Date('2023-04-15')
    },
    {
      id: 2,
      cliente: 'Mariana Cossa',
      nota: 4,
      comentario: 'Atendimento muito bom e preço justo. Só não dou 5 estrelas porque demorou um pouco mais que o previsto.',
      data: new Date('2023-04-10')
    },
    {
      id: 3,
      cliente: 'Pedro Macamo',
      nota: 5,
      comentario: 'Comprei uma capinha e película e adorei a qualidade dos produtos. Chegou rapidinho!',
      data: new Date('2023-04-05')
    },
    {
      id: 4,
      cliente: 'Ana Chissano',
      nota: 5,
      comentario: 'Troquei a bateria do meu iPhone e agora está como novo. Profissionais muito competentes!',
      data: new Date('2023-03-28')
    }
  ]);

  const [newReview, setNewReview] = useState({
    nome: '',
    nota: 5,
    comentario: ''
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.nome && newReview.comentario) {
      setReviews([
        {
          id: Date.now(),
          cliente: newReview.nome,
          nota: newReview.nota,
          comentario: newReview.comentario,
          data: new Date()
        },
        ...reviews
      ]);
      setNewReview({ nome: '', nota: 5, comentario: '' });
      alert('Avaliação enviada com sucesso!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">O que Nossos Clientes Dizem</h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">A satisfação de quem confia em nosso trabalho é a nossa maior recompensa.</p>
          </div>

          {/* Formulário de Avaliação */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Deixe sua Avaliação</h2>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nome">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={newReview.nome}
                    onChange={(e) => setNewReview({...newReview, nome: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sua Nota *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, nota: star})}
                        className="focus:outline-none transition-transform transform hover:scale-125"
                      >
                        <StarIcon className={`w-8 h-8 ${star <= newReview.nota ? 'text-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="comentario">
                  Seu Comentário *
                </label>
                <textarea
                  id="comentario"
                  value={newReview.comentario}
                  onChange={(e) => setNewReview({...newReview, comentario: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                ></textarea>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Enviar Avaliação
                </button>
              </div>
            </form>
          </div>

          {/* Lista de Avaliações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Avaliacoes;
