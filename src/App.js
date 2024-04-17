import './App.css';
import CanvasDraw from 'react-canvas-draw';
import React, { useState, useRef } from 'react';


function App() {
  const [color, setColor] = useState('#444'); 
  const [size, setSize] = useState(10); 
  const [imageURL, setImageURL] = useState('');
  const canvasRef = useRef(null);

  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  const saveDrawing = () => {
    const dataUrl = canvasRef.current.getDataURL();
    setImageURL(dataUrl);
  };

  return (
    <div className="App">
     <CanvasDraw ref={canvasRef} brushColor={color} brushRadius={size} />
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      <input type="range" min="1" max="20" value={size} onChange={e => setSize(e.target.value)} />
      <button onClick={clearCanvas}>Clear</button>
      <button onClick={saveDrawing}>Save Drawing</button>
      {imageURL && <div>
        <a href={imageURL} target="_blank" rel="noopener noreferrer">Open Saved Drawing</a>
      </div>}
    </div>
  );
}

export default App;
