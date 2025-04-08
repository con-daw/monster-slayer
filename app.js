const app = Vue.createApp({
    data() {
        return{
            monsterImage: './images/monsters/',
            monsters:[
                {
                    name: 'Azure',
                    img: 'dragon-snake'
                },
                {
                    name: 'Kraken',
                    img: 'sea-monster'
                },
                {
                    name: 'Smaug',
                    img: 'dragon'
                },
            ],
            currentMonster: { name: '', img: '' }
        }
    },

    methods: {
        getMonster(){
            const randomIndex = Math.floor(Math.random() * this.monsters.length)
            this.currentMonster = this.monsters[randomIndex]
        }
    },

    mounted() {
        this.getMonster()
    }
})

app.mount('#game')