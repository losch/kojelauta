import React from 'react';
import './Panel.css';

interface PanelProps {
  children: any;
}

const Panel = ({children}: PanelProps) =>
  <div className="Panel">
    <div className="PanelContents">
      {children}
    </div>
  </div>;

export default Panel;
