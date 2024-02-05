export const generatePagination = (currentPage: number, totalPages: number) => {
  // Mostrar todas las paginas
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Mostrar las primeras 3 paginas
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Mostrar primeras dos paginas
  if (currentPage > totalPages - 3) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Mostrar primera pagina
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
