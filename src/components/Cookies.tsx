import { Link } from 'react-router-dom';
import { metadata } from '@/shared/data';
import { useEffect, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';

export default function Cookies() {
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  // controls the life cicle of the component

  const advisorController = () => {
    setIsPopupActive(() => false);
    localStorage.setItem('cookies_warning', JSON.stringify('false'));
  };

  useEffect(() => {
    const advisorState = JSON.parse(localStorage.getItem('cookies_warning') || 'false');

    if (!advisorState) {
      localStorage.setItem('cookies_warning', JSON.stringify('true'));
      setIsPopupActive(() => true);
    }
    if (advisorState === 'true') {
      setIsPopupActive(() => true);
    } else {
      setIsPopupActive(() => false);
    }
  }, []);

  if (!isPopupActive) return null;

  return (
    <AnimatePresence>
      <motion.section
        className='advisor'
        initial={{ opacity: 0, y: 500 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1.2 },
        }}
        exit={{
          opacity: 0,
          y: 500,
          transition: { duration: 1.2 },
        }}>
        <div>
          <p>
            We use cookies to grant you a better experience in our site. By using{' '}
            {metadata.appName}, you accept our {'  '}
            <Link to='/docs/privacy-policy'>
              <strong>privacy policy</strong>
            </Link>
            .
          </p>
          <button onClick={advisorController}>
            <span>Accept and close</span>
          </button>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
