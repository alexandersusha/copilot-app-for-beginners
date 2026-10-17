import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { filterBooks, type BookFiltersState } from "../App";
import { BookFilters } from "../components/BookFilters";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

describe("filterBooks", () => {
  it("matches title and author searches without depending on letter case", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "hobbit"
    });

    expect(results.map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });

  it("uses descriptive labels for each filter field", () => {
    render(
      <BookFilters
        genres={["Fantasy", "Mystery"]}
        searchTerm=""
        selectedGenre="all"
        readingStatus="all"
        onSearchTermChange={() => {}}
        onGenreChange={() => {}}
        onReadingStatusChange={() => {}}
      />
    );

    expect(screen.getByLabelText("Search by title or author")).toBeTruthy();
    expect(screen.getByLabelText("Genre")).toBeTruthy();
    expect(screen.getByLabelText("Reading status")).toBeTruthy();
  });
});
