"use strict";

class Propiedad {

    #idpropiedad;
    #direccion;
    #precio;
    #tipovivienda;
    #imagen; 

    constructor(direccion, precio, tipovivienda, imagen) {
        this.#direccion = direccion;
        this.#precio = precio;
        this.#tipovivienda = tipovivienda;
        this.#imagen = imagen;
    }

    get idpropiedad() {
        return this.#idpropiedad;
    }

    set idpropiedad(value) {
        this.#idpropiedad = value;
    }

    get direccion() {
        return this.#direccion;
    }

    set direccion(value) {
        this.#direccion = value;
    }

    get precio() {
        return this.#precio;
    }

    set precio(value) {
        this.#precio = value;
    }

    get tipovivienda() {
        return this.#tipovivienda;
    }

    set tipovivienda(value) {
        this.#tipovivienda = value;
    }

    get imagen() {
        return this.#imagen;
    }

    set imagen(value) {
        this.#imagen = value;
    }

}