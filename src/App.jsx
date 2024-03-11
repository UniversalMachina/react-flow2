// App.js
import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar'; // Assuming Sidebar.js is in the same directory

// Inside your App.js or wherever you define CustomNodeComponent
const CustomNodeComponent = ({ id, data, setNodes }) => {
  const updateNodeText = (e) => {
    const newText = e.target.value;
    // Update the nodes state with the new text for this node
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, label: newText },
          };
        }
        return node;
      })
    );
  };

  return (
    <div className="text-white" style={{ padding: 10, border: '1px solid #ddd', backgroundColor: 'black' }}>
      <input
        type="text"
        value={data.label}
        onChange={updateNodeText}
        style={{ color: 'white', background: 'transparent', border: 'none', outline: 'none', width: '100%' }}
      />
    </div>
  );
};


const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: 'er1', type: 'entityRelationship', position: { x: 250, y: 5 }, data: { label: "hey" } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const nodeTypes = useMemo(() => ({
    entityRelationship: (nodeProps) => <CustomNodeComponent {...nodeProps} setNodes={setNodes} />,
  }), [setNodes]);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Sidebar selectedNodeId="er1" nodes={nodes} setNodes={setNodes} />
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        />
      </div>
    </div>
  );
};

export default App;
