import ShimmerElement from "./ShimmerElement";

const ShimmerCard = () => {
  return (
    <div className="h-full p-6 rounded-xl shadow-lg bg-gray-950 border border-gray-900">
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-center space-x-3 mb-4">
          <ShimmerElement className="w-8 h-8 rounded-full bg-gray-700" />
          <ShimmerElement className="h-4 w-16 bg-gray-700 rounded" />
        </div>
        <div className="mb-3">
          <ShimmerElement className="h-7 w-48 bg-gray-700 rounded" />
        </div>

        <div className="mb-4 space-y-2">
          <ShimmerElement className="h-4 w-full bg-gray-700 rounded" />
          <ShimmerElement className="h-4 w-3/4 bg-gray-700 rounded" />
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <ShimmerElement className="h-4 w-12 bg-gray-700 rounded" />
          <ShimmerElement className="h-4 w-20 bg-gray-700 rounded" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <ShimmerElement className="h-4 w-12 bg-gray-700 rounded" />
          </div>
          <ShimmerElement className="h-3 w-12 bg-gray-700 rounded" />
        </div>

        <div className="border-t border-gray-950 pt-3">
          <div className="flex items-center justify-between">
            <ShimmerElement className="h-3 w-24 bg-gray-700 rounded" />
            <ShimmerElement className="h-3 w-24 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
