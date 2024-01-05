import { RiCloseLine } from 'react-icons/ri';
import { m as motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { updateToast } from '@/state/slices/toastSlice';

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (!toast.closeDelay) return;
    const debounceTimer = setTimeout(() => {
      dispatch(updateToast({ title: '', description: '', isOpen: false }));
    }, 5000);

    return () => clearTimeout(debounceTimer);
  }, [toast]);

  if (!toast.isOpen) return null;

  return (
    <AnimatePresence>
      <section>
        <motion.section
          className='dialog-modal'
          initial={{ opacity: 0, y: 500 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1.2 }
          }}
          exit={{
            opacity: 0,
            y: 500,
            transition: { duration: 1.2 }
          }}>
          <div className='dialog-prompt'>
            <div className='prompt-info'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                title='Close and dismiss'
                aria-label='Close and dismiss'
                className='box-btn_close'
                onClick={() =>
                  dispatch(updateToast({ ...toast, isOpen: false }))
                }>
                <RiCloseLine />
              </motion.button>
              <span className='prompt-title'>{toast.title}</span>
              <section className='prompt-message'>
                {toast.description.includes('\n') ? (
                  toast.description.split('\n').map((phrase) => <p>{phrase}</p>)
                ) : (
                  <p>{toast.description}</p>
                )}
              </section>
            </div>
            <div className='prompt-actions'>
              <motion.button
                title='Dismiss'
                aria-label='Dismiss'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className='prompt-cancel'
                onClick={() =>
                  dispatch(updateToast({ ...toast, isOpen: false }))
                }>
                <span>Dismiss</span>
              </motion.button>

              {!toast.onSubmit || !toast.buttonLabel ? null : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  title={toast.buttonLabel}
                  aria-label={toast.buttonLabel}
                  className='prompt-accept'
                  onClick={toast.onSubmit}>
                  <span>{toast.buttonLabel}</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.section>
      </section>
    </AnimatePresence>
  );
}
