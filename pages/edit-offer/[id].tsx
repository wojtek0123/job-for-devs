import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '../../components/layouts/layout';
import OfferForm from '../../components/offer-form/OfferForm';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { context as graphContext } from '../api/graphql/context';
import { OfferDataDetails, FormData, INotification } from '../../helpers/types';
import { useMutation } from '@apollo/client';
import { EDIT_OFFER } from '../../graphql/queries';
import Notification from '../../components/notification/Notification';
import { redirectTo } from '../../utils/functions';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const offer = await graphContext.prisma.offer.findUnique({
    where: { id: context.params?.id?.toString() },
    select: {
      id: true,
      category: true,
      location: true,
      jobTitle: true,
      companyName: true,
      typeOfDayJob: true,
      seniority: true,
      street: true,
      building: true,
      house: true,
      city: true,
      minSalary: true,
      maxSalary: true,
      exactSalary: true,
      technologies: true,
      description: true,
      obligations: true,
      requirements: true,
      advantages: true,
      benefits: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {},
    };
  }

  const user = await graphContext.prisma.user.findUnique({
    where: { email: session.user?.email ?? '' },
  });

  if (user?.id === offer?.userId) {
    return {
      props: {
        offer: JSON.parse(JSON.stringify(offer)),
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
    props: {},
  };
};

interface EditOfferProps {
  offer: OfferDataDetails;
  user: {
    name: string;
    email: string;
    id: string;
    image: string;
  };
}

const EditOffer: NextPageWithLayout<EditOfferProps> = ({ offer, user }) => {
  const [editOffer] = useMutation(EDIT_OFFER);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState<INotification>({
    message: '',
    isError: false,
  });

  const onEditOffer = async (
    editedOffer: OfferDataDetails | FormData
  ): Promise<void> => {
    try {
      const editedOfferData = await editOffer({
        variables: {
          id: offer.id,
          category: editedOffer.category,
          technologies: editedOffer.technologies,
          minSalary: editedOffer.minSalary,
          maxSalary: editedOffer.maxSalary,
          exactSalary: editedOffer.exactSalary,
          location: editedOffer.location,
          typeOfDayJob: editedOffer.typeOfDayJob,
          seniority: editedOffer.seniority,
          benefits: editedOffer.benefits,
          jobTitle: editedOffer.jobTitle,
          description: editedOffer.description,
          obligations: editedOffer.obligations,
          requirements: editedOffer.requirements,
          advantages: editedOffer.advantages,
          companyName: editedOffer.companyName,
          city: editedOffer.city,
          street: editedOffer.street,
          building: editedOffer.building,
          house: editedOffer.house,
          userId: user.id,
        },
      });
      setShowNotification(true);
      setNotification({
        message:
          'Poprawiono ofertę. Za chwilę zostaniesz przekierowany do profilu.',
        isError: false,
      });
      console.log(editedOfferData);

      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
      const pathSegment = editedOfferData.data?.editOffer.userId;
      await redirectTo(`/profile/${pathSegment as string}`);
    } catch (error) {
      setNotification({ message: 'Coś poszło nie tak', isError: true });
      setTimeout(() => setShowNotification(false), 4000);
    }
  };

  return (
    <>
      <Notification
        isError={notification.isError}
        message={notification.message}
        show={showNotification}
      />
      <OfferForm offer={offer} onOffer={onEditOffer} />
    </>
  );
};

EditOffer.getLayout = function getLayout(page: ReactElement) {
  return <Layout typeHeader='new-offer'>{page}</Layout>;
};

export default EditOffer;
