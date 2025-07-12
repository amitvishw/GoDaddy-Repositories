import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center h-screen text-gray-700"
  >
    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    <p className="mt-4">The page you're looking for doesn't exist.</p>
    <Link to="/" className="mt-4 text-blue-600 hover:underline">
      Go Home
    </Link>
  </motion.div>
);

export default NotFound;
