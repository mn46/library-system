import React from "react";
import Rental from "~/components/Rental";
import MainLayout from "~/layouts/MainLayout";
import type { Rental as RentalType } from "~/lib/types";

interface Props {
  rentals: { data: RentalType[] };
}

const MyBooks: React.FC<Props> = ({ rentals }) => {
  return (
    <MainLayout>
      <div className="lg:max-w-[40vw] mx-auto">
        {rentals ? (
          rentals.data.map((rental) => (
            <Rental rental={rental} key={rental.id} />
          ))
        ) : (
          <h2 className="text-2xl mx-10">No rentals at the moment.</h2>
        )}
      </div>
    </MainLayout>
  );
};

export default MyBooks;
