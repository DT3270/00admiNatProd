
class Input {
	constructor(nombre,tipo,ancho, alto) {
		this.nombre = nombre;
		this.tipo = tipo;
		this.ancho = ancho;
        this.alto = alto;
    }
    
	agregar(area) {

        // Contenedor de todos los elemtentos
        var newDiv = document.createElement('div');
		newDiv.style.height = this.alto + 14 + "px";   // Valor en duro que te cambia si cambias el tamaño
        newDiv.style.width = this.ancho + 14 + "px";     // Valor en duro que te cambia si cambias el tamaño
        newDiv.style.position = 'relative';

        // Input
		var newInput = document.createElement('input'); 
        newInput.id = this.nombre;
        newInput.className = 'myInput';
        newInput.type = this.tipo;
		newInput.style.height = this.alto + "px";
        newInput.style.width = this.ancho + "px";
        newDiv.appendChild(newInput);

        newInput.addEventListener('keyup', function(){
            if(this.value.length>=1) {
                this.nextElementSibling.classList.add('fijar');
            } else {
                this.nextElementSibling.classList.remove('fijar');
            }
        });            
        
        // Label
        var newLabel = document.createElement('p');
        newLabel.id = this.nombre + 'myInput-P';
        newLabel.style.position = 'relative';
        newLabel.style.top = -36 + 'px'; // Valor en duro que te cambia si cambias el tamaño
        newLabel.style.left = 2 + 'px'; // Valor en duro que te cambia si cambias el tamaño
        newLabel.textContent = this.nombre;
        newLabel.className = 'myInput-P';
        newDiv.appendChild(newLabel);

        // Meto el contenedor en el área (que puede ser otro contenedor o el body)
        area.appendChild(newDiv);

    };
};

class Campo {
	constructor(nombre, tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
		this.ancho = 370;
        this.alto = 30;
    }
    
	agregar(area, help, msg) {

        // Contenedor de todos los elemtentos
        var newDiv = document.createElement('div');
        
        // Creo un nuevo input
        var newCampo = new Input(this.nombre, this.tipo, this.ancho, this.alto);
        newCampo.agregar(newDiv);

        // Mensaje de error
        var newLabel = document.createElement('p');
        newLabel.id = this.nombre + 'myInput-PErr';
        newLabel.style.position = 'relative';
                
        if (help) {
        // Creo el boton dentro de un div
            var secondDiv = document.createElement('div');
            secondDiv.style.position = 'relative';
            secondDiv.style.width = 30 + 'px';
            secondDiv.style.top = -32 + 'px';
            secondDiv.style.left = 345 + 'px';
            secondDiv.style.marginBottom = -25 + 'px';
        
            var newImg = document.createElement('img');
            switch (help) {
                case 'h':
                    newImg.src = 'img/question-circle-solid.png';
                    newImg.addEventListener('mouseover', function(){
                        newImg.src = 'img/question-circle-solid2.png';
                    });                    
                    newImg.addEventListener('mouseout', function(){
                        newImg.src = 'img/question-circle-solid.png';
                    });                    
                    break;
                default:
                    newImg.src = 'img/info-circle-solid.png';                    
                    newImg.addEventListener('mouseover', function(){
                        newImg.src = 'img/info-circle-solid2.png';
                    });                    
                    newImg.addEventListener('mouseout', function(){
                        newImg.src = 'img/info-circle-solid.png';
                    });                    
                    break;
            }
            newImg.addEventListener('click', function(){
                newLabel.className = 'myInput-PMsg';
                if (newLabel.textContent) {
                    newLabel.textContent = ""
                } else {
                    newLabel.textContent = msg;                    
                }
            });                    
            newImg.className = 'myInput-Img';
            newImg.style.height = 20 + 'px';
            newImg.style.width = 20 + 'px';
            secondDiv.appendChild(newImg);
            newDiv.appendChild(secondDiv);
        };

        newDiv.appendChild(newLabel);
        
        // Meto el contenedor en el área (que puede ser otro contenedor o el body)
        area.appendChild(newDiv);

    };

    mostrarMsg(msg) { 
        // Mensaje de error
        var error = document.getElementById(this.nombre + 'myInput-PErr');
        error.className = 'myInput-PErr';
        error.textContent = msg;
        var campoError = document.getElementById(this.nombre);
        campoError.style.background = "#FFE4E1"
        campoError.style.borderColor = "red"
    };
    limpiarMsg() { 
        // Mensaje de error
        var error = document.getElementById(this.nombre + 'myInput-PErr');
        error.textContent = "";
        var campoError = document.getElementById(this.nombre);
        campoError.style.background = ""
        campoError.style.borderColor = "#5DADE2"
    };
    confirmarDato() { 
        // Mensaje de error
        var campoError = document.getElementById(this.nombre);
        campoError.style.background = "#EAFAF1"
        campoError.style.borderColor = "#2ECC71"
    };

};
