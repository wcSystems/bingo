<template>
  <div class="container-fluid bloque">
    <Tablero />
    <Carton />
    <div class="float-left btn-group" role="group" aria-label="Basic example">
      <button @click="control('play')" type="button" class="btn background3490dcREC">
        <font-awesome-icon :icon="['fa', 'play']"  />
      </button>
      <button @click="control('pause')" type="button" class="btn background3490dcREC">
        <font-awesome-icon :icon="['fa', 'pause']"  />
      </button>
      <button @click="control('stop')" type="button" class="btn background3490dcREC">
        <font-awesome-icon :icon="['fa', 'stop']" />
      </button>
      <button @click="control('undo')" type="button" class="btn background3490dcREC">
        <font-awesome-icon :icon="['fa', 'undo']" />
      </button>
    </div>
    <button type="button" class=" float-right mb-3 btn pantallaCanto px-4 py-3 background3490dcREC">
      {{ obj.letra }} - {{ obj.numero }}
    </button>

    <table class="table table-bordered table-borderless my-3 w-100">
      <tbody class="bg-f8f9fa">
        <tr v-for="(item, index) in getTablero" :key="index" >
          <th class="background3490dc" scope="col" > 
            <button class="btn bg-white color3490dc rounded-circle fichasBtn sizeFicha" >
              {{ Object.keys(item).toString() }} 
            </button>
          </th>
          <td v-for="(item, index) in (Object.values(item)[0])" :key="index" >
            <button :class="filtro(item) ? 'bg-transparent color3490dc fichasBtn' : 'fichasBtnDisable' " class="btn rounded-circle sizeFicha" >
              {{ item }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";

  import Tablero from '@/components/Bingo/Tablero.vue';
  import Carton from '@/components/Bingo/Carton.vue';
  export default {
    name: 'Bingo',
    components: {
      Tablero,
      Carton
    },
    data() {
      return { 
        obj: { arr:[], arrNew:[], letra: '-', numero: '0' },
        controlEvent: 0
      }
    },
    async created() { 
      this.filtro()
    },
    computed: mapGetters(["getBingo","getTablero","getArtyom"]),
    methods: {
      ...mapActions(["setBingo"]),
      alertControl(res){
        this.$toastr.Add({
          name: "alertControl",
          title: res.title,
          msg: res.msg,
          timeout: 5000,
          position: "toast-top-right",
          type: "info",
          preventDuplicates: true,
          style: { backgroundColor: "#3490dc" }
        });
      },
      filtro(res) {
        return (this.obj.arr.find(item => item === res)) ? true : false;
      },
      async control(option) {
        switch (option) {
          case 'play':
            this.alertControl({title:'Play',msg:'El juego empezara en 8 segundos.'})
            this.controlEvent = setInterval( () => this.sorteo() , 8000)
            break;
          case 'pause':
            this.alertControl({title:'Pausa',msg:'Click! en Play para reaunudar.'})
            clearInterval(this.controlEvent)
            break;
          case 'stop':
            this.alertControl({title:'Stop',msg:'Todos los registros se han perdido.'})
            clearInterval(this.controlEvent)
            this.obj = { arr:[], arrNew:[], letra: '-', numero: '0' }
            this.setBingo([])
            break;
          case 'undo':
            this.alertControl({title:'Reiniciar',msg:'Empecemos desde cero.'})
            clearInterval(this.controlEvent)
            this.obj = { arr:[], arrNew:[], letra: '-', numero: '0' }
            this.setBingo([])
            await this.setBingo(this.getTablero)
            this.controlEvent = setInterval( () => this.sorteo() , 8000)
            break;
          default:
            break;
        }
      },
      async voz(){
        this.getArtyom.ArtyomProperties.lang = "es-ES"
        this.getArtyom.ArtyomProperties.continuous = true
        this.getArtyom.ArtyomProperties.listen = true
        this.getArtyom.say(`El número es: ${ this.obj.letra } ${ this.obj.numero }. Repito: ${ this.obj.letra } ${ this.obj.numero }.`)
      },
      async sorteo() {
        this.obj.arrNew = []
        this.obj.arr = []
        await this.getBingo.map( (res) => {
            this.obj.arr = this.obj.arr.concat(res[Object.keys(res)])
            this.obj.numero = this.obj.arr[Math.floor(Math.random() * this.obj.arr.length)]
        })
        await this.getBingo.map( (res) => {
          let arr = Object.values(res)[0]
          if(arr.find(i => i === this.obj.numero)){
            this.obj.letra = Object.keys(res).toString()
            const index = arr.findIndex(i => i === this.obj.numero)
            const index2 = this.obj.arr.findIndex(i => i === this.obj.numero)
            this.voz()
            arr.splice(index,1)
            this.obj.arr.splice(index2,1)
          }
          this.obj.arrNew.push(res)
          this.setBingo(this.obj.arrNew)
        })
      },
    },
  }
</script>
<style lang="scss">
.bloque {
  margin-top: 8%;
}
.pantallaCanto {
  font-size: 30px !important;
}
.table-bordered {
  border: 1px solid #3490dc !important;
  border-radius: 10px;
  overflow: hidden;
  background-color: #3490dc !important;
}
.bg-f8f9fa{
  background-color: #f8f9fa;
}
.color3490dc {
  color: #3490dc !important;
}
.background3490dcREC {
  background: rgba(52, 144, 220, 0.9) !important;
  color: #fff !important;

}
.background3490dcREC:hover {
  background: rgba(52, 144, 220, 1) !important;
}
.background3490dc {
  background: #3490dc !important;
}
.fichasBtn{
  border: 1px solid #3490dc !important;
}
.fichasBtnDisable{
  color: #fff !important;
  background-color: #ccc !important;
}
.sizeFicha{
  width: 3rem;
  height: 3rem;
}
.fichasBtn:hover {
  background-color: #3490dc !important;
  color: #fff !important;
  border: 1px solid #fff !important;
}
</style>