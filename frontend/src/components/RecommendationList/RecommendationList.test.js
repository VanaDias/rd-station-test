import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecommendationList from './RecommendationList';

describe('RecommendationList Component', () => {
  it('Deve exibir "Nenhuma recomendação encontrada." quando os dados estiverem vazios', () => {
    render(<RecommendationList recommendations={[]} />);
    expect(screen.getByText('Nenhuma recomendação encontrada.')).toBeInTheDocument();
  });

  it('Verifica se os produtos recomendados foram renderizados', () => {
    const mockRecommendations = [
      {
        "id": 1,
        "name": "RD Station CRM",
        "category": "Vendas",
        "preferences": [
          "Integração fácil com ferramentas de e-mail",
          "Personalização de funis de vendas",
          "Relatórios avançados de desempenho de vendas"
        ],
        "features": [
          "Gestão de leads e oportunidades",
          "Automação de fluxos de trabalho de vendas",
          "Rastreamento de interações com clientes"
        ]
      },
      {
        "id": 2,
        "name": "RD Station Marketing",
        "category": "Marketing",
        "preferences": [
          "Automação de marketing",
          "Testes A/B para otimização de campanhas",
          "Segmentação avançada de leads"
        ],
        "features": [
          "Criação e gestão de campanhas de e-mail",
          "Rastreamento de comportamento do usuário",
          "Análise de retorno sobre investimento (ROI) de campanhas"
        ]
      }
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);
    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
    expect(screen.getByText('Vendas')).toBeInTheDocument();

    expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    
    expect(screen.getAllByText('Preferências:')).toHaveLength(2);
    expect(screen.getAllByText('Funcionalidades:')).toHaveLength(2);
  });
});