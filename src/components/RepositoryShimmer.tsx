import ShimmerElement from "./ShimmerElement";

const RepositoryShimmer = () => {
  return (
    <div
      className="min-h-screen bg-gray-950 p-6"
      data-testid="repository-shimmer"
    >
      <div className="mx-auto">
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <ShimmerElement className="w-16 h-16 rounded-full" />

            <div className="flex-1">
              <div className="flex justify-between items-center gap-2 mb-2">
                <div className="flex-1">
                  <ShimmerElement className="h-8 w-64 mb-2" />
                </div>
              </div>
              <ShimmerElement className="h-4 w-full mb-2" />
              <ShimmerElement className="h-4 w-3/4 mb-4" />
              <div className="flex items-center gap-6">
                <ShimmerElement className="h-4 w-16" />
                <ShimmerElement className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-950 rounded-xl shadow-lg p-6 border border-gray-900">
              <div className="flex items-center gap-2 mb-4">
                <ShimmerElement className="h-5 w-5 rounded" />
                <ShimmerElement className="h-6 w-40" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="p-4">
                    <ShimmerElement className="h-8 w-60 mb-2" />
                    <ShimmerElement className="h-4 w-30" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-950 rounded-xl shadow-lg p-6 border border-gray-900">
              <div className="flex items-center gap-2 mb-4">
                <ShimmerElement className="h-5 w-5 rounded" />
                <ShimmerElement className="h-6 w-24" />
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ShimmerElement className="h-8 flex-1 rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-950 rounded-xl shadow-lg p-6 border border-gray-900">
              <div className="flex items-center gap-2 mb-4">
                <ShimmerElement className="h-5 w-5 rounded" />
                <ShimmerElement className="h-6 w-28" />
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  {[...Array(2)].map((_, index) => (
                    <div key={index}>
                      <ShimmerElement className="h-3 rounded-full mb-1" />
                      <ShimmerElement className="h-3 w-28 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-950 rounded-xl shadow-lg p-6 border border-gray-900">
              <div className="flex items-center gap-2 mb-4">
                <ShimmerElement className="h-5 w-5 rounded" />
                <ShimmerElement className="h-6 w-20" />
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <ShimmerElement className="w-3 h-3 rounded-full" />
                    <div className="flex-1">
                      <ShimmerElement className="h-4 w-20 mb-1" />
                      <ShimmerElement className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryShimmer;
