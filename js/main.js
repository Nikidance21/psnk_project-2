let eventBus = new Vue()

Vue.component('cols', {
    template: `
    <div id="cols">
    <div class="col-wrapper">
    <h2 class="error" v-for="error in errors">{{error}}</h2>
        <newcard></newcard>
        <div class="cols-wrapper">
        <div class="col">
            <ul>
                <li class="cards" v-for="card in column1"><p class="p-title">{{ card.title }}</p>
                    <ul>
                        <li class="tasks" v-for="t in card.subtasks" v-if="t.title !=null">
                        <input @click="NewStatus1(card, t)"
                        class="checkbox" type="checkbox"
                        :disabled="t.completed">
                        <p class="{completed: t.completed}">{{t.title}}></p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="col">
            <ul>
                <li class="cards" v-for="card in column2"><p class="p-title">{{card.title}}</p>
                    <ul>
                        <li class="tasks" v-for="t in card.subtask" v-if="t.title !=null">
                         <input @click="NewStatus2(card, t)"
                         class="checkbox" type="checkbox"
                         :disabled="t.completed">
                         <p class="{completed: t.completed}">{{t.title}}</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="col">
            <ul>
                <li class="cards" v-for="card in column3"><p class="p-title">{{card.title}}</p>
                    <ul>
                        <li class="tasks" v-for="t in card.subtask" v-if="t.title !=null">
                        <input @click="t.completed = true"
                        class="checkbox" type="checkbox"
                        :disabled ="t.completed">
                        <p class="{completed: t.completed}">{{t.title}}</p>
                        </li>
                    </ul>
               </li>
             </ul>
          </div>
        </div>
       </div>      
      </div>
     
    `,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],
            errors: [],
        }
    },
    mounted() {
        eventBus.$on('card-submitted', card =>{
          this.errors = []
          if (this.column.length < 3) {
              this.column1.push(card)
          }else{
              this.errors.push("Вы не можете добавить новую заметку")
          }
        })
    }

})

Vue.component('newcard',{
    template: `
    <section>
    <form class="addform" @submit.prevent="onSubmit">
        <p>
            <label for="title">Название</label>
            <input id="title" required v-model="title" type="text" placeholder="Название">
        </p>
            <input required id="subtask1" v-model="subtask1" placeholder="Задача 1">
            <input required id="subtask2" v-model="subtask2" placeholder="Задача 2">
            <input required id="subtask3" v-model="subtask3" placeholder="Задача 3">
            <input required id="subtask4" v-model="subtask4" placeholder="Задача 4">
            <input required id="subtask5" v-model="subtask5" placeholder="Задача 5">
            <button type="submit">Добавить карточку</button>
    </form>
    `,
    data() {
        return {
            title: null,
            subtask1: null,
            subtask2: null,
            subtask3: null,
            subtask4: null,
            subtask5: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            let card = {
                title: this.title,
                subtasks: [{title: this.subtask1, completed: false},
                        {title: this.subtask1, completed: false},
                        {title: this.subtask1, completed: false},
                        {title: this.subtask1, completed: false},
                        {title: this.subtask1, completed: false}],
                date: null,
                status: 0
            }
            eventBus.$emit('card-submitted', card)
            this.title = null
            this.subtask1 = null
            this.subtask2 = null
            this.subtask3 = null
            this.subtask4 = null
            this.subtask5 = null
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        name: 'Notes'
    }
})
