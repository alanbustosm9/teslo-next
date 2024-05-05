interface Props {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string | undefined | null;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };
}

export const OrderAddress = ({ address }: Props) => {
  return (
    <>
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-6">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>
    </>
  );
};
