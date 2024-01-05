import { m as motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { updatePrompt } from '@/state/slices/promptSlice';

export default function Prompt() {
  const dispatch = useDispatch();
  const prompt = useSelector((state: RootState) => state.prompt);

  if (!prompt.isOpen) return null;

  return (
    <AnimatePresence>
      <section
        className='main'
        onClick={(e: any) => {
          const target = e.target.classList.contains('main');
          if (target)
            return dispatch(updatePrompt({ ...prompt, isOpen: false }));
        }}>
        <motion.section
          className='dialog-modal'
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 }
          }}
          exit={{ opacity: 0, scale: 0 }}>
          <div className='dialog-prompt'>
            <div className='prompt-info'>
              <span className='prompt-title'>{prompt.title}</span>
              <p className='prompt-message'>{prompt.description}</p>
            </div>
            <div className='prompt-actions'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                className='prompt-cancel'
                onClick={() =>
                  dispatch(updatePrompt({ ...prompt, isOpen: false }))
                }>
                <span>Cancel</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                className='prompt-accept'
                onClick={prompt.onSubmit}>
                <span>{prompt.buttonLabel}</span>
              </motion.button>
            </div>
          </div>
        </motion.section>
      </section>
    </AnimatePresence>
  );
}
