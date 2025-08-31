import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';
import useProducts from '../../hooks/useProducts';
import useRecommendations from '../../hooks/useRecommendations';
import toast from 'react-hot-toast';

jest.mock('../../hooks/useProducts');
jest.mock('../../hooks/useRecommendations');
jest.mock('react-hot-toast');

const mockProducts = [
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

describe('Form Component', () => {
  const changeRecommendations = jest.fn();
  const getRecommendationsMock = jest.fn();

  beforeEach(() => {
    useProducts.mockReturnValue({
      products: mockProducts,
      preferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
      ],
      features: [
        'Gestão de leads e oportunidades',
        'Automação de fluxos de trabalho de vendas',
      ],
      error: null,
      loading: false,
    });
    
    getRecommendationsMock.mockReturnValue(mockProducts.slice(0, 1));
    useRecommendations.mockReturnValue({
      getRecommendations: getRecommendationsMock,
    });
    jest.clearAllMocks();
  });

  it('Verifica se o form renderiza corretamente', () => {
    render(<Form changeRecommendations={changeRecommendations} />);
    expect(screen.getByText('Tipo de Recomendação:')).toBeInTheDocument();
    expect(screen.getByText('Preferências')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidades')).toBeInTheDocument();
    expect(screen.getByText('Obter recomendação')).toBeInTheDocument();
  });

  it('Deve exibir uma mensagem de erro caso o tipo de recomendação nao for selecionado', () => {
    render(<Form changeRecommendations={changeRecommendations} />);
    fireEvent.click(screen.getByText('Obter recomendação'));
    expect(toast.error).toHaveBeenCalledWith('Por favor, selecione o tipo de recomendação.');
    expect(changeRecommendations).not.toHaveBeenCalled();
  });
  
  it('Deve exibir uma mensagem de erro caso nenhuma preferencia e feature forem selecionadas', () => {
    render(<Form changeRecommendations={changeRecommendations} />);
    fireEvent.click(screen.getByDisplayValue('SingleProduct'));
    fireEvent.click(screen.getByText('Obter recomendação'));
    expect(toast.error).toHaveBeenCalledWith('Por favor, selecione pelo menos uma preferência ou funcionalidade.');
    expect(changeRecommendations).not.toHaveBeenCalled();
  });
});