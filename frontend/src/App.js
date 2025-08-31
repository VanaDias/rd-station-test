import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import { Toaster } from 'react-hot-toast';

function App() {
  const [recommendations, setRecommendations ] = useState([]);
  
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col justify-center items-center">
      <Toaster/>
      <div className="bg-white px-8 md:px-20 py-8 rounded-lg shadow-lg md:w-[70%] gap-8 flex flex-col">
        <h1 className="text-3xl font-bold">Recomendador de Produtos RD Station</h1>
        <div className="p-4 border rounded-lg border-blue-200 bg-blue-50 mb-4">
          <p className="text-md">
            ℹ️ Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
          </p>
        </div>
        <div className='grid md:grid-cols-[30%_70%] gap-4'>
          <div className='md:border-r md:pr-4'>
            <Form changeRecommendations={setRecommendations}/>
          </div>
          <div>
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
