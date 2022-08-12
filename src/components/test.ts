export const greating = () => {
    const img = document.createElement('img');
    img.src = 'assets/img/image.jpg';
    document.body.appendChild(img);
    const data: string = 'Hello World!';
    return console.log(data);
}