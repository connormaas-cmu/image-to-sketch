import './App.css';
import CanvasDraw from 'react-canvas-draw';
import React, { useState, useRef } from 'react';
// import generateImage from './image';
import captionImage from './caption';

function App() {
  const [oldColor, setOldColor] = useState('#444'); 
  const [color, setColor] = useState('#444'); 
  const [size, setSize] = useState(10); 
  const canvasRef = useRef(null);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  // const [image, setImage] = useState('')
  // const [showGenerate, setShowGenerate] = useState(true)

  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  const toggleEraser = () => {
    setOldColor(color)
    setEraserEnabled(!eraserEnabled);
    setColor(eraserEnabled ? oldColor : '#FFFFFF');
  };

  const undoLastAction = () => {
    canvasRef.current.undo();
  };

  const generateResult = async () => {
    const dataUrl = canvasRef.current.getDataURL(); 
    const summary = await captionImage(dataUrl)

    alert(summary)
    // const extras = "red"

    // setShowGenerate(false)
    // const resultImage = await generateImage(summary, extras);
    // if (resultImage) {
    //     setImage(resultImage);
    // }
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
      </div>
      {showGenerate && <button onClick={generateResult}>
        Generate Image
      </button>}
      {image && <div>
          <a href={image} target="_blank" rel="noopener noreferrer">Open Generation</a>
      </div>}
    </div>
  );
}

export default App;
