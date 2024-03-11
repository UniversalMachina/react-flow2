// Sidebar.js
import React, { useState, useEffect } from 'react';

const Sidebar = ({ selectedNodeId, nodes, setNodes }) => {
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const [text, setText] = useState(selectedNode?.data.label || '');

  useEffect(() => {
    setText(selectedNode?.data.label || '');
  }, [selectedNodeId, selectedNode]);

  const updateNodeText = (e) => {
    const newText = e.target.value;
    setText(newText);
    setNodes((ns) =>
      ns.map((n) => {
        if (n.id === selectedNodeId) {
          return {
            ...n,
            data: { ...n.data, label: newText },
          };
        }
        return n;
      })
    );
  };

  return (
    <div style={{ width: '250px', height: '100%', backgroundColor: 'grey', padding: '10px' }}>
      <input type="text" value={text} onChange={updateNodeText} placeholder="Edit node label" />
    </div>
  );
};

export default Sidebar;
