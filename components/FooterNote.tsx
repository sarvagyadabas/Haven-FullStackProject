import React from 'react';

const FooterNote: React.FC = () => {
  return (
    <div className="w-full px-3 sm:px-4 py-1">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] leading-tight text-serene-700 bg-serene-50 border border-serene-100">
          We don’t store your chats. Your conversations are safe.
        </span>
      </div>
    </div>
  );
};

export default FooterNote;
