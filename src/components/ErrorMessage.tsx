import { motion } from "framer-motion";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center p-6 bg-red-100 text-red-700 rounded-lg"
    data-testid="error-message"
  >
    <h2 className="text-xl font-bold">Error</h2>
    <p>{message || "Something went wrong!"}</p>
  </motion.div>
);

export default ErrorMessage;
