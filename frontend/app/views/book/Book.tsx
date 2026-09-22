import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSession } from "~/context/SessionContext";
import MainLayout from "~/layouts/MainLayout";
import type { Book as BookType } from "~/lib/types";

interface Props {
  data: { data: BookType };
}

const Book: React.FC<Props> = ({ data }) => {
  const book = data.data;

  const { user } = useSession();

  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<{
    book: string;
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
      toast.success("The book was rented successfully.");
      navigate("/my-books");
    },
    onError: (error) => {
      toast.error(
        `The following error occured when creating a rental: ${error}`,
      );
    },
  });

  const submitRental = (data: { book: string }) => {
    const ids = [Number(data.book)];
    postRentalMutation.mutate({ books: ids });
  };

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit(submitRental)}
        className="space-y-6 lg:mx-50"
      >
        <input {...register("book")} hidden={true} value={book.id} />
        <div className="space-y-1">
          <h1 className="text-3xl font-bold italic">{book.title}</h1>
          <p className="space-x-2 text-sm">
            {book.authors.map((author) => (
              <span>{author.name}</span>
            ))}
          </p>
        </div>
        <p>{book.description}</p>
        {user ? (
          <button type="submit" className="button-primary">
            rent book
          </button>
        ) : (
          <div className="italic font-semibold mb-10 bg-blue-100 border-2 border-blue-500 rounded-lg px-3 py-2 flex flex-row items-center gap-2">
            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />
            <p>You have to be logged in to rent books.</p>
            <a href="/login" className="text-blue-500 underline">
              Go to login
            </a>
          </div>
        )}
      </form>
    </MainLayout>
  );
};

export default Book;
