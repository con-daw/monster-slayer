const app = Vue.createApp({
    data() {
        return {
            monsterImage: './images/monsters/',
            monsters:[
                {
                    name: 'Azure',
                    img: 'dragon-snake',
                    attackMax: 12,
                    attackMin: 5
                },
                {
                    name: 'Kraken',
                    img: 'sea-monster',
                    attackMax: 15,
                    attackMin: 6
                },
                {
                    name: 'Smaug',
                    img: 'dragon',
                    attackMax: 17,
                    attackMin: 8
                },
            ],
            currentMonster: { name: '', img: '' },

            heroHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        }
    },
    computed: {
      monsterHealthStyle() {
          if(this.monsterHealth < 0){
              return { width: '0%'};
          }
          return {width: this.monsterHealth + '%'}
      },

      heroHealthStyle() {
          if(this.heroHealth < 0){
              return { width: '0%'};
          }
          return {width: this.heroHealth + '%'}
      },

      specialAttackActive() {
          return this.currentRound % 3 !== 0
      }
    },
    watch: {
      heroHealth(value) {
          if(value <= 0 && this.monsterHealth <= 0){
              this.winner = 'draw'
          }else if (value <= 0){
              this.winner = 'monster'
          }
      },
      monsterHealth(value) {
          if(value <= 0 && this.heroHealth <= 0){
              this.winner = 'draw'
          }else if (value <= 0){
              this.winner = 'hero'
          }
      }
    },
    methods: {
        startGame() {
            this.heroHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.getMonster()
        },

        getMonster(){
            const randomIndex = Math.floor(Math.random() * this.monsters.length)
            this.currentMonster = this.monsters[randomIndex]
        },

        attackMonster(){
            this.currentRound++;
            const attackDamage = Math.floor(Math.random() * (12 - 5)) + 5;
            this.monsterHealth -= attackDamage;
            this.attackPlayer();
        },

        attackPlayer(){
            const attackDamage = Math.floor(
                Math.random() * (this.currentMonster.attackMax - this.currentMonster.attackMin)
            ) + this.currentMonster.attackMin;
            this.heroHealth -= attackDamage;
        },

        specialHeroAttack() {
            this.currentRound++;
            const attackDamage = Math.floor(Math.random() * (25 - 10)) + 10;
            this.monsterHealth -= attackDamage;
            this.attackPlayer();
        },

        healHero() {
            this.currentRound++;
            const healHero = Math.floor(Math.random() * (20 - 5)) + 5;
            if(this.heroHealth + healHero > 100){
                this.heroHealth = 100;
            } else {
                this.heroHealth += healHero;
            }
            this.attackPlayer();
        },

        surrender() {
            this.winner = 'monster';
        }
    },

    mounted() {
        this.getMonster()
    }
})

app.mount('#game')