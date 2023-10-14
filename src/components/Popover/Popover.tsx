import { FloatingArrow, FloatingPortal, arrow, shift, useFloating, type Placement } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useId, useRef, useState, type ElementType } from 'react'

interface PopoverProps {
  children: ReactNode
  renderPopover: ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

const Popover = ({
  renderPopover,
  children,
  className,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: PopoverProps) => {
  const floatPortalId = useId()
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    middleware: [shift(), arrow({ element: arrowRef })],
    placement
  })

  const [isOpen, setIsOpen] = useState(initialOpen || false)

  const showPopover = () => setIsOpen(true)

  const hidePopover = () => setIsOpen(false)

  return (
    <>
      <Element ref={refs.setReference} className={className} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
        {children}
        <AnimatePresence>
          {isOpen && (
            <FloatingPortal id={floatPortalId}>
              <div ref={refs.setFloating} style={floatingStyles}>
                <motion.div
                  style={{ transformOrigin: `${middlewareData.arrow?.x}px top` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderPopover}
                  <FloatingArrow ref={arrowRef} context={context} fill='white' />
                </motion.div>
              </div>
            </FloatingPortal>
          )}
        </AnimatePresence>
      </Element>
    </>
  )
}

export default Popover
