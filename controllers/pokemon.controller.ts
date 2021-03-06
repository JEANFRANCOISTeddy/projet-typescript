const chalk = require('chalk');

export interface IPokemon {
    name: string;
    hp: number
    level: number;
    base_power: number;
    offensive_stat: number;
    defensive_stat: number;
}

export class Pokemon {
    name: string;
    hp: number
    level: number;
    base_power: number;
    offensive_stat: number;
    defensive_stat: number;

    constructor(props:IPokemon){
        this.name = props.name;
        this.hp = props.hp;
        this.level = props.level;
        this.base_power = props.base_power;
        this.offensive_stat = props.offensive_stat;
        this.defensive_stat = props.defensive_stat;
    }

    public attack(adversary: Pokemon): number {
        let damage = Math.floor(Math.floor(Math.floor(2 * this.level / 5 + 2) * this.offensive_stat * this.base_power / this.defensive_stat) / 50) + 2;
        return adversary.hp -= damage;
    }

    /**
     *
     * Function without setTimeout
     *
     * @param adversary
     */
    public fight(adversary: Pokemon): Promise<Pokemon> {
        return new Promise<Pokemon>(async (resolve, reject) => {
            let i = 0;

            while(this.hp > 0 && adversary.hp > 0) {
                if(i % 2 == 0){
                    adversary.hp = this.attack(adversary);
                    //console.log(chalk.red(adversary.name + " pokemon has " + adversary.hp + " hp left"));
                }else {
                    this.hp = adversary.attack(this);
                    //console.log(chalk.blue(this.name + " pokemon has " + this.hp + " hp left"));
                }
                i++;
            }

            if(this.hp <= 0)
                resolve(adversary);
            else
                resolve(this);
        })
    }

    /**
     *
     * Function with setTimeout
     *
     * I can't put a while with a settimeout despite 2hours of searching
     *
     * @param adversary
     */
    public fightTimeout(adversary: Pokemon): Promise<Pokemon> {
        return new Promise<Pokemon>(async (resolve, reject) => {
            let i = 0;

            while(this.hp > 0 && adversary.hp > 0) {
                ((i) => {
                    setTimeout(() => {
                        if (i % 2 == 0) {
                            adversary.hp = this.attack(adversary);
                            //console.log(chalk.red(adversary.name + " pokemon has " + adversary.hp + " hp left"));
                        } else {
                            this.hp = adversary.attack(this);
                            //console.log(chalk.blue(this.name + " pokemon has " + this.hp + " hp left"));
                        }
                    }, 1000);
                })(i++)
            }

            if(this.hp <= 0)
                resolve(adversary);
            else
                resolve(this);
        })
    }

}

