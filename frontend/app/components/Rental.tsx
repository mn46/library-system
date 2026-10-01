import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSession } from "~/context/SessionContext";
import type { Rental as RentalType } from "~/lib/types";

interface Props {
  rental: RentalType;
}

const Rental: React.FC<Props> = ({ rental }) => {
  const { user } = useSession();

  const { handleSubmit, register, watch, reset } = useForm<{
    books: string[];
  }>();

  const putRentalMutation = useMutation({
    mutationFn: async (data: { books: number[] }) => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_DEV}/user/${user}/rentals/${rental.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      const body = await res.json();

      if (!res.ok) {
        throw new Error(
          body?.message ?? "An unknown error occured when creating rental.",
          { cause: res.status },
        );
      }

      return body;
    },
    onSuccess: () => {
      toast.success("The books were returned successfully.");
      reset();
    },
    onError: (error) => {
      toast.error(`The following error occured when returning books: ${error}`);
    },
  });

  const deleteRentalMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_DEV}/user/${user}/rentals/${rental.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      const body = await res.json();

      if (!res.ok) {
        throw new Error(
          body?.message ?? "An unknown error occured when returning all books.",
          { cause: res.status },
        );
      }

      return body;
    },
    onSuccess: () => {
      toast.success("The books were returned successfully.");
      reset();
    },
    onError: (error) => {
      toast.error(`The following error occured when returning books: ${error}`);
    },
  });

  const submitRental = (data: { books: string | string[] }) => {
    const ids = Array.isArray(data.books)
      ? data.books.map((id) => Number(id))
      : [Number(data.books)];
    putRentalMutation.mutate({ books: ids });
  };

  return (
    <form
      onSubmit={handleSubmit(submitRental)}
      className="bg-gray-200 border-2 border-gray-500 rounded-lg p-5 mb-5"
    >
      <p className="text-sm italic">Rental {rental.id}</p>

      {rental.books.map((book) => (
        <div
          key={book.id}
          className="flex flex-row justify-between mb-5 items-center"
        >
          <p>{book.title}</p>
          <input
            type="checkbox"
            id={String(book.id)}
            value={book.id}
            {...register("books")}
            className="w-6 h-6"
          />
        </div>
      ))}

      <div className="flex justify-end space-x-3">
        <button type="submit" className="button-primary text-xs">
          Return {watch("books") ? watch("books").length : 0} books
        </button>
        <button
          type="button"
          className="button-secondary text-xs"
          onClick={() => deleteRentalMutation.mutate()}
        >
          Return all
        </button>
      </div>
    </form>
  );
};

export default Rental;
