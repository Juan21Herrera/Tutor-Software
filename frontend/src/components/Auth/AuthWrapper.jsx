import { AnimatePresence, motion } from "framer-motion";
import Register from "./Register";
import Login from "./Login";

const AuthWrapper = () => {
  const [isLogin, setIsLogin] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.4 }}
          >
            <Login onSwitch={() => setIsLogin(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.4 }}
          >
            <Register onSwitch={() => setIsLogin(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
