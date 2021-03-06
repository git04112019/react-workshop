import React, { useState, forwardRef } from 'react'

export function Disclosure({ children, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isOpen,
      onSelect: () => setIsOpen(!isOpen),
    })
  })

  // Notice we don't need the wrapper div. It wasn't doing anything stylistically for us anyway
  return children
}

export const DisclosureButton = forwardRef(({ children, onSelect, ...props }, forwardedRef) => {
  // Note, data attributes in React need to have an empty string in order to be created correctly.
  return (
    <button onClick={onSelect} data-disclosure-target="" ref={forwardedRef} {...props}>
      {children}
    </button>
  )
})

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = forwardRef(({ children, isOpen, ...props }, forwardedRef) => {
  return (
    <div hidden={!isOpen} data-disclosure-panel="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

DisclosurePanel.displayName = 'DisclosurePanel'
