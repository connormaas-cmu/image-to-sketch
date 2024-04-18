import './App.css';
import CanvasDraw from 'react-canvas-draw';
import React, { useState, useRef } from 'react';


function App() {
  const [oldColor, setOldColor] = useState('#444'); 
  const [color, setColor] = useState('#444'); 
  const [size, setSize] = useState(10); 
  const [imageURL, setImageURL] = useState('');
  const canvasRef = useRef(null);
  const [eraserEnabled, setEraserEnabled] = useState(false);

  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  const saveDrawing = () => {
    const dataUrl = canvasRef.current.getDataURL();
    setImageURL(dataUrl);
  };

  const toggleEraser = () => {
    setOldColor(color)
    setEraserEnabled(!eraserEnabled);
    setColor(eraserEnabled ? oldColor : '#FFFFFF');
  };

  const undoLastAction = () => {
    canvasRef.current.undo();
  };


  return (
    <div className="App">
      <div className="canvasContainer">
        <CanvasDraw ref={canvasRef} lazyRadius={0} hideGrid={true} brushColor={color} brushRadius={size} className="canvasStyle" />
        {!eraserEnabled && (
          <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        )}
        <input type="range" min="1" max="20" value={size} onChange={e => setSize(e.target.value)} />
        <button onClick={toggleEraser}>{eraserEnabled ? 'Back to Pen' : 'Eraser'}</button>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={undoLastAction}>Undo</button>
        <button onClick={saveDrawing}>Save Drawing</button>
        {imageURL && <div>
          <a href={imageURL} target="_blank" rel="noopener noreferrer">Open Saved Drawing</a>
        </div>}
      </div>
    </div>
  );
}

export default App;
