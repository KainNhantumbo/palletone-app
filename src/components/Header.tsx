import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoImage from '@/assets/boards-logo.png';
import { metadata, nav_anchors } from '../shared/data';
import { m as motion, AnimatePresence } from 'framer-motion';
import { _header as Container } from '../styles/modules/_header';
import { RiMenuLine, RiCloseLine, RiArrowRightLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export default function Header() {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const windowInnerSize = useSelector(
    (state: RootState) => state.innerWindowSize
  );

  const toggleMenu = (): void => setIsMenu((current) => !current);

  useEffect((): void => {
    windowInnerSize.width > 770 ? setIsMenu(true) : setIsMenu(false);
  }, [windowInnerSize]);

  return (
    <Container>
      <div className='wrapper'>
        <div className='logo'>
          <Link to={'/'}>
            <img
              loading='lazy'
              decoding='async'
              alt={`${metadata.appName} Logo`}
              src={logoImage}
            />
          </Link>
          <h3 onClick={() => navigate('/')}>
            <span>{metadata.appName}</span>
          </h3>
        </div>
        <AnimatePresence>
          {isMenu && (
            <motion.nav
              initial={{ translateY: -70 }}
              animate={{ translateY: 0 }}
              transition={{ duration: 0.25 }}
              exit={{
                opacity: 0,
                translateY: -70,
                transition: { duration: 0.25 }
              }}
              style={{ display: isMenu ? 'flex' : 'none' }}>
              <section className='navigation-anchors-container'>
                {nav_anchors.map((item, index) => (
                  <a
                    key={index.toString()}
                    href={item.url}
                    className={
                      location.pathname.includes(item.alias) ? 'active' : ''
                    }>
                    <motion.span whileHover={{ scale: 1.1 }}>
                      {item.name}
                    </motion.span>
                  </a>
                ))}
              </section>

              <div className='left-corner-container'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  title='Go to workspace'
                  className='user-account'
                  onClick={() => navigate(`/boards`)}>
                  <span>Go to Workspace</span>
                  <RiArrowRightLine />
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.8 }}
          title={`${isMenu ? 'Close menu drawer' : 'Open menu drawer'}`}
          aria-placeholder={`${
            isMenu ? 'Close menu drawer' : 'Open menu drawer'
          }`}
          aria-label={`${isMenu ? 'Close menu drawer' : 'Open menu drawer'}`}
          className={`toggle-btn ${isMenu ? 'toggle-btn_active' : ''}`}
          onClick={toggleMenu}>
          {!isMenu ? <RiMenuLine /> : <RiCloseLine />}
        </motion.button>
      </div>
    </Container>
  );
}
