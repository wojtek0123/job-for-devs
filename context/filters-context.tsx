import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_OFFERS } from '../graphql/queries';
import { OfferData } from '../helpers/types';

interface IFilters {
  [index: string]: string;
  city: string;
  seniority: string;
  jobTitle: string;
}

interface IFiltersContext {
  enteredTitle: string;
  selectedTechnologies: string[];
  selectedCity: string;
  selectedSeniority: string;
  offers: OfferData[] | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
  changeTechnologies: (event: React.FormEvent<HTMLButtonElement>) => void;
  changeSeniority: (event: React.FormEvent<HTMLButtonElement>) => void;
  changeCity: (event: React.FormEvent<HTMLButtonElement>) => void;
  changeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilter: (event: React.FormEvent) => void;
}

const FiltersContext = React.createContext<IFiltersContext>({
  enteredTitle: '',
  selectedTechnologies: [],
  selectedCity: '',
  selectedSeniority: '',
  offers: [],
  loading: false,
  error: undefined,
  refetch: () => {},
  changeTechnologies: () => {},
  changeSeniority: () => {},
  changeCity: () => {},
  changeTitle: () => {},
  onFilter: () => {},
});

export const FiltersContextProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { data, loading, error, refetch } = useQuery<{ offers: OfferData[] }>(
    GET_OFFERS
  );
  const [offers, setOffers] = useState<OfferData[]>([]);
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
    event: React.FormEvent<HTMLButtonElement>
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

  const changeSeniorityHandler = (
    event: React.FormEvent<HTMLButtonElement>
  ): void => {
    if (event.currentTarget.id === 'clear-seniority') {
      setSelectedSeniority('');
      return;
    }
    setSelectedSeniority(event.currentTarget.textContent?.toLowerCase() ?? '');
  };

  const changeCityHandler = (
    event: React.FormEvent<HTMLButtonElement>
  ): void => {
    if (event.currentTarget.id === 'clear-city') {
      setSelectedCity('');
      return;
    }
    setSelectedCity(event.currentTarget.textContent?.toLowerCase() ?? '');
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
      enteredTitle.length === 0
    ) {
      setOffers(data.offers);
      return;
    }

    const filters: IFilters = {
      city: selectedCity.toLowerCase(),
      seniority: selectedSeniority.toLowerCase(),
      jobTitle: enteredTitle.toLowerCase(),
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
    // Object.keys(filters).every((key) => offer[key] === filters[key] || filters[key] === ''

    const filteredOffersByAllParameters = filteredOffers.filter(
      (offer) =>
        (offer.city.toLowerCase() === filters.city || filters.city === '') &&
        (offer.seniority.toLowerCase() === filters.seniority ||
          filters.seniority === '') &&
        (offer.jobTitle.toLowerCase().includes(filters.jobTitle) ||
          filters.jobTitle === '')
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
    selectedTechnologies,
    selectedCity,
    selectedSeniority,
    offers,
    loading,
    error,
    refetch,
    changeTechnologies: changeTechnologiesHandler,
    changeCity: changeCityHandler,
    changeSeniority: changeSeniorityHandler,
    changeTitle: changeTitleHandler,
    onFilter: filterByTechnologiesCitySeniority,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export default FiltersContext;
