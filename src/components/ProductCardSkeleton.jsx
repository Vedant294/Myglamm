export const ProductCardSkeleton = () => {
    return (
        <div className="relative overflow-hidden transition-shadow duration-300 bg-white shadow-lg rounded-2xl animate-pulse">
            <div className="relative h-48 bg-gray-200 rounded-t-2xl"></div>
            <div className="p-4 space-y-2 border-t border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-300 rounded mt-2"></div>
            </div>
        </div>
    );
};
