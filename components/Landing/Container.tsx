import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container(props: Readonly<ContainerProps>) {
  return (
    <div
      className={`container mx-auto p-5 sm:p-8 xl:px-0 ${props.className ? props.className : ''}`}
    >
      {props.children}
    </div>
  );
}
