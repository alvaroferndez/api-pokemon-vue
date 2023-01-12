const { createApp } = Vue

createApp({
      data() {
            return {
                  pokemons:[],
                  http: new XMLHttpRequest(),
                  contador:00,
            }
      },
      methods:{
            lanzaPeticion(primera){
                  peticion="https://pokeapi.co/api/v2/pokemon/";
                  this.http.open("GET",peticion,true);
                  this.http.onreadystatechange = () =>{
                        this.trataRespuestaTodos(primera);
                  }
                  this.http.send();
            },

            trataRespuestaTodos(primera){
                  if (this.http.status == 200 && this.http.readyState == 4 && primera) {
                        datos = JSON.parse(this.http.responseText);
                        for(pokemon of datos.results){
                              this.lanzarPeticion2(pokemon.url)
                              this.contador++;
                        }
                  }else if(this.http.status == 200 && this.http.readyState == 4){
                        datos = JSON.parse(http.responseText);
                  }
            },

            lanzarPeticion2(peticion){
                  var http = new XMLHttpRequest();
                  http.open("GET",peticion,true);
                  http.onreadystatechange = () =>{
                        this.trataRespuestaTodos2(http);
                  }
                  http.send();
            },

            trataRespuestaTodos2(http){
                  if(http.status == 200 && http.readyState == 4){
                        datos = JSON.parse(http.responseText);
                        this.añadirPokemon(datos);
                  }
            },

            añadirPokemon(datos){
                  this.pokemons.push({
                        imagen:datos.sprites.back_default,
                        nombre:datos.name,
                        peso:datos.weight,
                        altura:datos.height,
                        experiencia:datos.base_experience,
                  })
            },
            
            realizarScroll(){
                  if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 400){
                              this.contador++;
                              peticion= "https://pokeapi.co/api/v2/pokemon/" + this.contador;
                              this.lanzarPeticion2(peticion)
                  }
            }
      },
      mounted(){
            window.addEventListener("scroll",this.realizarScroll)
      }
}).mount('.contenedor')