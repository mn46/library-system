import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSession } from "~/context/SessionContext";
import MainLayout from "~/layouts/MainLayout";
import type { Book } from "~/lib/types";

interface Props {
  books: { data: Book[] };
}

const Books: React.FC<Props> = ({ books }) => {
  const { user } = useSession();

  const { handleSubmit, register, watch, reset } = useForm<{
    books: string[];
  }>();

  const postRentalMutation = useMutation({
    mutationFn: async (data: { books: number[] }) => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_DEV}/user/${user}/rentals`,
        {
          method: "POST",
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
      toast.success("The books were rented successfully.");
      reset();
    },
    onError: (error) => {
      toast.error(
        `The following error occured when creating a rental: ${error}`,
      );
    },
  });

  const submitRental = (data: { books: string[] }) => {
    const ids = data.books.map((id) => Number(id));
    postRentalMutation.mutate({ books: ids });
  };

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit(submitRental)}
        className="lg:max-w-[40vw] mx-auto"
      >
        {user ? (
          <div className="flex justify-end">
            <button type="submit" className="button-primary mb-10">
              Rent {watch("books").length ?? 0} books
            </button>
          </div>
        ) : (
          <p
            className="italic font-semibold
           mb-10 bg-amber-600/40 border border-amber-600 rounded-lg px-3 py-2"
          >
            You have to be logged in to rent books.
          </p>
        )}
        {books ? (
          books.data.map((book) => (
            <div className="flex flex-row justify-between mb-10 items-center">
              <div>
                <h5 className="text-2xl italic font-semibold">{book.title}</h5>
                {book.authors.map((author) => (
                  <p>{author.name}</p>
                ))}
              </div>
              <input
                type="checkbox"
                id={String(book.id)}
                value={book.id}
                {...register("books")}
                className="w-6 h-6"
              />
            </div>
          ))
        ) : (
          <h2 className="text-2xl mx-10">No books at the moment.</h2>
        )}
      </form>
    </MainLayout>
  );
};

export default Books;
