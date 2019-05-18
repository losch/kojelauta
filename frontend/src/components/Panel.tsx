import React from 'react';
import './Panel.css';

interface PanelProps {
  children: any;
  className?: string;
}

const Panel = ({children, className}: PanelProps) =>
  <div className={"Panel" + (className ? ` ${className}` : '')}>
    <div className="PanelContents">
      {children}
    </div>
  </div>;

export default Panel;
