function generateImage(summary, extras) {

    return new Promise((resolve, reject) => { 
    const abrExtras = extras.substring(0, 200)

    fetch('/.netlify/functions/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: summary, story: abrExtras }),
    })
    .then(response => response.text())
    .then(textResponse => {
        const data = JSON.parse(textResponse);
        const innerData = JSON.parse(data.task_id);
        const taskId = innerData.data.task_id; 
        
        const checkStatus = (startTime) => {
            if (new Date() - startTime > 30000) {
                alert("Timeout: Image generation took too long.");
                return;
            }
        
            fetch(`/.netlify/functions/check-status?task_id=${taskId}`)
                .then(response => response.text())
                .then(textContent => {
                    if (textContent.includes("Image is still being processed.")) {
                        setTimeout(() => checkStatus(startTime), 5000);
                    } else {
                        const data = JSON.parse(textContent);
                        return data.image;
                    }
                })
                .catch(error => {
                    alert(error)
                    console.log(error)
                });
        };

        checkStatus(new Date());

    })
    .catch(error => {
      alert(error);
      reject(error);
    });
  });
}

export default generateImage;