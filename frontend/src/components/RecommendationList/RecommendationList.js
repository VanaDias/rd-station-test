import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>

      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <ul className='flex flex-col gap-4'>
        {recommendations.map((recommendation) => (
          <li key={recommendation.id} className="p-4 shadow-lg rounded-lg bg-gray-50 flex flex-col gap-2 relative">
            <h4 className='text-lg font-bold'>{recommendation.name}</h4>
            <p className='absolute top-4 right-4 border rounded-full px-4 py-1 text-[12px]'>{recommendation.category}</p>
            <p><strong>Preferências:</strong> {recommendation.preferences.join(', ')}</p>
            <p><strong>Funcionalidades:</strong> {recommendation.features.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
