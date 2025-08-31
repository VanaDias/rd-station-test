// Form.js

import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';
import toast from 'react-hot-toast';

function Form({changeRecommendations}) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.selectedRecommendationType) {
      toast.error('Por favor, selecione o tipo de recomendação.');
      return;
    }
    if (formData.selectedPreferences.length === 0 && formData.selectedFeatures.length === 0) {
      toast.error('Por favor, selecione pelo menos uma preferência ou funcionalidade.');
      return;
    }
    const dataRecommendations = getRecommendations(formData);
    changeRecommendations(dataRecommendations);
  };

  return (
    <form
      className="max-w-md mx-auto p-4 flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
