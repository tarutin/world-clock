<template>
    <div>
        <section class='search'>
            <input v-on:keyup.enter='addCity' v-on:keyup='searchCity' v-model.trim='q' type='input' name='q' placeholder='Search'/>
            <label>{{ searchLabel }}</label>
        </section>
        <section class='clock'>
        </section>
        <section class='settings'>
            <button class='ipc-startup'>Open at Login</button>
            <button class='ipc-update'>Check for Update</button>
        </section>
        <section class='exit'>
            <button v-on:click='appQuit'>Quit</button>
        </section>
    </div>
</template>

<script>
    import electron from 'electron'
    import notice from '../notice'
    import db from '../db'
    const app = electron.remote.app

    export default {
        data() {
            return {
                searchLabel: '',
            }
        },
        methods: {
            appQuit: function() {
                app.quit()
            },
            addCity: function(e) {
                notice.send(this.q)
            },
            searchCity: function() {
                if(this.q == '') this.searchLabel = ''
                else {
                    db.find(`SELECT name, UPPER(country) code FROM cities WHERE city LIKE '${this.q}%' ORDER BY popularity DESC LIMIT 1`, city => {
                        this.searchLabel = !city ? 'Not found' : city.name + ', ' + city.code
                    })
                }
            },
        }
    }
</script>
