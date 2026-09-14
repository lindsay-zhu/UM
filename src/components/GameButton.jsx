import { motion } from 'framer-motion';
export default function GameButton({ children, variant = 'blue', className = '', selected = false, ...props }) {
  return <motion.button whileHover={{ scale: 1.03, filter: 'brightness(1.06)' }} whileTap={{ scale: .97 }} transition={{ duration: .18 }} className={`game-button ${variant} ${selected ? 'selected' : ''} ${className}`} {...props}>{children}</motion.button>;
}
