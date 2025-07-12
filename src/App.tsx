import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RepoList from "./pages/RepositoryList";
import RepoDetails from "./pages/RepositoryDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-950 min-w-6xl px-24">
          <header className="flex text-gray-100 p-4">
            <Link to="/">
              <div className="flex items-center">
                <div>
                  <img
                    className="w-12 h-12"
                    src="https://avatars.githubusercontent.com/u/1406546?v=4"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">GoDaddy Repositories</h1>
                </div>
              </div>
            </Link>
          </header>
          <div className="px-20 py-15">
            <Routes>
            <Route path="/" element={<RepoList />} />
            <Route path="/repo/:repoName" element={<RepoDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
