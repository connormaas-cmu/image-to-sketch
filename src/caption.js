function captionImage(image) {

    return new Promise((resolve, reject) => { 

        fetch('https://sketch2image.netlify.app/test')
        .then(response => alert(response))
        .catch(error => alert(error))
  

        // fetch('https://sketch2image.netlify.app/test', {
        //     method: 'GET',
        //   //  headers: { 'Content-Type': 'application/json' },
        //   //  body: JSON.stringify({ image: image }),
        // })
        // .then(response => response.text())
        // .then(textResponse => {
        //     alert(textResponse);
        //     if (textResponse.includes("Error")) {
        //         alert(textResponse)
        //         return;
        //     }
        //     // const data = JSON.parse(textResponse);
            
        //     resolve(textResponse);       

        // })
        // .catch(error => {
        //     alert(error);
        //     reject(error);
        // });
    });
}

export default captionImage;