import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
};

export const renderWithQueryClient = (component: any) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
};

export const renderWithRouter = (component: any) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/repo/:repoName" element={component} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};
export * from "@testing-library/react";
