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
    if (!toast.closeOnDelay) return;
    const debounceTimer = setTimeout(() => {
      dispatch(updateToast({ title: '', message: '', status: false }));
    }, 5000);

    return () => clearTimeout(debounceTimer);
  }, [toast]);

  return (
    <AnimatePresence>
      {toast.status && (
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
                    dispatch(updateToast({ ...toast, status: false }))
                  }>
                  <RiCloseLine />
                </motion.button>
                <span className='prompt-title'>{toast.title}</span>
                <section className='prompt-message'>
                  {toast.message.includes('\n') ? (
                    toast.message.split('\n').map((phrase) => <p>{phrase}</p>)
                  ) : (
                    <p>{toast.message}</p>
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
                    dispatch(updateToast({ ...toast, status: false }))
                  }>
                  <span>Dismiss</span>
                </motion.button>

                {!toast.handleFunction || !toast.actionButtonMessage ? null : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    title={toast.actionButtonMessage}
                    aria-label={toast.actionButtonMessage}
                    className='prompt-accept'
                    onClick={toast.handleFunction}>
                    <span>{toast.actionButtonMessage}</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.section>
        </section>
      )}
    </AnimatePresence>
  );
}
