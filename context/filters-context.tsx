import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_OFFERS } from '../graphql/queries';
import { cities } from '../helpers/constants';
import { OfferData } from '../helpers/types';

interface IFilters {
  [index: string]: string;
  city: string;
  seniority: string;
  jobTitle: string;
  category: string;
}

interface IFiltersRestCity {
  [index: string]: string;
  seniority: string;
  jobTitle: string;
  category: string;
}

interface IFiltersContext {
  enteredTitle: string;
  selectedCategory: string;
  selectedTechnologies: string[];
  selectedCity: string;
  selectedSeniority: string;
  offers: OfferData[] | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
  changeCategory: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeTechnologies: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeSeniority: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeCity: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilter: (event: React.FormEvent) => void;
}

const FiltersContext = React.createContext<IFiltersContext>({
  enteredTitle: '',
  selectedCategory: '',
  selectedTechnologies: [],
  selectedCity: '',
  selectedSeniority: '',
  offers: [],
  loading: false,
  error: undefined,
  refetch: () => {},
  changeCategory: () => {},
  changeTechnologies: () => {},
  changeSeniority: () => {},
  changeCity: () => {},
  changeTitle: () => {},
  onFilter: () => {},
});

type resetButtonIds = 'clear-category' | 'clear-city' | 'clear-seniority';

export const FiltersContextProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { data, loading, error, refetch } = useQuery<{ offers: OfferData[] }>(
    GET_OFFERS
  );
  const [offers, setOffers] = useState<OfferData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');

  const changeTitleHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEnteredTitle(event.target.value.trim().toLowerCase());
  };

  const changeTechnologiesHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    if (event.currentTarget.id === 'clear-technologies') {
      setSelectedTechnologies([]);
      return;
    }

    const selectedTechnology =
      event.currentTarget.textContent?.toLowerCase() ?? '';

    if (selectedTechnologies.includes(selectedTechnology)) {
      const filteredTechnologies = selectedTechnologies.filter(
        (technology) => technology.toLowerCase() !== selectedTechnology
      );

      setSelectedTechnologies(filteredTechnologies);
      return;
    }

    if (selectedTechnologies.length > 5) {
      return;
    }

    setSelectedTechnologies((prevState) => [...prevState, selectedTechnology]);
  };

  const changeValueHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: resetButtonIds,
    fn: (value: string) => void
  ): void => {
    if (event.currentTarget.id === id) {
      fn('');
      return;
    }
    fn(event.currentTarget.textContent?.toLowerCase() ?? '');
  };

  const filterByTechnologiesCitySeniority = (event: React.FormEvent): void => {
    event.preventDefault();

    if (!data?.offers) {
      return;
    }

    if (
      selectedCity.length === 0 &&
      selectedSeniority.length === 0 &&
      selectedTechnologies.length === 0 &&
      enteredTitle.length === 0 &&
      selectedCategory.length === 0
    ) {
      setOffers(data.offers);
      return;
    }

    const filters: IFilters = {
      city: selectedCity,
      seniority: selectedSeniority,
      jobTitle: enteredTitle,
      category: selectedCategory,
    };

    const filtersRestCity: IFiltersRestCity = {
      seniority: selectedSeniority,
      jobTitle: enteredTitle,
      category: selectedCategory,
    };

    let filteredOffers;

    if (selectedTechnologies.length !== 0) {
      filteredOffers = data.offers.filter((offer) =>
        offer.technologies.some((technology) =>
          selectedTechnologies.includes(technology.toLowerCase())
        )
      );
    } else {
      filteredOffers = data.offers;
    }

    if (selectedCity.toLowerCase() === 'inne') {
      const restCity = filteredOffers.filter((offer) =>
        cities.every((city) => offer.city !== city.toLowerCase())
      );

      const filteredRestCity = restCity.filter((offer) =>
        [...Object.keys(filtersRestCity)].every(
          (key) =>
            offer[key]
              .toString()
              .toLowerCase()
              .includes(filtersRestCity[key]) || filtersRestCity[key] === '',
        ),
      );

      setOffers(filteredRestCity);
      return;
    }

    const filteredOffersByAllParameters = filteredOffers.filter((offer) =>
      [...Object.keys(filters)].every(
        (key) =>
          offer[key].toString().toLowerCase().includes(filters[key]) ||
          filters[key] === ''
      )
    );

    setOffers(filteredOffersByAllParameters);
  };

  useEffect(() => {
    if (data !== undefined) {
      setOffers(data.offers);
    }
  }, [data]);

  const value = {
    enteredTitle,
    selectedCategory,
    selectedTechnologies,
    selectedCity,
    selectedSeniority,
    offers,
    loading,
    error,
    refetch,
    changeCategory: (event: React.MouseEvent<HTMLButtonElement>) =>
      changeValueHandler(event, 'clear-category', setSelectedCategory),
    changeTechnologies: changeTechnologiesHandler,
    changeCity: (event: React.MouseEvent<HTMLButtonElement>) =>
      changeValueHandler(event, 'clear-city', setSelectedCity),
    changeSeniority: (event: React.MouseEvent<HTMLButtonElement>) =>
      changeValueHandler(event, 'clear-seniority', setSelectedSeniority),
    changeTitle: changeTitleHandler,
    onFilter: filterByTechnologiesCitySeniority,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export default FiltersContext;
