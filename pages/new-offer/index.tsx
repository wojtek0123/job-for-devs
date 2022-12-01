import { ReactElement, useState } from 'react';
import {
  IUserID,
  OfferDataDetails,
  FormData,
  INotification,
} from '../../helpers/types';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_OFFER, GET_USER_ID } from '../../graphql/queries';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { NextPageWithLayout } from '../_app';
import Layout from '../../components/layouts/layout';
import OfferForm from '../../components/offer-form/OfferForm';
import Notification from '../../components/notification/Notification';
import { redirectTo } from '../../utils/functions';
import PermissionMessageCheck from '../../components/permission-message-check/PermissionMessageCheck';

const NewOffer: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    async onUnauthenticated() {
      await router.push('/login');
    },
  });
  const [addOffer] = useMutation(ADD_OFFER);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState<INotification>({
    message: '',
    isError: false,
  });

  const { data: userId } = useQuery<IUserID>(GET_USER_ID, {
    variables: {
      email: session?.user?.email,
    },
  });

  const onAddOffer = async (
    addedOffer: OfferDataDetails | FormData
  ): Promise<void> => {
    try {
      const newOffer = await addOffer({
        variables: {
          category: addedOffer.category,
          location: addedOffer.location,
          jobTitle: addedOffer.jobTitle,
          companyName: addedOffer.companyName,
          typeOfDayJob: addedOffer.typeOfDayJob,
          seniority: addedOffer.seniority,
          street: addedOffer.street,
          building: addedOffer.building,
          house: addedOffer.house,
          city: addedOffer.city,
          minSalary: addedOffer.minSalary,
          maxSalary: addedOffer.maxSalary,
          exactSalary: addedOffer.exactSalary,
          technologies: addedOffer.technologies,
          description: addedOffer.description,
          obligations: addedOffer.obligations,
          requirements: addedOffer.requirements,
          advantages: addedOffer.advantages,
          benefits: addedOffer.benefits,
          userId: userId?.userId.id,
        },
      });
      setShowNotification(true);
      setNotification({
        message:
          'Dodano ofertę pracy. Za chwilę zostaniesz do niej przekierowany',
        isError: false,
      });

      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      await redirectTo(`/offer/${newOffer.data?.addOffer.id as string}`);
    } catch (error) {
      setNotification({ message: 'Coś poszło nie tak', isError: true });
      setTimeout(() => setShowNotification(false), 4000);
    }
  };

  if (status === 'loading') {
    return <PermissionMessageCheck />;
  }

  return (
    <>
      <Notification
        isError={notification.isError}
        message={notification.message}
        show={showNotification}
      />
      <OfferForm onOffer={onAddOffer} />
    </>
  );
};

NewOffer.getLayout = function getLayout(page: ReactElement) {
  return <Layout typeHeader='new-offer'>{page}</Layout>;
};

export default NewOffer;
