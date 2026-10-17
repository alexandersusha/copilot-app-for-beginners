import { describe, expect, it } from "vitest";
import { filterBooks, type BookFiltersState } from "../App";
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

  it("returns the same results for uppercase and lowercase searches", () => {
    const author = books[0].author;
    for (const term of ["hobbit", "HOBBIT", "HoBbIt", author.toLowerCase(), author.toUpperCase()]) {
      const results = filterBooks(books, { ...defaultFilters, searchTerm: term });
      const expected = filterBooks(books, { ...defaultFilters, searchTerm: term.toLowerCase() });

      expect(results.length).toBeGreaterThan(0);
      expect(results).toEqual(expected);
    }
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });
});
