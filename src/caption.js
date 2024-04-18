function captionImage(image) {

    alert(image)

    return new Promise((resolve, reject) => { 

        fetch('/.netlify/functions/caption', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: image }),
        })
        .then(response => response.text())
        .then(textResponse => {
            if (textResponse.includes("Error")) {
                alert(textResponse)
                return;
            }
            alert(textResponse)
            // const data = JSON.parse(textResponse);
            
            resolve(textResponse);       

        })
        .catch(error => {
            alert(error);
            reject(error);
        });
    });
}

export default captionImage;