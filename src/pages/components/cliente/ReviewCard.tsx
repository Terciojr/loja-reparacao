import React from 'react';

interface Review {
  id: number;
  cliente: string;
  nota: number;
  comentario: string;
  data: Date;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (nota: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            {i < nota ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-lg">{review.cliente}</h4>
          {renderStars(review.nota)}
        </div>
        <span className="text-sm text-gray-500">{formatDate(review.data)}</span>
      </div>
      
      <p className="text-gray-700">{review.comentario}</p>
    </div>
  );
};

export default ReviewCard;