import React, { useState } from 'react'

const useShowElement = () => {
  const [active, setActive] = useState(false);
  
  const activeElement = () => {
    setActive(!active);
  }

  const isActive = () =>  {
    return active;
  }

  return {
    active,
    setActive,
    activeElement,
    isActive
  }
}

export default useShowElement