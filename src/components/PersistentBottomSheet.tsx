import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';





import { ReactNode } from 'react';

const PersistentBottomSheet = ({ children, minHeight = 230, maxHeight = 400 }: { children: ReactNode, minHeight?: number, maxHeight?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const springProps = useSpring({
    height: isExpanded ? maxHeight : minHeight,
    config: {
      tension: 300,
      friction: 30
    }
  });

  
  return (
    <div className="fixed inset-x-0 bg-red z-50 bottom-0">
      <animated.div 
        style={springProps}
        className="bg-white  rounded-t-2xl flex flex-col mx-2 shadow-lg  overflow-hidden"
      >
        {/* Handle bar for dragging */}
        <div 
          className="w-full  py-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
        </div>
        
        {/* Content area */}
        <div className="px-4  overflow-y-auto">
          {children}
        </div>
      </animated.div>
    </div>
  );
};

// Example usage


export default PersistentBottomSheet;