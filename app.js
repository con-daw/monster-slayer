const app = Vue.createApp({
    data() {
        return {
            monsterImage: './images/monsters/',
            monsters:[
                {
                    name: 'Azure',
                    img: 'dragon-snake',
                    attackMax: 12,
                    attackMin: 3
                },
                {
                    name: 'Kraken',
                    img: 'sea-monster',
                    attackMax: 15,
                    attackMin: 8
                },
                {
                    name: 'Smaug',
                    img: 'dragon',
                    attackMax: 17,
                    attackMin: 6
                },
            ],
            currentMonster: { name: '', img: '' },

            heroHealth: 100,
            monsterHealth: 100,
        }
    },
    computed: {
      monsterHealthStyle() {
          return {width: this.monsterHealth + '%'}
      },
      heroHealthStyle() {
          return {width: this.heroHealth + '%'}
      }
    },
    methods: {
        getMonster(){
            const randomIndex = Math.floor(Math.random() * this.monsters.length)
            this.currentMonster = this.monsters[randomIndex]
        },

        attackMonster(){
            const attackDamage = Math.floor(Math.random() * (12 - 5)) + 5;
            this.monsterHealth -= attackDamage;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackDamage = Math.floor(
                Math.random() * (this.currentMonster.attackMax - this.currentMonster.attackMin)
            ) + this.currentMonster.attackMin;
            this.heroHealth -= attackDamage;
        }
    },

    mounted() {
        this.getMonster()
    }
})

app.mount('#game')